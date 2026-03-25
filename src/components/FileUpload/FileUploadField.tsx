import { type ComponentProps, type ReactNode, useId } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Label } from '../FormControl';
import { type RequirementOption, renderRequirement } from '../FormControl/fieldHelpers';
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

const fileUploadFieldStyles = tv({
  base: 'flex flex-col gap-2',
});

const fileUploadFieldDescriptionStyles = tv({
  base: 'text-std-16N-170 text-solid-gray-600',
});

const fileUploadFieldErrorMessagesStyles = tv({
  base: 'mt-2 list-none p-0 text-error-1 group-data-[droppable=true]/file-upload:text-error-1',
});

const fileUploadFieldButtonAreaStyles = tv({
  base: 'flex flex-wrap items-center gap-x-4 gap-y-2',
});

export interface FileUploadFieldProps
  extends Omit<ComponentProps<'div'>, 'children'>,
    UseFileUploadOptions {
  buttonLabel?: ReactNode;
  description?: ReactNode;
  dragAndDropText?: ReactNode;
  emptyMessage?: ReactNode;
  existingInputName?: string;
  fileUploadClassName?: string;
  getExistingInputValue?: (file: FileInfo) => string;
  inputId?: string;
  inputName?: string;
  label?: ReactNode;
  removeButtonLabel?: ReactNode | ((file: FileInfo) => ReactNode);
  requirement?: RequirementOption;
  viewportOverlayMessage?: ReactNode;
  wholeWindowDropAreaLabel?: ReactNode;
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

export function FileUploadField(props: FileUploadFieldProps) {
  const {
    accept,
    buttonLabel = 'ファイルを選択',
    className,
    description,
    dragAndDropText = 'または、このエリア内にドラッグ＆ドロップ',
    dropAreaExpandable = false,
    droppable = false,
    emptyMessage = 'ファイルが選択されていません',
    existingInputName,
    fileUploadClassName,
    getExistingInputValue = (file) => `temp-${file.id}`,
    initialFiles,
    inputId: providedInputId,
    inputName = 'file-upload',
    label,
    maxFileSize,
    maxFiles = 1,
    maxTotalSize,
    messages,
    removeButtonLabel = '解除',
    requirement,
    viewportOverlayMessage = (
      <>
        <span className='inline-block'>このエリア内にファイルを</span>
        <span className='inline-block'>ドラッグ＆ドロップ</span>
      </>
    ),
    wholeWindowDropAreaLabel = 'ドラッグ＆ドロップの範囲をこのブラウザウィンドウ全体に広げる',
    ...rest
  } = props;
  const autoInputId = useId();
  const buttonId = useId();
  const errorMessagesId = useId();
  const labelId = useId();
  const selectedFilesId = useId();
  const supportTextId = useId();
  const inputId = providedInputId ?? autoInputId;
  const {
    announcerAssertiveText,
    announcerText,
    errors,
    files,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleExpandedDropAreaChange,
    handleInputChange,
    handleSelectButtonClick,
    handleViewportDragEnter,
    handleViewportDragLeave,
    handleViewportDragOver,
    handleViewportDrop,
    hasError,
    inputRef,
    isDragOver,
    isExpandedDropArea,
    removeFile,
    selectButtonRef,
    selectionSummarySuffix,
    showViewportOverlay,
    totalSize,
  } = useFileUpload({
    accept,
    dropAreaExpandable,
    droppable,
    initialFiles,
    maxFileSize,
    maxFiles,
    maxTotalSize,
    messages,
  });

  const selectionSummaryId =
    files.length > 0 ? `${selectedFilesId}-${selectionSummarySuffix}` : undefined;
  const descriptionId = description ? supportTextId : undefined;
  const errorId = errors.length > 0 ? errorMessagesId : undefined;

  const buttonArea = (
    // biome-ignore lint/a11y/noStaticElementInteractions: Drag-and-drop handling is intentionally attached to the wrapper in single-file mode.
    <div
      className={fileUploadFieldButtonAreaStyles()}
      onDragEnter={droppable ? undefined : handleDragEnter}
      onDragLeave={droppable ? undefined : handleDragLeave}
      onDragOver={droppable ? undefined : handleDragOver}
      onDrop={droppable ? undefined : handleDrop}
    >
      <div ref={selectButtonRef} tabIndex={-1}>
        <Button
          aria-describedby={joinIds(selectionSummaryId, errorId, descriptionId)}
          aria-labelledby={joinIds(label ? labelId : undefined, buttonId)}
          className='shrink-0 data-[dragover=true]:bg-blue-300 data-[dragover=true]:text-blue-1200 data-[dragover=true]:underline group-data-[has-error=true]/file-upload:border-error-1'
          data-dragover={!droppable && isDragOver ? 'true' : undefined}
          id={buttonId}
          onPress={handleSelectButtonClick}
          size='md'
          type='button'
          variant='secondary'
        >
          {buttonLabel}
        </Button>
      </div>
      {droppable ? <p className='w-0 min-w-[12em] grow'>{dragAndDropText}</p> : null}
    </div>
  );

  const fileList =
    files.length === 0 ? (
      <p className='mt-4'>{emptyMessage}</p>
    ) : (
      <FileUploadFileList>
        {files.map((file, index) => {
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
                onPress={() => removeFile(file.id, index)}
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
    );

  return (
    <div {...rest} className={fileUploadFieldStyles({ className })}>
      {label ? (
        <Label htmlFor={inputId} id={labelId}>
          {label}
          {renderRequirement(requirement)}
        </Label>
      ) : null}
      {description ? (
        <div className={fileUploadFieldDescriptionStyles()} id={descriptionId}>
          {description}
        </div>
      ) : null}
      <FileUpload
        className={fileUploadClassName}
        droppable={droppable}
        hasError={hasError}
        maxFiles={maxFiles}
      >
        <FileUploadInput
          accept={accept}
          id={inputId}
          multiple={maxFiles > 1}
          name={inputName}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <div aria-live='polite' className='sr-only'>
          {announcerText}
        </div>
        <div aria-live='assertive' className='sr-only'>
          {announcerAssertiveText}
        </div>
        {droppable ? (
          <div>
            <FileUploadDropArea
              isDragOver={isDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {buttonArea}
              {selectionSummaryId ? (
                <p className='mt-2' id={selectionSummaryId}>
                  選択中：{files.length}個、{formatSize(totalSize)}（{totalSize.toLocaleString()}
                  バイト）
                </p>
              ) : null}
              {errors.length > 0 ? (
                <ul className={fileUploadFieldErrorMessagesStyles()} id={errorMessagesId}>
                  {errors.map((error) => (
                    <li key={error}>＊{error}</li>
                  ))}
                </ul>
              ) : null}
              {dropAreaExpandable ? (
                <div className='-mb-4 -ml-1 mt-12'>
                  <Checkbox
                    isSelected={isExpandedDropArea}
                    onChange={handleExpandedDropAreaChange}
                    size='md'
                  >
                    {wholeWindowDropAreaLabel}
                  </Checkbox>
                </div>
              ) : null}
            </FileUploadDropArea>
            {fileList}
          </div>
        ) : (
          <div>
            {buttonArea}
            {selectionSummaryId ? (
              <p className='mt-2' id={selectionSummaryId}>
                選択中：{files.length}個、{formatSize(totalSize)}（{totalSize.toLocaleString()}
                バイト）
              </p>
            ) : null}
            {errors.length > 0 ? (
              <ul className={fileUploadFieldErrorMessagesStyles()} id={errorMessagesId}>
                {errors.map((error) => (
                  <li key={error}>＊{error}</li>
                ))}
              </ul>
            ) : null}
            {fileList}
          </div>
        )}
        {droppable && dropAreaExpandable && showViewportOverlay ? (
          <FileUploadViewportOverlay
            onDragEnter={handleViewportDragEnter}
            onDragLeave={handleViewportDragLeave}
            onDragOver={handleViewportDragOver}
            onDrop={handleViewportDrop}
          >
            <FileUploadViewportOverlayMessage>
              {viewportOverlayMessage}
            </FileUploadViewportOverlayMessage>
          </FileUploadViewportOverlay>
        ) : null}
      </FileUpload>
    </div>
  );
}

export {
  fileUploadFieldButtonAreaStyles,
  fileUploadFieldDescriptionStyles,
  fileUploadFieldErrorMessagesStyles,
  fileUploadFieldStyles,
};
