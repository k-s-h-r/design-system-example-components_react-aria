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
});
