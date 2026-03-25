'use client';

import type { DropItem } from '@react-types/shared';
import {
  type ChangeEvent,
  type ComponentProps,
  forwardRef,
  type DragEvent as ReactDragEvent,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  DropZone as AriaDropZone,
  type DropZoneProps as AriaDropZoneProps,
  FileTrigger as AriaFileTrigger,
  type FileTriggerProps as AriaFileTriggerProps,
  composeRenderProps,
} from 'react-aria-components';
import { createPortal } from 'react-dom';
import type { VariantProps } from 'tailwind-variants';
import { focusVisibleRing, tv } from '../utils';
import { fileUploadDefaultMessages } from './messages';
import type { FileInfo, FileUploadMessages, UseFileUploadOptions } from './types';
import { isFileTypeAllowed, parseAcceptAttribute, parseSize } from './utils';

const fileUploadStyles = tv({
  base: 'group/file-upload text-solid-gray-800 text-std-16N-170 [overflow-wrap:anywhere]',
});

const fileUploadInputStyles = tv({
  base: 'hidden',
});

const fileUploadDropAreaStyles = tv({
  extend: focusVisibleRing,
  base: [
    'rounded-8 border border-solid-gray-536 bg-solid-gray-50 p-8',
    'group-data-[has-error=true]/file-upload:border-error-1',
    'data-hovered:bg-solid-gray-100',
  ],
  variants: {
    isDisabled: {
      true: 'opacity-50',
      false: '',
    },
    isDragOver: {
      true: 'bg-green-50 outline-4 outline-success-1 -outline-offset-4',
      false: '',
    },
    isDropTarget: {
      true: 'bg-green-50 outline-4 outline-success-1 -outline-offset-4',
      false: '',
    },
    isFocusVisible: {
      true: '',
      false: '',
    },
  },
});

const fileUploadFileListStyles = tv({
  base: 'mt-4 list-none p-0 [counter-reset:file-item]',
});

const fileUploadFileItemStyles = tv({
  base: 'group/file-item flex items-baseline [counter-increment:file-item] [&+&]:mt-1',
});

