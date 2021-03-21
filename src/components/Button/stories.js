/* eslint-disable import/no-anonymous-default-export */
import Button from '.';

export default {
  title: 'Tokens/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  secondary: false,
  primary: true,
  size: 'medium',
  label: 'Click',
};