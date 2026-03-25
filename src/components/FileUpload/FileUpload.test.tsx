import { act, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useFileUpload } from './FileUpload';
import { FileUploadField } from './FileUploadField';

function createFile(name: string, size: number, type: string) {
  return new File([new Uint8Array(size)], name, { type });
}

describe('useFileUpload', () => {
  it('replaces existing files in single-file mode', () => {
    const { result } = renderHook(() =>
      useFileUpload({
        initialFiles: [
          {
            id: 'existing-file',
            isExisting: true,
            name: 'existing.pdf',
            size: 512,
          },
        ],
        maxFiles: 1,
      }),
    );

    act(() => {
      result.current.addFiles([createFile('updated.png', 128, 'image/png')]);
    });

    expect(result.current.files).toHaveLength(1);
    expect(result.current.files[0]).toMatchObject({
      isExisting: false,
      name: 'updated.png',
      size: 128,
    });
  });

  it('tracks file-level and aggregate validation errors', () => {
    const { result } = renderHook(() =>
      useFileUpload({
        accept: '.png',
        maxFileSize: '1KB',
        maxFiles: 2,
        maxTotalSize: '2KB',
      }),
    );

    act(() => {
      result.current.addFiles([
        createFile('document.pdf', 512, 'application/pdf'),
        createFile('photo.png', 1537, 'image/png'),
      ]);
    });

    expect(result.current.maxFileSizeBytes).toBe(1024);
    expect(result.current.maxTotalSizeBytes).toBe(2048);
    expect(result.current.totalSize).toBe(2049);
    expect(result.current.selectionSummarySuffix).toBe('2-2049');
    expect(result.current.hasError).toBe(true);
    expect(result.current.errors).toEqual([
      '選択したファイルにエラーがあります。該当ファイルをチェックしてください。',
      '選択できるファイルサイズの合計が上限を超過しています。',
    ]);
    expect(result.current.files[0]?.errors).toEqual(['許可されていないファイル形式です。']);
    expect(result.current.files[1]?.errors).toEqual(['ファイルサイズが上限を超過しています。']);
  });

  it('keeps only one expanded drop area active', () => {
    const first = renderHook(() =>
      useFileUpload({
        dropAreaExpandable: true,
        droppable: true,
      }),
    );
    const second = renderHook(() =>
      useFileUpload({
        dropAreaExpandable: true,
        droppable: true,
      }),
    );

    act(() => {
      first.result.current.handleExpandedDropAreaChange(true);
    });

    expect(first.result.current.isExpandedDropArea).toBe(true);
    expect(second.result.current.isExpandedDropArea).toBe(false);

    act(() => {
      second.result.current.handleExpandedDropAreaChange(true);
    });

    expect(first.result.current.isExpandedDropArea).toBe(false);
    expect(second.result.current.isExpandedDropArea).toBe(true);
  });

  it('renders a high-level field with existing files', () => {
    render(
      <FileUploadField
        description='補足テキスト'
        existingInputName='existing-files'
        initialFiles={[
          {
            id: 'existing-file',
            isExisting: true,
            name: 'existing.pdf',
            size: 2048,
          },
        ]}
        label='添付ファイル'
        maxFiles={3}
      />,
    );

    expect(screen.getByText('添付ファイル')).toBeTruthy();
    expect(screen.getByText('existing.pdf')).toBeTruthy();
    expect(screen.getByDisplayValue('temp-existing-file').getAttribute('name')).toBe(
      'existing-files',
    );
  });
});
