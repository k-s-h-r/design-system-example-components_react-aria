import type { Meta, StoryObj } from '@storybook/react-vite';
import { Requirements } from '../FormControl';
import {
  FileUploadArea,
  FileUploadButtonGroup,
  FileUploadDescription,
  FileUploadDropHint,
  FileUploadErrorMessages,
  FileUploadExpandDropAreaToggle,
  FileUploadItems,
  FileUploadLabel,
  FileUploadOverlay,
  FileUploadRoot,
  FileUploadSelectionSummary,
  FileUploadTriggerButton,
} from './FileUploadRoot';
import { fileUploadDefaultMessages } from './messages';
import type { FileInfo } from './types';

const meta = {
  title: 'Component/FileUpload',
  component: FileUploadRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUploadRoot>;

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

function createDescription(maxFiles: number, maxFileSize: string, maxTotalSize: string) {
  return (
    <>
      対応ファイル：PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメント
      <br />
      {maxFiles}ファイルまで選択可能。 1ファイルあたり{maxFileSize}まで、合計
      {maxTotalSize}まで
    </>
  );
}

function FileUploadExample(props: PlaygroundArgs & { initialFiles?: FileInfo[] }) {
  const { initialFiles = [], maxFileSize, maxFiles, maxTotalSize, ...rest } = props;

  return (
    <FileUploadRoot
      {...rest}
      className='max-w-[48rem] mt-2'
      initialFiles={initialFiles}
      inputName='file-upload'
      maxFileSize={maxFileSize}
      maxFiles={maxFiles}
      maxTotalSize={maxTotalSize}
      messages={{
        ...fileUploadDefaultMessages,
        error: {
          ...fileUploadDefaultMessages.error,
          invalidType:
            'PNG/JPEG/GIF形式の画像、Excel/Word/PowerPoint/PDF形式のドキュメントだけが選択できます。',
        },
      }}
    >
      <FileUploadLabel>
        参照する画像・ドキュメント
        <Requirements variant='optional'>※任意</Requirements>
      </FileUploadLabel>
      <FileUploadDescription>
        {createDescription(maxFiles, maxFileSize, maxTotalSize)}
      </FileUploadDescription>
      <FileUploadArea>
        <FileUploadButtonGroup>
          <FileUploadTriggerButton size='md'>ファイルを選択</FileUploadTriggerButton>
          <FileUploadDropHint>または、このエリア内にドラッグ＆ドロップ</FileUploadDropHint>
        </FileUploadButtonGroup>
        <FileUploadSelectionSummary className='mt-2' />
        <FileUploadErrorMessages />
        <div className='-mb-4 -ml-1 mt-12'>
          <FileUploadExpandDropAreaToggle size='md'>
            ドラッグ＆ドロップの範囲をこのブラウザウィンドウ全体に広げる
          </FileUploadExpandDropAreaToggle>
        </div>
      </FileUploadArea>
      <FileUploadItems existingInputName='file-upload-existing' />
      <FileUploadOverlay />
    </FileUploadRoot>
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
  render: (args) => <FileUploadExample {...args} />,
};

export const WithExistingFiles: Story = {
  render: () => (
    <FileUploadExample
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
