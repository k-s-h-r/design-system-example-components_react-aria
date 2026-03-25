import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Label, Requirements } from '../FormControl';
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
import { fileUploadDefaultMessages } from './messages';
import type { FileInfo } from './types';
import { formatSize } from './utils';

const meta = {
  title: 'Component/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    hasError: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

type PlaygroundArgs = {
  accept: string;
  dropAreaExpandable: boolean;
  droppable: boolean;
  maxFileSize: string;
  maxFiles: number;
  maxTotalSize: string;
};

function FileUploadPlayground({
  accept,
  dropAreaExpandable,
  droppable,
  initialFiles = [],
  maxFileSize,
  maxFiles,
  maxTotalSize,
}: PlaygroundArgs & { initialFiles?: FileInfo[] }) {
  const customMessages = {
    ...fileUploadDefaultMessages,
    error: {
      ...fileUploadDefaultMessages.error,
      invalidType:
        'PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメントだけが選択できます。',
    },
  };
  const buttonId = useId();
  const errorMessagesId = useId();
  const inputId = useId();
  const labelId = useId();
  const selectedFilesId = useId();
  const supportTextId = useId();
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
    maxFileSizeBytes,
    maxTotalSizeBytes,
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
    messages: customMessages,
  });

  const buttonArea = (
    // biome-ignore lint/a11y/noStaticElementInteractions: Drag-and-drop handling is intentionally attached to the wrapper in single-file mode.
    <div
      className='flex flex-wrap items-center gap-x-4 gap-y-2'
      onDragEnter={droppable ? undefined : handleDragEnter}
      onDragLeave={droppable ? undefined : handleDragLeave}
      onDragOver={droppable ? undefined : handleDragOver}
      onDrop={droppable ? undefined : handleDrop}
    >
      <div ref={selectButtonRef} tabIndex={-1}>
        <Button
          aria-describedby={`${selectedFilesId}-${selectionSummarySuffix} ${errorMessagesId} ${supportTextId}`}
          aria-labelledby={`${labelId} ${buttonId}`}
          className='shrink-0 data-[dragover=true]:bg-blue-300 data-[dragover=true]:text-blue-1200 data-[dragover=true]:underline group-data-[has-error=true]/file-upload:border-error-1'
          data-dragover={!droppable && isDragOver ? 'true' : undefined}
          id={buttonId}
          onPress={handleSelectButtonClick}
          size='md'
          type='button'
          variant='secondary'
        >
          ファイルを選択
        </Button>
      </div>
      {droppable ? (
        <p className='w-0 min-w-[12em] grow'>または、このエリア内にドラッグ＆ドロップ</p>
      ) : null}
    </div>
  );

  const selectionSummary =
    files.length > 0 ? (
      <p className='mt-2' id={`${selectedFilesId}-${selectionSummarySuffix}`}>
        選択中：{files.length}個、{formatSize(totalSize)}（{totalSize.toLocaleString()}バイト）
      </p>
    ) : null;

  const errorMessages =
    errors.length > 0 ? (
      <ul
        className='mt-2 list-none p-0 text-error-1 group-data-[droppable=true]/file-upload:text-error-1'
        id={errorMessagesId}
      >
        {errors.map((error) => (
          <li key={error}>＊{error}</li>
        ))}
      </ul>
    ) : null;

  const fileList =
    files.length === 0 ? (
      <p className='mt-4'>ファイルが選択されていません</p>
    ) : (
      <FileUploadFileList>
        {files.map((file, index) => {
          const hasFileError = (file.errors?.length ?? 0) > 0;

          return (
            <FileUploadFileItem hasError={hasFileError} key={file.id}>
              {file.isExisting ? (
                <input name='file-upload-existing' type='hidden' value={`temp-${file.id}`} />
              ) : null}
              <FileUploadFileMarker />
              <FileUploadFileInfo>
                <p>
                  <FileUploadFileName id={`${file.id}-name`}>{file.name}</FileUploadFileName>
                  <FileUploadFileMeta>
                    <span>{formatSize(file.size)}</span>（<span>{file.size.toLocaleString()}</span>
                    バイト）
                  </FileUploadFileMeta>
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
                解除
              </Button>
            </FileUploadFileItem>
          );
        })}
      </FileUploadFileList>
    );

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={inputId} id={labelId}>
        参照する画像・ドキュメント
        <Requirements variant='optional'>※任意</Requirements>
      </Label>
      <p className='text-std-16N-170 text-solid-gray-600' id={supportTextId}>
        対応ファイル：PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメント
        <br />
        {maxFiles}ファイルまで選択可能。
        {maxFileSizeBytes ? (
          <>
            {' '}
            1ファイルあたり{maxFileSize}（{maxFileSizeBytes.toLocaleString()}バイト）まで
          </>
        ) : null}
        {maxFileSizeBytes && maxTotalSizeBytes ? '、' : ''}
        {maxTotalSizeBytes ? (
          <>
            {' '}
            合計{maxTotalSize}（{maxTotalSizeBytes.toLocaleString()}バイト）まで
          </>
        ) : null}
      </p>
      <FileUpload className='mt-2' droppable={droppable} hasError={hasError} maxFiles={maxFiles}>
        <FileUploadInput
          accept={accept}
          id={inputId}
          multiple={maxFiles > 1}
          name='file-upload'
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
              {selectionSummary}
              {errorMessages}
              {dropAreaExpandable ? (
                <div className='-mb-4 -ml-1 mt-12'>
                  <Checkbox
                    isSelected={isExpandedDropArea}
                    onChange={handleExpandedDropAreaChange}
                    size='md'
                  >
                    ドラッグ＆ドロップの範囲をこのブラウザウィンドウ全体に広げる
                  </Checkbox>
                </div>
              ) : null}
            </FileUploadDropArea>
            {fileList}
          </div>
        ) : (
          <div>
            {buttonArea}
            {selectionSummary}
            {errorMessages}
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
              <span className='inline-block'>このエリア内にファイルを</span>
              <span className='inline-block'>ドラッグ＆ドロップ</span>
            </FileUploadViewportOverlayMessage>
          </FileUploadViewportOverlay>
        ) : null}
      </FileUpload>
    </div>
  );
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    accept: { control: 'text' },
    dropAreaExpandable: { control: 'boolean' },
    droppable: { control: 'boolean' },
    maxFileSize: { control: 'text' },
    maxFiles: { control: { min: 1, type: 'number' } },
    maxTotalSize: { control: 'text' },
  },
  args: {
    accept: '.png,.jpg,.jpeg,.gif,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.pdf',
    dropAreaExpandable: true,
    droppable: true,
    maxFileSize: '5MB',
    maxFiles: 5,
    maxTotalSize: '10MB',
  },
  render: (args) => <FileUploadPlayground {...args} />,
};

export const WithExistingFiles: Story = {
  render: () => (
    <FileUploadPlayground
      accept='.png,.jpg,.jpeg,.gif,.xlsx,.xls,.docx,.doc,.pptx,.ppt,.pdf'
      dropAreaExpandable
      droppable
      initialFiles={[
        {
          errors: [],
          id: 'file-abc123',
          isExisting: true,
          name: '運転免許証_表面.jpg',
          size: 1887436,
        },
        {
          errors: [],
          id: 'file-def456',
          isExisting: true,
          name: '健康保険証.pdf',
          size: 862208,
        },
        {
          errors: [],
          id: 'file-ghi789',
          isExisting: true,
          name: 'マイナンバーカード_両面.pdf',
          size: 2411724,
        },
      ]}
      maxFileSize='5MB'
      maxFiles={5}
      maxTotalSize='10MB'
    />
  ),
};
