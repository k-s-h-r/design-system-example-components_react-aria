import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './';

const meta: Meta<typeof Pagination> = {
  title: 'Component/DADS v1/Pagination',
  component: Pagination,
  args: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Default: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    siblings: 3,
    isSimple: false,
    withControl: true,
    withEdge: true,
  },
};

export const Pagination2: StoryObj<typeof Pagination> = {
  args: {
    value: 1,
    total: 10,
  },
};
export const Pagination3: StoryObj<typeof Pagination> = {
  args: {
    value: 10,
    total: 10,
  },
};

export const Siblings: StoryObj<typeof Pagination> = {
  args: {
    siblings: 1,
    value: 5,
    total: 10,
  },
};

export const NoControl: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    withControl: false,
  },
};

export const NoEdge: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    withEdge: false,
  },
};

export const Simple: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    isSimple: true,
  },
};

export const PaginationOnClick: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    getItemProps: (page, control) => {
      if (control === 'first') {
        return { onClick: () => console.log('first') };
      }

      if (control === 'last') {
        return { onClick: () => console.log('last') };
      }

      if (control === 'next') {
        return { onClick: () => console.log(page) };
      }

      if (control === 'prev') {
        return { onClick: () => console.log(page) };
      }

      return { onClick: () => console.log(page) };
    },
  },
};
export const PaginationLink: StoryObj<typeof Pagination> = {
  args: {
    value: 5,
    total: 10,
    getItemProps: (page, control) => {
      if (control === 'first') {
        return { href: '#page-1' };
      }

      if (control === 'last') {
        return { href: '#page-10' };
      }

      if (control === 'next' || control === 'prev') {
        return { href: `#page-${page}` };
      }

      return { href: `#page-${page}` };
    },
  },
};
