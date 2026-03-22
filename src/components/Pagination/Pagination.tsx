import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from '../utils';
import { PaginationItem } from './PaginationItem';

export const paginationStyles = tv({
  base: '',
});

type PaginationStyles = VariantProps<typeof paginationStyles> & ComponentProps<'div'>;

export interface PaginationProps extends PaginationStyles {
  value: number;
  total: number;
  siblings?: number;
  withEdge?: boolean;
  withControl?: boolean;
  isSimple?: boolean;

  // biome-ignore lint/suspicious/noExplicitAny: The getItemProps function is expected to return an object with any props that should be applied to the pagination item, such as onClick handlers or aria attributes. The exact shape of this object can vary depending on the implementation, so using Record<string, any> allows for flexibility in the props that can be returned.
  getItemProps?(page: number, control?: 'first' | 'prev' | 'last' | 'next'): Record<string, any>;
}

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    value,
    total,
    siblings = 3,
    isSimple = false,
    withEdge = true,
    withControl = true,
    getItemProps,
    ...rest
  } = props;

  const prevPage = value - 1 <= 0 ? null : value - 1;
  const nextPage = value + 1 > total ? null : value + 1;
  const firstPage = 1;
  const lastPage = total;

  const prevItems = [...Array(siblings)].map((_, i) => {
    const page = value - siblings + i;
    return page > 0 ? (
      <PaginationItem {...getItemProps?.(page)} key={`prev-${page}`}>
        {page}
      </PaginationItem>
    ) : (
      <div className='h-12 w-12' key={`prev-empty-${page}`}></div>
    );
  });

  const nextItems = [...Array(siblings)].map((_, i) => {
    const page = value + i + 1;
    return page <= total ? (
      <PaginationItem {...getItemProps?.(page)} key={`next-${page}`}>
        {page}
      </PaginationItem>
    ) : (
      <div className='h-12 w-12' key={`next-empty-${page}`}></div>
    );
  });

  const isPrev = !!prevPage;
  const isNext = !!nextPage;
  const isDots = !isSimple && (withControl || withEdge);
  const isPrevDots = value - siblings > 1;
  const isNextDots = value + siblings < total;

  return (
    <div className={paginationStyles({ className })} {...rest}>
      <div className='flex items-center justify-center gap-x-6 md:gap-x-4'>
        {withEdge &&
          (isPrev ? (
            <PaginationItem {...getItemProps?.(firstPage, 'first')}>
              <svg aria-label='最初へ' className='h-6 w-6' role='img' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M18.33 19L19 18.33L12.67 12L19 5.67L18.33 5L11.33 12L18.33 19Z'
                  fill='currentColor'
                />
                <rect
                  width='1'
                  height='14'
                  transform='matrix(1 8.74228e-08 8.74228e-08 -1 6 19)'
                  fill='currentColor'
                />
              </svg>
            </PaginationItem>
          ) : (
            <div className='h-12 w-12'></div>
          ))}

        {withControl &&
          (isPrev ? (
            <PaginationItem {...getItemProps?.(prevPage, 'prev')}>
              <svg aria-label='前へ' className='h-6 w-6' role='img' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M15.33 19L16 18.33L9.67 12L16 5.67L15.33 5L8.33 12L15.33 19Z'
                  fill='currentColor'
                />
              </svg>
            </PaginationItem>
          ) : (
            <div className='h-12 w-12'></div>
          ))}

        <div className='hidden items-center gap-x-6 md:flex md:gap-x-4'>
          {isDots && (
            <div className='h-full w-[14px]'>
              {isPrevDots && (
                <svg aria-hidden={true} width='14' height='2' viewBox='0 0 14 2' fill='none'>
                  <circle cx='1' cy='1' r='1' fill='currentColor' />
                  <circle cx='7' cy='1' r='1' fill='currentColor' />
                  <circle cx='13' cy='1' r='1' fill='currentColor' />
                </svg>
              )}
            </div>
          )}
          {!isSimple && prevItems}
        </div>

        <div>
          {value} / {total}
        </div>

        <div className='hidden items-center gap-x-6 md:flex md:gap-x-4'>
          {!isSimple && nextItems}

          {isDots && (
            <div className='h-full w-[14px]'>
              {isNextDots && (
                <svg aria-hidden={true} width='14' height='2' viewBox='0 0 14 2' fill='none'>
                  <circle cx='1' cy='1' r='1' fill='currentColor' />
                  <circle cx='7' cy='1' r='1' fill='currentColor' />
                  <circle cx='13' cy='1' r='1' fill='currentColor' />
                </svg>
              )}
            </div>
          )}
        </div>

        {withControl &&
          (isNext ? (
            <PaginationItem {...getItemProps?.(nextPage, 'next')}>
              <svg aria-label='次へ' className='h-6 w-6' role='img' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M8.67 19L8 18.33L14.33 12L8 5.67L8.67 5L15.67 12L8.67 19Z'
                  fill='currentColor'
                />
              </svg>
            </PaginationItem>
          ) : (
            <div className='h-12 w-12'></div>
          ))}

        {withEdge &&
          (isNext ? (
            <PaginationItem {...getItemProps?.(lastPage, 'last')}>
              <svg aria-label='最後へ' className='h-6 w-6' role='img' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M5.67 19L5 18.33L11.33 12L5 5.67L5.67 5L12.67 12L5.67 19Z'
                  fill='currentColor'
                />
                <rect
                  x='18'
                  y='19'
                  width='1'
                  height='14'
                  transform='rotate(180 18 19)'
                  fill='currentColor'
                />
              </svg>
            </PaginationItem>
          ) : (
            <div className='h-12 w-12'></div>
          ))}
      </div>
    </div>
  );
};
