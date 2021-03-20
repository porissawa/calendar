/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Day from '.';

export default {
  title: 'Calendar/Day',
  component: Day,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Day {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};