'use client';

import type { DropItem } from '@react-types/shared';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useState, type ComponentProps } from 'react';
import {
  DropZone as AriaDropZone,
  type DropZoneProps as AriaDropZoneProps,
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps as AriaFileTriggerProps,
  composeRenderProps,
} from 'react-aria-components';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../utils';
import { fileUploadDefaultMessages } from './messages';
import type { FileInfo, FileUploadMessages, UseFileUploadOptions } from './types';
import { parseSize } from './utils';

const fileUploadStyles = tv({
  base: 'group/file-upload text-solid-gray-800 text-std-16N-170 [overflow-wrap:anywhere]',
});

const fileUploadDropAreaStyles = tv({
  extend: focusVisibleRing,
  base: [
    'rounded-8 border border-solid-gray-536 bg-solid-gray-50 p-8 text-center',
    'group-data-[has-error=true]/file-upload:border-error-1',
    'data-hovered:bg-solid-gray-100',
    'data-drop-target:bg-green-50 data-drop-target:outline data-drop-target:outline-4 data-drop-target:outline-success-1 data-drop-target:-outline-offset-4',
    'data-disabled:opacity-50',
  ],
});

const fileUploadFileListStyles = tv({
  base: 'mt-4 list-none p-0 [counter-reset:file-item]',
});

const fileUploadFileItemStyles = tv({
  base: 'group/file-item flex items-start gap-3 [counter-increment:file-item] [&+&]:mt-3',
});

const fileUploadFileMarkerStyles = tv({
  base: [
    'shrink-0 pt-0.5',
    'group-data-[multiple=true]/file-upload:w-8 group-data-[multiple=true]/file-upload:before:content-[counter(file-item)"."]',
    'group-data-[multiple=false]/file-upload:flex group-data-[multiple=false]/file-upload:size-6 group-data-[multiple=false]/file-upload:items-center group-data-[multiple=false]/file-upload:justify-center',
    'group-data-[multiple=false]/file-upload:before:size-1.5 group-data-[multiple=false]/file-upload:before:rounded-full group-data-[multiple=false]/file-upload:before:bg-current group-data-[multiple=false]/file-upload:before:content-[""]',
  ],
});

const fileUploadFileInfoStyles = tv({
  base: [
    'min-w-0 flex-1',
    'group-data-[error=true]/file-item:border-l-4 group-data-[error=true]/file-item:border-error-1 group-data-[error=true]/file-item:pl-2 group-data-[error=true]/file-item:text-error-1',
  ],
});

const fileUploadFileNameStyles = tv({
  base: 'mr-4 font-bold',
});

const fileUploadFileMetaStyles = tv({
  base: 'text-solid-gray-600 group-data-[error=true]/file-item:text-inherit',
});

const fileUploadViewportOverlayStyles = tv({
  base: 'fixed inset-0 z-[9999] border-4 border-success-1 bg-green-50',
});

const fileUploadViewportOverlayMessageStyles = tv({
  base: [
    'flex h-full w-full flex-wrap content-center justify-center p-[calc(2rem-4px)] text-center font-bold pointer-events-none',
    'text-[clamp(calc(18/16*1rem),0.75rem+1.875vw,calc(48/16*1rem))]',
  ],
});

function createFileId(file: Pick<File, 'name' | 'size' | 'lastModified'>): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function getAcceptMatchers(accept?: string): string[] {
  return accept
    ? accept
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
}

function matchesAccept(file: File, accept?: string): boolean {
  const matchers = getAcceptMatchers(accept);
  if (matchers.length === 0) {
    return true;
  }

  return matchers.some((matcher) => {
    const lowerMatcher = matcher.toLowerCase();
    if (lowerMatcher.endsWith('/*')) {
      return file.type.toLowerCase().startsWith(lowerMatcher.slice(0, -1));
    }

    if (lowerMatcher.startsWith('.')) {
      return file.name.toLowerCase().endsWith(lowerMatcher);
    }

    return file.type.toLowerCase() === lowerMatcher;
  });
}

async function collectFilesFromDropItems(items: DropItem[]): Promise<File[]> {
  const files: File[] = [];

  const visitItems = async (entries: DropItem[]) => {
    for (const item of entries) {
      if (item.kind === 'file') {
        files.push(await item.getFile());
        continue;
      }

      if (item.kind === 'directory') {
        const nestedItems: DropItem[] = [];
        for await (const entry of item.getEntries()) {
          nestedItems.push(entry);
        }
        await visitItems(nestedItems);
      }
    }
  };

  await visitItems(items);
  return files;
}

