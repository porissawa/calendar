/* eslint-disable import/no-anonymous-default-export */
import Reminder from ".";

export default {
  title: "Calendar/Reminder",
  component: Reminder,
  // argTypes: {
  //   color: {
  //     control: 'select',
  //     options: 'red | blue | purple | yellow',
  //   }
  // }
};

const Template = (args) => <Reminder {...args} />;

export const Red = Template.bind({});
Red.args = {
  color: "red",
  text: "Sample text",
  city: "Sao Paulo",
  forecast: "Sunny",
  handleClick: () => alert('click')
};

export const Blue = Template.bind({});
Blue.args = {
  color: "blue",
  text: "Sample text",
  city: "Sao Paulo",
  forecast: "Sunny",
  handleClick: () => alert('click')
};

export const Purple = Template.bind({});
Purple.args = {
  color: "purple",
  text: "Sample text",
  city: "Sao Paulo",
  forecast: "Sunny",
  handleClick: () => alert('click')
};

export const Yellow = Template.bind({});
Yellow.args = {
  color: "yellow",
  text: "Sample text",
  city: "Sao Paulo",
  forecast: "Sunny",
  handleClick: () => alert('click')
};
