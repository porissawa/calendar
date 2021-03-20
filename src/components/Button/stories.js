/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Button from '.';

export default {
  title: 'Tokens/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  secondary: true,
  backgroundColor: 'primary',
  size: 'medium',
  label: 'Click',
};