function validateFile(file: File, options: {
  accept?: string;
  maxFileSizeBytes?: number;
  messages: FileUploadMessages;
}): string[] {
  const errors: string[] = [];

  if (!matchesAccept(file, options.accept)) {
    errors.push(options.messages.error.invalidType);
  }

  if (options.maxFileSizeBytes !== undefined && file.size > options.maxFileSizeBytes) {
    errors.push(options.messages.error.maxFileSize);
  }

  return errors;
}

function buildGlobalErrors(files: FileInfo[], options: {
  maxFiles?: number;
  maxTotalSizeBytes?: number;
  messages: FileUploadMessages;
}): string[] {
  const errors: string[] = [];

  if (options.maxFiles !== undefined && files.length > options.maxFiles) {
    errors.push(options.messages.error.maxFiles);
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (options.maxTotalSizeBytes !== undefined && totalSize > options.maxTotalSizeBytes) {
    errors.push(options.messages.error.maxTotalSize);
  }

  if (files.some((file) => (file.errors?.length ?? 0) > 0)) {
    errors.push(options.messages.error.hasFileErrors);
  }

  return errors;
}

export interface FileUploadProps extends ComponentProps<'div'>, VariantProps<typeof fileUploadStyles> {
  droppable?: boolean;
  hasError?: boolean;
  maxFiles?: number;
}

export function FileUpload(props: FileUploadProps) {
  const { className, droppable = false, hasError = false, maxFiles = 1, ...rest } = props;

  return (
    <div
      {...rest}
      className={fileUploadStyles({ className })}
      data-droppable={droppable ? 'true' : undefined}
      data-has-error={hasError ? 'true' : undefined}
      data-multiple={maxFiles > 1 ? 'true' : undefined}
    />
  );
}

export interface FileUploadTriggerProps extends Omit<AriaFileTriggerProps, 'onSelect'> {
  onSelect?: (files: File[] | null) => void;
}

export function FileUploadTrigger(props: FileUploadTriggerProps) {
  const { onSelect, ...rest } = props;

  return (
    <AriaFileTrigger
      {...rest}
      onSelect={(files) => {
        onSelect?.(files ? Array.from(files) : null);
      }}
    />
  );
}

export interface FileUploadDropAreaProps
  extends Omit<AriaDropZoneProps, 'className'>,
    VariantProps<typeof fileUploadDropAreaStyles> {
  className?: string;
}

export function FileUploadDropArea(props: FileUploadDropAreaProps) {
  const { className, ...rest } = props;

  return (
    <AriaDropZone
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        fileUploadDropAreaStyles({ ...renderProps, className }),
      )}
    />
  );
}

export interface FileUploadFileListProps
  extends ComponentProps<'ul'>,
    VariantProps<typeof fileUploadFileListStyles> {}

export function FileUploadFileList(props: FileUploadFileListProps) {
  const { className, ...rest } = props;

  return <ul {...rest} className={fileUploadFileListStyles({ className })} />;
}

export interface FileUploadFileItemProps
  extends ComponentProps<'li'>,
    VariantProps<typeof fileUploadFileItemStyles> {
  hasError?: boolean;
}

export function FileUploadFileItem(props: FileUploadFileItemProps) {
  const { className, hasError = false, ...rest } = props;

  return <li {...rest} className={fileUploadFileItemStyles({ className })} data-error={hasError ? 'true' : undefined} />;
}

export interface FileUploadFileMarkerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fileUploadFileMarkerStyles> {}

export function FileUploadFileMarker(props: FileUploadFileMarkerProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={fileUploadFileMarkerStyles({ className })} />;
}

export interface FileUploadFileInfoProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fileUploadFileInfoStyles> {}

export function FileUploadFileInfo(props: FileUploadFileInfoProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={fileUploadFileInfoStyles({ className })} />;
}

export interface FileUploadFileNameProps
  extends ComponentProps<'span'>,
    VariantProps<typeof fileUploadFileNameStyles> {}

export function FileUploadFileName(props: FileUploadFileNameProps) {
  const { className, ...rest } = props;

  return <span {...rest} className={fileUploadFileNameStyles({ className })} />;
}

export interface FileUploadFileMetaProps
  extends ComponentProps<'span'>,
    VariantProps<typeof fileUploadFileMetaStyles> {}

export function FileUploadFileMeta(props: FileUploadFileMetaProps) {
  const { className, ...rest } = props;

  return <span {...rest} className={fileUploadFileMetaStyles({ className })} />;
}

export interface FileUploadViewportOverlayProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fileUploadViewportOverlayStyles> {}

