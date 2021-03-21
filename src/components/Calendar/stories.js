/* eslint-disable import/no-anonymous-default-export */
import Calendar from '.';

export default {
  title: 'Calendar/Calendar',
  component: Calendar,
};

const Template = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};