import { describe, expect, it } from 'vitest';
import { tv, twMerge } from './utils';

describe('components utils merge config', () => {
  it('keeps text color and custom typography class in tv output', () => {
    const buttonVariants = tv({
      variants: {
        variant: {
          primary: 'text-white',
        },
        size: {
          md: 'text-oln-16B-100',
        },
      },
    });

    expect(buttonVariants({ variant: 'primary', size: 'md' })).toBe('text-white text-oln-16B-100');
  });

  it('keeps text color and custom typography class in twMerge output', () => {
    expect(twMerge('text-white text-oln-16B-100')).toBe('text-white text-oln-16B-100');
  });

  it('merges current digital-go-jp typography tokens', () => {
    expect(twMerge('text-sm text-std-16N-170')).toBe('text-std-16N-170');
  });

  it('keeps legacy typography tokens mergeable while the repo is migrating', () => {
    expect(twMerge('text-sm text-std-16N-7')).toBe('text-std-16N-7');
  });

  it('merges digital-go-jp radius and shadow tokens', () => {
    expect(twMerge('rounded-sm rounded-12 shadow-sm shadow-8')).toBe('rounded-12 shadow-8');
  });

  it('merges digital-go-jp list style tokens', () => {
    expect(twMerge('list-disc list-lower-latin')).toBe('list-lower-latin');
  });

  it('keeps color merging without enumerating plugin colors explicitly', () => {
    expect(twMerge('text-white text-blue-1000')).toBe('text-blue-1000');
  });
});
