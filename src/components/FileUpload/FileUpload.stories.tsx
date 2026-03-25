import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUploadField } from './FileUploadField';
import { fileUploadDefaultMessages } from './messages';
import type { FileInfo } from './types';

const meta = {
  title: 'Component/FileUpload',
  component: FileUploadField,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUploadField>;

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

function FileUploadStory(props: PlaygroundArgs & { initialFiles?: FileInfo[] }) {
  const { initialFiles = [], maxFileSize, maxFiles, maxTotalSize, ...rest } = props;

  return (
    <FileUploadField
      {...rest}
      buttonLabel='ファイルを選択'
      className='max-w-[48rem]'
      description={createDescription(maxFiles, maxFileSize, maxTotalSize)}
      dragAndDropText='または、このエリア内にドラッグ＆ドロップ'
      dropAreaExpandable={rest.dropAreaExpandable}
      droppable={rest.droppable}
      existingInputName='file-upload-existing'
      fileUploadClassName='mt-2'
      getExistingInputValue={(file) => `temp-${file.id}`}
      initialFiles={initialFiles}
      inputName='file-upload'
      label='参照する画像・ドキュメント'
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
      requirement={{
        children: '※任意',
        variant: 'optional',
      }}
    />
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
  render: (args) => <FileUploadStory {...args} />,
};

export const WithExistingFiles: Story = {
  render: () => (
    <FileUploadStory
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
