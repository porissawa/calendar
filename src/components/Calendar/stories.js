import React from 'react';

import Calendar from '.';

export default {
  title: 'Calendar/Calendar',
  component: Calendar,
  argTypes: {
    backgroundColor: { control: 'input' },
  },
};

const Template = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};