export function FileUploadViewportOverlay(props: FileUploadViewportOverlayProps) {
  const { children, className, ...rest } = props;

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div {...rest} className={fileUploadViewportOverlayStyles({ className })}>
      {children}
    </div>,
    document.body,
  );
}

export interface FileUploadViewportOverlayMessageProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fileUploadViewportOverlayMessageStyles> {}

export function FileUploadViewportOverlayMessage(props: FileUploadViewportOverlayMessageProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={fileUploadViewportOverlayMessageStyles({ className })} />;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    accept,
    dropAreaExpandable = false,
    droppable = false,
    initialFiles = [],
    maxFiles = 1,
    maxFileSize,
    maxTotalSize,
    messages = fileUploadDefaultMessages,
  } = options;
  const [files, setFiles] = useState<FileInfo[]>(initialFiles);
  const [errors, setErrors] = useState<string[]>(() =>
    buildGlobalErrors(initialFiles, {
      maxFiles,
      maxTotalSizeBytes: parseSize(maxTotalSize),
      messages,
    }),
  );
  const [showViewportOverlay, setShowViewportOverlay] = useState(false);

  const maxFileSizeBytes = useMemo(() => parseSize(maxFileSize), [maxFileSize]);
  const maxTotalSizeBytes = useMemo(() => parseSize(maxTotalSize), [maxTotalSize]);

  const recalculateState = useCallback(
    (nextFiles: FileInfo[]) => {
      const nextErrors = buildGlobalErrors(nextFiles, {
        maxFiles,
        maxTotalSizeBytes,
        messages,
      });
      setFiles(maxFiles ? nextFiles.slice(0, maxFiles) : nextFiles);
      setErrors(nextErrors);
    },
    [maxFiles, maxTotalSizeBytes, messages],
  );

  const addFiles = useCallback(
    (nextFiles: File[]) => {
      const uploadedFiles = nextFiles.map<FileInfo>((file) => ({
        id: createFileId(file),
        file,
        name: file.name,
        size: file.size,
        errors: validateFile(file, {
          accept,
          maxFileSizeBytes,
          messages,
        }),
      }));

      recalculateState([...files, ...uploadedFiles]);
    },
    [accept, files, maxFileSizeBytes, messages, recalculateState],
  );

  const handleSelect = useCallback(
    (selectedFiles: File[] | null) => {
      if (!selectedFiles?.length) {
        return;
      }

      addFiles(selectedFiles);
    },
    [addFiles],
  );

  const handleDrop = useCallback(
    async (event: { items: DropItem[] }) => {
      const droppedFiles = await collectFilesFromDropItems(event.items);
      if (!droppedFiles.length) {
        return;
      }

      addFiles(droppedFiles);
      setShowViewportOverlay(false);
    },
    [addFiles],
  );

  const removeFile = useCallback(
    (id: string) => {
      recalculateState(files.filter((file) => file.id !== id));
    },
    [files, recalculateState],
  );

  useEffect(() => {
    if (!droppable || !dropAreaExpandable || typeof window === 'undefined') {
      return;
    }

    let dragDepth = 0;
    const hasFiles = (event: DragEvent) => Array.from(event.dataTransfer?.types ?? []).includes('Files');

    const handleWindowDragEnter = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      dragDepth += 1;
      setShowViewportOverlay(true);
    };

    const handleWindowDragLeave = (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }

      dragDepth = Math.max(dragDepth - 1, 0);
      if (dragDepth === 0) {
        setShowViewportOverlay(false);
      }
    };

    const resetOverlay = () => {
      dragDepth = 0;
      setShowViewportOverlay(false);
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);
    window.addEventListener('drop', resetOverlay);
    window.addEventListener('dragend', resetOverlay);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
      window.removeEventListener('drop', resetOverlay);
      window.removeEventListener('dragend', resetOverlay);
    };
  }, [dropAreaExpandable, droppable]);

  return {
    errors,
    files,
    hasError: errors.length > 0,
    isMultiple: maxFiles > 1,
    removeFile,
    handleDrop,
    handleSelect,
    showViewportOverlay,
    setFiles: recalculateState,
    setErrors,
  };
}

export {
  fileUploadDropAreaStyles,
  fileUploadFileInfoStyles,
  fileUploadFileItemStyles,
  fileUploadFileListStyles,
  fileUploadFileMarkerStyles,
  fileUploadFileMetaStyles,
  fileUploadFileNameStyles,
  fileUploadStyles,
  fileUploadViewportOverlayMessageStyles,
  fileUploadViewportOverlayStyles,
};