const fileUploadFileMarkerStyles = tv({
  base: [
    'shrink-0',
    'group-data-[multiple=true]/file-upload:w-8 group-data-[multiple=true]/file-upload:before:content-[counter(file-item)"\\."]',
    'group-data-[multiple=false]/file-upload:flex group-data-[multiple=false]/file-upload:h-[calc(30/16*1rem)] group-data-[multiple=false]/file-upload:w-6 group-data-[multiple=false]/file-upload:items-center group-data-[multiple=false]/file-upload:justify-center group-data-[multiple=false]/file-upload:self-start',
    'group-data-[multiple=false]/file-upload:before:size-1.5 group-data-[multiple=false]/file-upload:before:rounded-full group-data-[multiple=false]/file-upload:before:bg-current group-data-[multiple=false]/file-upload:before:content-[""]',
    'group-data-[multiple=false]/file-upload:forced-colors:before:bg-[CanvasText]',
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
  base: 'fixed inset-0 z-9999 border-4 border-success-1 bg-green-50',
});

const fileUploadViewportOverlayMessageStyles = tv({
  base: [
    'pointer-events-none flex h-full w-full flex-wrap content-center justify-center box-border p-[calc(2rem-4px)] text-center font-bold',
    'text-[clamp(calc(18/16*1rem),0.75rem+1.875vw,calc(48/16*1rem))]',
  ],
});

const expandedDropAreaState = {
  activeCallback: null as (() => void) | null,
};

function registerExpandedDropArea(callback: () => void) {
  if (expandedDropAreaState.activeCallback && expandedDropAreaState.activeCallback !== callback) {
    expandedDropAreaState.activeCallback();
  }

  expandedDropAreaState.activeCallback = callback;
}

function unregisterExpandedDropArea(callback: () => void) {
  if (expandedDropAreaState.activeCallback === callback) {
    expandedDropAreaState.activeCallback = null;
  }
}

function createFileId() {
  return `file-${Math.random().toString(36).slice(-8)}`;
}

function hasFilesDragData(
  event?:
    | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer'>
    | Pick<DragEvent, 'dataTransfer'>
    | null,
) {
  if (!event) {
    return true;
  }

  return Array.from(event.dataTransfer?.types ?? []).includes('Files');
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

async function getFilesFromDropEvent(event: {
  items?: DropItem[];
  dataTransfer?: DataTransfer | null;
}) {
  if (event.items) {
    return collectFilesFromDropItems(event.items);
  }

  return Array.from(event.dataTransfer?.files ?? []);
}

function validateFileList(
  fileList: FileInfo[],
  options: {
    accept?: string;
    maxFiles: number;
    maxFileSizeBytes: number | null;
    maxTotalSizeBytes: number | null;
    messages: FileUploadMessages;
  },
) {
  const errors: string[] = [];
  const validatedFiles = fileList.map((file) => ({
    ...file,
    errors: file.isExisting ? (file.errors ?? []) : [],
  }));
  const newFiles = validatedFiles.filter((file) => !file.isExisting);
  const totalSize = validatedFiles.reduce((sum, file) => sum + (file.size || 0), 0);
  const allowedExtensions = parseAcceptAttribute(options.accept ?? '');

  if (validatedFiles.length > options.maxFiles) {
    errors.push(options.messages.error.maxFiles);
  }

  for (const file of newFiles) {
    if (
      allowedExtensions.length > 0 &&
      file.file &&
      !isFileTypeAllowed(file.name, file.file.type, allowedExtensions)
    ) {
      file.errors = [...(file.errors ?? []), options.messages.error.invalidType];
    }

    if (options.maxFileSizeBytes !== null && file.size > options.maxFileSizeBytes) {
      file.errors = [...(file.errors ?? []), options.messages.error.maxFileSize];
    }
  }

  if (options.maxTotalSizeBytes !== null && totalSize > options.maxTotalSizeBytes) {
    errors.push(options.messages.error.maxTotalSize);
  }

  if (validatedFiles.some((file) => (file.errors?.length ?? 0) > 0)) {
    errors.unshift(options.messages.error.hasFileErrors);
  }

  return {
    errors,
    validatedFiles,
  };
}

export interface FileUploadProps
  extends ComponentProps<'div'>,
    VariantProps<typeof fileUploadStyles> {
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

export interface FileUploadInputProps extends Omit<ComponentProps<'input'>, 'type'> {}

export const FileUploadInput = forwardRef<HTMLInputElement, FileUploadInputProps>(
  function FileUploadInput(props, ref) {
    const { className, ...rest } = props;

    return (
      <input {...rest} className={fileUploadInputStyles({ className })} ref={ref} type='file' />
    );
  },
);

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
    Pick<ComponentProps<'div'>, 'onDragEnter' | 'onDragLeave' | 'onDragOver'>,
    VariantProps<typeof fileUploadDropAreaStyles> {
  className?: string;
  isDragOver?: boolean;
}

export function FileUploadDropArea(props: FileUploadDropAreaProps) {
  const { className, isDragOver = false, ...rest } = props;

  return (
    <AriaDropZone
      {...rest}
      className={composeRenderProps(className, (className, renderProps) =>
        fileUploadDropAreaStyles({
          ...renderProps,
          className,
          isDragOver,
        }),
      )}
      data-dragover={isDragOver ? 'true' : undefined}
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

  return (
    <li
      {...rest}
      className={fileUploadFileItemStyles({ className })}
      data-error={hasError ? 'true' : undefined}
    />
  );
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

function useValidatedFilesState(options: UseFileUploadOptions = {}) {
  const {
    accept = '',
    initialFiles = [],
    maxFiles = 1,
    maxFileSize,
    maxTotalSize,
    messages: customMessages,
  } = options;
  const messages = customMessages ?? fileUploadDefaultMessages;
  const inputRef = useRef<HTMLInputElement>(null);
  const selectButtonRef = useRef<HTMLDivElement>(null);
  const maxFileSizeBytes = useMemo(() => parseSize(maxFileSize) ?? null, [maxFileSize]);
  const maxTotalSizeBytes = useMemo(() => parseSize(maxTotalSize) ?? null, [maxTotalSize]);
  const validateFiles = useCallback(
    (fileList: FileInfo[]) =>
      validateFileList(fileList, {
        accept,
        maxFiles,
        maxFileSizeBytes,
        maxTotalSizeBytes,
        messages,
      }),
    [accept, maxFiles, maxFileSizeBytes, maxTotalSizeBytes, messages],
  );
  const [files, setFilesState] = useState<FileInfo[]>(
    () => validateFiles(initialFiles).validatedFiles,
  );
  const [errors, setErrorsState] = useState<string[]>(() => validateFiles(initialFiles).errors);

  useEffect(() => {
    setFilesState((currentFiles) => {
      const { errors: nextErrors, validatedFiles } = validateFiles(currentFiles);
      setErrorsState(nextErrors);
      return validatedFiles;
    });
  }, [validateFiles]);

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const selectionSummarySuffix = `${files.length}-${totalSize}`;
  const isMultiple = maxFiles > 1;
  const hasError = errors.length > 0;

  const setFiles = useCallback(
    (nextFiles: SetStateAction<FileInfo[]>) => {
      setFilesState((currentFiles) => {
        const resolvedFiles = typeof nextFiles === 'function' ? nextFiles(currentFiles) : nextFiles;
        const { errors: nextErrors, validatedFiles } = validateFiles(resolvedFiles);
        setErrorsState(nextErrors);
        return validatedFiles;
      });
    },
    [validateFiles],
  );

  const addFiles = useCallback(
    (newFileList: File[]) => {
      setFilesState((currentFiles) => {
        const filesToAdd = isMultiple ? newFileList : newFileList.slice(0, 1);
        const existingFiles = !isMultiple && currentFiles.length > 0 ? [] : currentFiles;
        const appendedFiles: FileInfo[] = filesToAdd.map((file) => ({
          id: createFileId(),
          errors: [],
          file,
          isExisting: false,
          name: file.name,
          size: file.size,
        }));
        const { errors: nextErrors, validatedFiles } = validateFiles([
          ...existingFiles,
          ...appendedFiles,
        ]);
        setErrorsState(nextErrors);
        return validatedFiles;
      });
    },
    [isMultiple, validateFiles],
  );

  const removeFile = useCallback(
    (fileId: string, index = 0) => {
      const updatedFiles = files.filter((file) => file.id !== fileId);
      const { errors: nextErrors, validatedFiles } = validateFiles(updatedFiles);
      setFilesState(validatedFiles);
      setErrorsState(nextErrors);

      if (typeof document === 'undefined') {
        return;
      }

      requestAnimationFrame(() => {
        if (validatedFiles.length === 0) {
          selectButtonRef.current?.focus();
          return;
        }

        const nextIndex = Math.min(index, validatedFiles.length - 1);
        document.getElementById(`${validatedFiles[nextIndex].id}-remove`)?.focus();
      });
    },
    [files, validateFiles],
  );

  const handleSelectButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(event.target.files ?? []);
      if (selectedFiles.length > 0) {
        addFiles(selectedFiles);
      }

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      selectButtonRef.current?.focus();
    },
    [addFiles],
  );

  return {
    addFiles,
    errors,
    files,
    handleInputChange,
    handleSelectButtonClick,
    hasError,
    inputRef,
    isMultiple,
    maxFileSizeBytes,
    maxTotalSizeBytes,
    messages,
    removeFile,
    selectButtonRef,
    selectionSummarySuffix,
    setErrors: setErrorsState,
    setFiles,
    totalSize,
    validateFiles,
  };
}

function useFileDropState(options: {
  dropAreaExpandable?: boolean;
  droppable?: boolean;
  focusTargetRef?: RefObject<HTMLElement | null>;
  messages?: FileUploadMessages;
  onFilesAdded: (files: File[]) => void;
}) {
  const {
    dropAreaExpandable = false,
    droppable = false,
    focusTargetRef,
    messages: customMessages,
    onFilesAdded,
  } = options;
  const messages = customMessages ?? fileUploadDefaultMessages;
  const [isDragOver, setIsDragOver] = useState(false);
  const [isExpandedDropArea, setIsExpandedDropArea] = useState(false);
  const [showViewportOverlay, setShowViewportOverlay] = useState(false);
  const [announcerText, setAnnouncerText] = useState('');
  const [announcerAssertiveText, setAnnouncerAssertiveText] = useState('');
  const dragCounterRef = useRef(0);
  const announcerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragOverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropAnnounceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const collapseCallbackRef = useRef(() => setIsExpandedDropArea(false));

  const announceText = useCallback((text: string, assertive = false) => {
    const setText = assertive ? setAnnouncerAssertiveText : setAnnouncerText;

    if (announcerTimerRef.current) {
      clearTimeout(announcerTimerRef.current);
    }

    setText('');
    announcerTimerRef.current = setTimeout(() => {
      setText(text);
      announcerTimerRef.current = setTimeout(() => {
        setText('');
      }, 1000);
    }, 100);
  }, []);

  const stopDropAnnounce = useCallback(() => {
    if (dropAnnounceIntervalRef.current) {
      clearInterval(dropAnnounceIntervalRef.current);
      dropAnnounceIntervalRef.current = null;
    }
  }, []);

  const startDropAnnounce = useCallback(() => {
    stopDropAnnounce();
    announceText(messages.announce.dropAvailable, true);
    dropAnnounceIntervalRef.current = setInterval(() => {
      announceText(messages.announce.dropAvailable);
    }, 3000);
  }, [announceText, messages.announce.dropAvailable, stopDropAnnounce]);

  const handleExpandedDropAreaChange = useCallback((checked: boolean) => {
    setIsExpandedDropArea(checked);

    if (checked) {
      registerExpandedDropArea(collapseCallbackRef.current);
    } else {
      unregisterExpandedDropArea(collapseCallbackRef.current);
    }
  }, []);

  const handleDragEnter = useCallback(
    (
      event?:
        | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer'>
        | Pick<DragEvent, 'dataTransfer'>
        | null,
    ) => {
      if (!hasFilesDragData(event)) {
        return;
      }

      dragCounterRef.current += 1;
      if (dragCounterRef.current === 1) {
        setIsDragOver(true);
        startDropAnnounce();
      }
    },
    [startDropAnnounce],
  );

  const handleDragOver = useCallback(
    (
      event:
        | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer' | 'preventDefault'>
        | Pick<DragEvent, 'dataTransfer' | 'preventDefault' | 'stopPropagation'>,
    ) => {
      event.preventDefault();
      if ('stopPropagation' in event) {
        event.stopPropagation?.();
      }
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    },
    [],
  );

  const handleDragLeave = useCallback(
    (
      event?:
        | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer'>
        | Pick<DragEvent, 'dataTransfer'>
        | null,
    ) => {
      if (!hasFilesDragData(event)) {
        return;
      }

      dragCounterRef.current = Math.max(dragCounterRef.current - 1, 0);
      if (dragCounterRef.current === 0) {
        setIsDragOver(false);
        stopDropAnnounce();
        announceText(messages.announce.dropUnavailable, true);
      }
    },
    [announceText, messages.announce.dropUnavailable, stopDropAnnounce],
  );

  const handleDrop = useCallback(
    async (event: {
      dataTransfer?: DataTransfer | null;
      items?: DropItem[];
      preventDefault?: () => void;
      stopPropagation?: () => void;
    }) => {
      event.preventDefault?.();
      event.stopPropagation?.();
      dragCounterRef.current = 0;
      setIsDragOver(false);
      stopDropAnnounce();

      const droppedFiles = await getFilesFromDropEvent(event);
      if (droppedFiles.length > 0) {
        onFilesAdded(droppedFiles);
      }

      focusTargetRef?.current?.focus();
    },
    [focusTargetRef, onFilesAdded, stopDropAnnounce],
  );

  const handleViewportDragEnter = useCallback(
    (
      event?:
        | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer'>
        | Pick<DragEvent, 'dataTransfer'>
        | null,
    ) => {
      if (!hasFilesDragData(event)) {
        return;
      }

      dragCounterRef.current += 1;
      if (dragCounterRef.current === 1) {
        startDropAnnounce();
      }
    },
    [startDropAnnounce],
  );

  const handleViewportDragOver = useCallback(
    (event: Pick<DragEvent, 'dataTransfer' | 'preventDefault' | 'stopPropagation'>) => {
      event.preventDefault();
      event.stopPropagation?.();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }

      if (dragOverTimerRef.current) {
        clearTimeout(dragOverTimerRef.current);
      }

      dragOverTimerRef.current = setTimeout(() => {
        setShowViewportOverlay(false);
        dragCounterRef.current = 0;
      }, 300);
    },
    [],
  );

  const handleViewportDragLeave = useCallback(
    (
      event?:
        | Pick<ReactDragEvent<HTMLElement>, 'dataTransfer'>
        | Pick<DragEvent, 'dataTransfer'>
        | null,
    ) => {
      if (!hasFilesDragData(event)) {
        return;
      }

      dragCounterRef.current = Math.max(dragCounterRef.current - 1, 0);
      if (dragCounterRef.current === 0) {
        setShowViewportOverlay(false);
        stopDropAnnounce();
        announceText(messages.announce.dropUnavailable, true);
      }
    },
    [announceText, messages.announce.dropUnavailable, stopDropAnnounce],
  );

  const handleViewportDrop = useCallback(
    async (event: Pick<DragEvent, 'dataTransfer' | 'preventDefault' | 'stopPropagation'>) => {
      event.preventDefault();
      event.stopPropagation?.();
      dragCounterRef.current = 0;
      setShowViewportOverlay(false);
      stopDropAnnounce();

      const droppedFiles = Array.from(event.dataTransfer?.files ?? []);
      if (droppedFiles.length > 0) {
        onFilesAdded(droppedFiles);
      }

      focusTargetRef?.current?.focus();
    },
    [focusTargetRef, onFilesAdded, stopDropAnnounce],
  );

  useEffect(() => {
    if (!droppable || !dropAreaExpandable) {
      return;
    }

    const handleDocumentDragOver = (event: DragEvent) => {
      if (!isExpandedDropArea || !hasFilesDragData(event)) {
        return;
      }

      event.preventDefault();
      setShowViewportOverlay(true);
    };

    document.documentElement.addEventListener('dragover', handleDocumentDragOver);

    return () => {
      document.documentElement.removeEventListener('dragover', handleDocumentDragOver);
    };
  }, [dropAreaExpandable, droppable, isExpandedDropArea]);

  useEffect(() => {
    return () => {
      if (announcerTimerRef.current) {
        clearTimeout(announcerTimerRef.current);
      }

      if (dragOverTimerRef.current) {
        clearTimeout(dragOverTimerRef.current);
      }

      stopDropAnnounce();
      unregisterExpandedDropArea(collapseCallbackRef.current);
    };
  }, [stopDropAnnounce]);

  return {
    announcerAssertiveText,
    announcerText,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleExpandedDropAreaChange,
    handleViewportDragEnter,
    handleViewportDragLeave,
    handleViewportDragOver,
    handleViewportDrop,
    isDragOver,
    isExpandedDropArea,
    showViewportOverlay,
  };
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { dropAreaExpandable = false, droppable = false, messages } = options;
  const fileState = useValidatedFilesState(options);
  const fileDrop = useFileDropState({
    dropAreaExpandable,
    droppable,
    focusTargetRef: fileState.selectButtonRef,
    messages,
    onFilesAdded: fileState.addFiles,
  });

  return {
    addFiles: fileState.addFiles,
    announcerAssertiveText: fileDrop.announcerAssertiveText,
    announcerText: fileDrop.announcerText,
    errors: fileState.errors,
    files: fileState.files,
    handleDragEnter: fileDrop.handleDragEnter,
    handleDragLeave: fileDrop.handleDragLeave,
    handleDragOver: fileDrop.handleDragOver,
    handleDrop: fileDrop.handleDrop,
    handleExpandedDropAreaChange: fileDrop.handleExpandedDropAreaChange,
    handleInputChange: fileState.handleInputChange,
    handleSelectButtonClick: fileState.handleSelectButtonClick,
    handleViewportDragEnter: fileDrop.handleViewportDragEnter,
    handleViewportDragLeave: fileDrop.handleViewportDragLeave,
    handleViewportDragOver: fileDrop.handleViewportDragOver,
    handleViewportDrop: fileDrop.handleViewportDrop,
    hasError: fileState.hasError,
    inputRef: fileState.inputRef,
    isDragOver: fileDrop.isDragOver,
    isExpandedDropArea: fileDrop.isExpandedDropArea,
    isMultiple: fileState.isMultiple,
    maxFileSizeBytes: fileState.maxFileSizeBytes,
    maxTotalSizeBytes: fileState.maxTotalSizeBytes,
    messages: fileState.messages,
    removeFile: fileState.removeFile,
    selectButtonRef: fileState.selectButtonRef,
    selectionSummarySuffix: fileState.selectionSummarySuffix,
    setErrors: fileState.setErrors,
    setFiles: fileState.setFiles,
    showViewportOverlay: fileDrop.showViewportOverlay,
    totalSize: fileState.totalSize,
    validateFiles: fileState.validateFiles,
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
  fileUploadInputStyles,
  fileUploadStyles,
  fileUploadViewportOverlayMessageStyles,
  fileUploadViewportOverlayStyles,
};
