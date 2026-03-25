import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import { Button, type ButtonProps } from '../Button';
import { Checkbox } from '../Checkbox';
import { Label } from '../FormControl';
import { tv } from '../utils';
import {
  FileUpload,
  FileUploadDropArea,
  FileUploadFileInfo,
  FileUploadFileItem,
  FileUploadFileList,
  FileUploadFileMarker,
  FileUploadFileMeta,
  FileUploadFileName,
  FileUploadInput,
  FileUploadViewportOverlay,
  FileUploadViewportOverlayMessage,
  useFileUpload,
} from './FileUpload';
import type { FileInfo, UseFileUploadOptions } from './types';
import { formatSize } from './utils';

const fileUploadRootStyles = tv({
  base: 'flex flex-col gap-2',
});

const fileUploadDescriptionStyles = tv({
  base: 'text-std-16N-170 text-solid-gray-600',
});

const fileUploadAreaStyles = tv({
  base: '',
});

const fileUploadButtonGroupStyles = tv({
  base: 'flex flex-wrap items-center gap-x-4 gap-y-2',
});

const fileUploadDropHintStyles = tv({
  base: 'w-0 min-w-[12em] grow',
});

const fileUploadErrorMessagesStyles = tv({
  base: 'mt-2 list-none p-0 text-error-1 group-data-[droppable=true]/file-upload:text-error-1',
});

type FileUploadRootContextValue = ReturnType<typeof useFileUpload> & {
  buttonId: string;
  descriptionId: string;
  dropAreaExpandable: boolean;
  droppable: boolean;
  errorMessagesId: string;
  hasDescription: boolean;
  hasLabel: boolean;
  inputId: string;
  inputName: string;
  labelId: string;
  setHasDescription: (nextValue: boolean) => void;
  setHasLabel: (nextValue: boolean) => void;
};

const FileUploadRootContext = createContext<FileUploadRootContextValue | null>(null);

function useFileUploadRootContext(componentName: string) {
  const context = useContext(FileUploadRootContext);

  if (!context) {
    throw new Error(`${componentName} must be used within FileUploadRoot.`);
  }

  return context;
}

function useContextPresenceRegistration(register: (nextValue: boolean) => void, value: ReactNode) {
  useEffect(() => {
    if (value == null) {
      return;
    }

    register(true);

    return () => {
      register(false);
    };
  }, [register, value]);
}

function joinIds(...values: Array<string | undefined>) {
  const ids = values.filter(Boolean);
  return ids.length > 0 ? ids.join(' ') : undefined;
}

function defaultRenderFileMeta(file: FileInfo) {
  return (
    <>
      <span>{formatSize(file.size)}</span>（<span>{file.size.toLocaleString()}</span>バイト）
    </>
  );
}

export interface FileUploadRootProps
  extends Omit<ComponentProps<'div'>, 'children'>,
    UseFileUploadOptions {
  children?: ReactNode;
  inputId?: string;
  inputName?: string;
}

export function FileUploadRoot(props: FileUploadRootProps) {
  const {
    accept,
    children,
    className,
    dropAreaExpandable = false,
    droppable = false,
    initialFiles,
    inputId: providedInputId,
    inputName = 'file-upload',
    maxFileSize,
    maxFiles = 1,
    maxTotalSize,
    messages,
    ...rest
  } = props;
  const autoInputId = useId();
  const buttonId = useId();
  const descriptionId = useId();
  const errorMessagesId = useId();
  const labelId = useId();
  const inputId = providedInputId ?? autoInputId;
  const [hasLabel, setHasLabel] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const fileUpload = useFileUpload({
    accept,
    dropAreaExpandable,
    droppable,
    initialFiles,
    maxFileSize,
    maxFiles,
    maxTotalSize,
    messages,
  });

  return (
    <FileUploadRootContext.Provider
      value={{
        ...fileUpload,
        buttonId,
        descriptionId,
        dropAreaExpandable,
        droppable,
        errorMessagesId,
        hasDescription,
        hasLabel,
        inputId,
        inputName,
        labelId,
        setHasDescription,
        setHasLabel,
      }}
    >
      <FileUpload
        {...rest}
        className={fileUploadRootStyles({ className })}
        droppable={droppable}
        hasError={fileUpload.hasError}
        maxFiles={maxFiles}
      >
        <FileUploadInput
          accept={accept}
          id={inputId}
          multiple={maxFiles > 1}
          name={inputName}
          onChange={fileUpload.handleInputChange}
          ref={fileUpload.inputRef}
        />
        <div aria-live='polite' className='sr-only'>
          {fileUpload.announcerText}
        </div>
        <div aria-live='assertive' className='sr-only'>
          {fileUpload.announcerAssertiveText}
        </div>
        {children}
      </FileUpload>
    </FileUploadRootContext.Provider>
  );
}

