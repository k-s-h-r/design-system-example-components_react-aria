import { describe, expect, it } from 'vitest';
import { cx } from './';

describe('Test: twMerge', () => {
  it('text-size 1', () => {
    const className = cx('text-sm', 'text-std-16N-7');
    expect(className).toBe('text-std-16N-7');
  });
  it('text-size 2', () => {
    const className = cx('text-std-16N-7', 'text-sm');
    expect(className).toBe('text-sm');
  });
  it('text-size 3', () => {
    const className = cx('text-dns-17B-3', 'text-std-16N-7');
    expect(className).toBe('text-std-16N-7');
  });
  it('color 1', () => {
    const className = cx('text-white text-cyan-100');
    expect(className).toBe('text-cyan-100');
  });
  it('color 2', () => {
    const className = cx('bg-white text-cyan-100');
    expect(className).toBe('bg-white text-cyan-100');
  });
  it('font-weight 1', () => {
    const className = cx('font-bold font-500');
    expect(className).toBe('font-500');
  });
  it('font-weight 2', () => {
    const className = cx('font-400 font-700');
    expect(className).toBe('font-700');
  });
  it('line-height 1', () => {
    const className = cx('leading-1-0 leading-tight');
    expect(className).toBe('leading-tight');
  });
  it('line-height 2', () => {
    const className = cx('leading-3 leading-1-0');
    expect(className).toBe('leading-1-0');
  });
  it('border-radius 1', () => {
    const className = cx('rounded-sm rounded-8');
    expect(className).toBe('rounded-8');
  });
  it('border-radius 2', () => {
    const className = cx('rounded-8 rounded-none');
    expect(className).toBe('rounded-none');
  });
  it('box-shadow 1', () => {
    const className = cx('shadow-sm shadow-8');
    expect(className).toBe('shadow-8');
  });
  it('box-shadow 2', () => {
    const className = cx('shadow-8 shadow-none');
    expect(className).toBe('shadow-none');
  });
  it('aspect-ratio 1', () => {
    const className = cx('aspect-square aspect-1/1');
    expect(className).toBe('aspect-1/1');
  });
  it('aspect-ratio 2', () => {
    const className = cx('aspect-1/1 aspect-auto');
    expect(className).toBe('aspect-auto');
  });
  it('list-style-type 1', () => {
    const className = cx('list-disc list-lower-latin');
    expect(className).toBe('list-lower-latin');
  });
  it('list-style-type 2', () => {
    const className = cx('list-lower-latin list-disc');
    expect(className).toBe('list-disc');
  });
  it('list-style-type 3', () => {
    const className = cx('list-disc list-lower-latin list-outside');
    expect(className).toBe('list-lower-latin list-outside');
  });
  it('list-style-type 4', () => {
    const className = cx('list-disc list-outside list-lower-latin');
    expect(className).toBe('list-outside list-lower-latin');
  });
});
