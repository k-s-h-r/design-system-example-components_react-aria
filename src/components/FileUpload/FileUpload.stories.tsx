import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { formatSize } from './utils';
import { fileUploadDefaultMessages } from './messages';
import {
  FileUpload,
  FileUploadDropArea,
  FileUploadFileInfo,
  FileUploadFileItem,
  FileUploadFileList,
  FileUploadFileMarker,
  FileUploadFileMeta,
  FileUploadFileName,
  FileUploadTrigger,
  FileUploadViewportOverlay,
  FileUploadViewportOverlayMessage,
  useFileUpload,
} from './FileUpload';

const meta = {
  title: 'Component/ファイルアップロード',
  component: FileUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

type ExampleProps = {
  accept?: string;
  dropAreaExpandable?: boolean;
  droppable?: boolean;
  maxFileSize?: string;
  maxFiles?: number;
  maxTotalSize?: string;
};

function UploadExample(props: ExampleProps) {
  const {
    accept = '.pdf,.png,.jpg,.jpeg',
    dropAreaExpandable = false,
    droppable = false,
    maxFileSize,
    maxFiles = 1,
    maxTotalSize,
  } = props;
  const { errors, files, handleDrop, handleSelect, hasError, removeFile, showViewportOverlay } = useFileUpload({
    accept,
    dropAreaExpandable,
    droppable,
    maxFileSize,
    maxFiles,
    maxTotalSize,
    messages: fileUploadDefaultMessages,
  });

  return (
    <FileUpload className='max-w-[48rem]' droppable={droppable} hasError={hasError} maxFiles={maxFiles}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <p className='text-std-16B-100 text-solid-gray-900'>添付ファイル</p>
          <p className='text-dns-14N-160 text-solid-gray-700'>
            {maxFiles > 1 ? `${maxFiles}件まで` : '1件まで'}選択できます。対応形式: {accept}
            {maxFileSize ? ` / 1件あたり${maxFileSize}まで` : ''}
            {maxTotalSize ? ` / 合計${maxTotalSize}まで` : ''}
          </p>
        </div>
        <FileUploadDropArea aria-label='ファイルアップロード' onDrop={droppable ? handleDrop : undefined}>
          <div className='space-y-4'>
            <p>ここにファイルをドラッグ&ドロップするか、ボタンから選択してください。</p>
            <FileUploadTrigger
              acceptedFileTypes={accept.split(',').map((value) => value.trim())}
              allowsMultiple={maxFiles > 1}
              onSelect={handleSelect}
            >
              <Button size='md' variant='secondary'>ファイルを選択</Button>
            </FileUploadTrigger>
          </div>
        </FileUploadDropArea>
        {errors.length > 0 ? (
          <div className='space-y-1 text-dns-14N-160 text-error-1' role='alert'>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        {files.length > 0 ? (
          <FileUploadFileList>
            {files.map((file) => (
              <FileUploadFileItem hasError={(file.errors?.length ?? 0) > 0} key={file.id}>
                <FileUploadFileMarker />
                <FileUploadFileInfo>
                  <div className='flex flex-wrap items-baseline gap-x-2 gap-y-1'>
                    <FileUploadFileName>{file.name}</FileUploadFileName>
                    <FileUploadFileMeta>{formatSize(file.size)}</FileUploadFileMeta>
                  </div>
                  {file.errors?.length ? (
                    <div className='mt-1 space-y-1 text-dns-14N-160'>
                      {file.errors.map((error) => (
                        <p key={error}>{error}</p>
                      ))}
                    </div>
                  ) : null}
                </FileUploadFileInfo>
                <Button onPress={() => removeFile(file.id)} size='xs' variant='tertiary'>
                  削除
                </Button>
              </FileUploadFileItem>
            ))}
          </FileUploadFileList>
        ) : null}
      </div>
      {showViewportOverlay ? (
        <FileUploadViewportOverlay>
          <FileUploadViewportOverlayMessage>
            ファイルをドロップしてアップロード
          </FileUploadViewportOverlayMessage>
        </FileUploadViewportOverlay>
      ) : null}
    </FileUpload>
  );
}

export const Basic: Story = {
  render: () => <UploadExample />,
};

export const MultipleWithDropArea: Story = {
  render: () => <UploadExample droppable maxFileSize='5MB' maxFiles={5} maxTotalSize='10MB' />,
};

export const ExpandableDropArea: Story = {
  render: () => <UploadExample droppable dropAreaExpandable maxFileSize='5MB' maxFiles={3} />,
};
