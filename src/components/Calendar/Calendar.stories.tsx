import { parseDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { DateValue } from 'react-aria-components';
import { Calendar, CalendarCell, CalendarGrid } from './Calendar';
import { CalendarWithMonthYearNavigation } from './CalendarWithMonthYearNavigation';

const meta = {
  title: 'Component/Calendar',
  component: Calendar,
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    'aria-label': '日付を選択',
    defaultValue: parseDate('2025-02-18'),
  },
  render: (args) => (
    <Calendar {...args}>
      <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
    </Calendar>
  ),
};

export const WithMonthYearNavigation: Story = {
  render: function Render() {
    const [value, setValue] = useState<DateValue | null>(parseDate('2025-02-18'));

    return (
      <>
        <p className='mb-6'>
          選択中の日付：<output>{value?.toString() ?? '未選択'}</output>
        </p>
        <CalendarWithMonthYearNavigation
          aria-label='日付を選択'
          defaultValue={parseDate('2025-02-18')}
          onChange={setValue}
          value={value}
        />
      </>
    );
  },
};