export interface FileUploadLabelProps extends ComponentProps<typeof Label> {}

export function FileUploadLabel(props: FileUploadLabelProps) {
  const { children, ...rest } = props;
  const { inputId, labelId, setHasLabel } = useFileUploadRootContext('FileUploadLabel');

  useContextPresenceRegistration(setHasLabel, children);

  return (
    <Label {...rest} htmlFor={inputId} id={labelId}>
      {children}
    </Label>
  );
}

export interface FileUploadDescriptionProps extends ComponentProps<'div'> {}

export function FileUploadDescription(props: FileUploadDescriptionProps) {
  const { children, className, ...rest } = props;
  const { descriptionId, setHasDescription } = useFileUploadRootContext('FileUploadDescription');

  useContextPresenceRegistration(setHasDescription, children);

  return (
    <div {...rest} className={fileUploadDescriptionStyles({ className })} id={descriptionId}>
      {children}
    </div>
  );
}

export interface FileUploadAreaProps extends ComponentProps<'div'> {}

export function FileUploadArea(props: FileUploadAreaProps) {
  const { children, className, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadArea');

  const areaProps = {
    ...rest,
    className: fileUploadAreaStyles({ className }),
    onDragEnter: context.handleDragEnter,
    onDragLeave: context.handleDragLeave,
    onDragOver: context.handleDragOver,
    onDrop: context.handleDrop,
  };

  if (context.droppable) {
    return (
      <FileUploadDropArea isDragOver={context.isDragOver} {...areaProps}>
        {children}
      </FileUploadDropArea>
    );
  }

  return <div {...areaProps}>{children}</div>;
}

export interface FileUploadButtonGroupProps extends ComponentProps<'div'> {}

export function FileUploadButtonGroup(props: FileUploadButtonGroupProps) {
  const { className, ...rest } = props;

  return <div {...rest} className={fileUploadButtonGroupStyles({ className })} />;
}

export interface FileUploadTriggerButtonProps extends Omit<ButtonProps, 'onPress' | 'type'> {}

export function FileUploadTriggerButton(props: FileUploadTriggerButtonProps) {
  const { children, className, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadTriggerButton');
  const selectionSummaryId =
    context.files.length > 0
      ? `${context.buttonId}-${context.selectionSummarySuffix}-summary`
      : undefined;

  return (
    <div ref={context.selectButtonRef} tabIndex={-1}>
      <Button
        {...rest}
        aria-describedby={joinIds(
          selectionSummaryId,
          context.errors.length > 0 ? context.errorMessagesId : undefined,
          context.hasDescription ? context.descriptionId : undefined,
        )}
        aria-labelledby={joinIds(context.hasLabel ? context.labelId : undefined, context.buttonId)}
        className={[
          'shrink-0 data-[dragover=true]:bg-blue-300 data-[dragover=true]:text-blue-1200 data-[dragover=true]:underline group-data-[has-error=true]/file-upload:border-error-1',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-dragover={!context.droppable && context.isDragOver ? 'true' : undefined}
        id={context.buttonId}
        onPress={context.handleSelectButtonClick}
        type='button'
        variant='secondary'
      >
        {children}
      </Button>
    </div>
  );
}

export interface FileUploadDropHintProps extends ComponentProps<'p'> {}

export function FileUploadDropHint(props: FileUploadDropHintProps) {
  const { children, className, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadDropHint');

  if (!context.droppable) {
    return null;
  }

  return (
    <p {...rest} className={fileUploadDropHintStyles({ className })}>
      {children}
    </p>
  );
}

export interface FileUploadSelectionSummaryProps extends ComponentProps<'p'> {}

export function FileUploadSelectionSummary(props: FileUploadSelectionSummaryProps) {
  const { className, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadSelectionSummary');

  if (context.files.length === 0) {
    return null;
  }

  return (
    <p
      {...rest}
      className={className}
      id={`${context.buttonId}-${context.selectionSummarySuffix}-summary`}
    >
      選択中：{context.files.length}個、{formatSize(context.totalSize)}（
      {context.totalSize.toLocaleString()}バイト）
    </p>
  );
}

export interface FileUploadErrorMessagesProps extends ComponentProps<'ul'> {}

export function FileUploadErrorMessages(props: FileUploadErrorMessagesProps) {
  const { className, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadErrorMessages');

  if (context.errors.length === 0) {
    return null;
  }

  return (
    <ul
      {...rest}
      className={fileUploadErrorMessagesStyles({ className })}
      id={context.errorMessagesId}
    >
      {context.errors.map((error) => (
        <li key={error}>＊{error}</li>
      ))}
    </ul>
  );
}

export interface FileUploadExpandDropAreaToggleProps
  extends Omit<ComponentProps<typeof Checkbox>, 'isSelected' | 'onChange'> {}

export function FileUploadExpandDropAreaToggle(props: FileUploadExpandDropAreaToggleProps) {
  const context = useFileUploadRootContext('FileUploadExpandDropAreaToggle');

  if (!context.droppable || !context.dropAreaExpandable) {
    return null;
  }

  return (
    <Checkbox
      {...props}
      isSelected={context.isExpandedDropArea}
      onChange={context.handleExpandedDropAreaChange}
    />
  );
}

export interface FileUploadItemsProps extends Omit<ComponentProps<'div'>, 'children'> {
  emptyMessage?: ReactNode;
  existingInputName?: string;
  getExistingInputValue?: (file: FileInfo) => string;
  removeButtonLabel?: ReactNode | ((file: FileInfo) => ReactNode);
}

export function FileUploadItems(props: FileUploadItemsProps) {
  const {
    className,
    emptyMessage = 'ファイルが選択されていません',
    existingInputName,
    getExistingInputValue = (file) => `temp-${file.id}`,
    removeButtonLabel = '解除',
    ...rest
  } = props;
  const context = useFileUploadRootContext('FileUploadItems');

  if (context.files.length === 0) {
    return (
      <div {...rest} className={className}>
        <p className='mt-4'>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div {...rest} className={className}>
      <FileUploadFileList>
        {context.files.map((file, index) => {
          const hasFileError = (file.errors?.length ?? 0) > 0;

          return (
            <FileUploadFileItem hasError={hasFileError} key={file.id}>
              {file.isExisting && existingInputName ? (
                <input name={existingInputName} type='hidden' value={getExistingInputValue(file)} />
              ) : null}
              <FileUploadFileMarker />
              <FileUploadFileInfo>
                <p>
                  <FileUploadFileName id={`${file.id}-name`}>{file.name}</FileUploadFileName>
                  <FileUploadFileMeta>{defaultRenderFileMeta(file)}</FileUploadFileMeta>
                </p>
                {hasFileError ? file.errors?.map((error) => <p key={error}>＊{error}</p>) : null}
              </FileUploadFileInfo>
              <Button
                aria-labelledby={`${file.id}-remove ${file.id}-name`}
                className='order-[-1] min-h-[calc(30/16*1rem)] min-w-12 shrink-0 !no-underline'
                id={`${file.id}-remove`}
                onPress={() => context.removeFile(file.id, index)}
                size='xs'
                type='button'
                variant='tertiary'
              >
                {typeof removeButtonLabel === 'function'
                  ? removeButtonLabel(file)
                  : removeButtonLabel}
              </Button>
            </FileUploadFileItem>
          );
        })}
      </FileUploadFileList>
    </div>
  );
}

export interface FileUploadOverlayProps extends ComponentProps<typeof FileUploadViewportOverlay> {}

export function FileUploadOverlay(props: FileUploadOverlayProps) {
  const { children, ...rest } = props;
  const context = useFileUploadRootContext('FileUploadOverlay');

  if (!context.showViewportOverlay) {
    return null;
  }

  return (
    <FileUploadViewportOverlay
      {...rest}
      onDragEnter={context.handleViewportDragEnter}
      onDragLeave={context.handleViewportDragLeave}
      onDragOver={context.handleViewportDragOver}
      onDrop={context.handleViewportDrop}
    >
      {children ?? (
        <FileUploadViewportOverlayMessage>
          <span className='inline-block'>このエリア内にファイルを</span>
          <span className='inline-block'>ドラッグ＆ドロップ</span>
        </FileUploadViewportOverlayMessage>
      )}
    </FileUploadViewportOverlay>
  );
}

export {
  fileUploadAreaStyles,
  fileUploadButtonGroupStyles,
  fileUploadDescriptionStyles,
  fileUploadDropHintStyles,
  fileUploadErrorMessagesStyles,
  fileUploadRootStyles,
};
