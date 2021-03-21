/* eslint-disable import/no-anonymous-default-export */
import Reminder from ".";

export default {
  title: "Calendar/Reminder",
  component: Reminder,
};

const Template = (args) => <Reminder {...args} />;

export const Red = Template.bind({});
Red.args = {
  data: {
    color: "red",
    text: "Sample text",
    city: "Sao Paulo",
    forecast: "Sunny",
  },
  handleClick: () => alert('click')
};

export const Blue = Template.bind({});
Blue.args = {
  data: {
    color: "blue",
    text: "Sample text",
    city: "Sao Paulo",
    forecast: "Sunny",
  },
  handleClick: () => alert('click')
};

export const Purple = Template.bind({});
Purple.args = {
  data: {
    color: "purple",
    text: "Sample text",
    city: "Sao Paulo",
    forecast: "Sunny",
  },
  handleClick: () => alert('click')
};

export const Yellow = Template.bind({});
Yellow.args = {
  data: {
    color: "yellow",
    text: "Sample text",
    city: "Sao Paulo",
    forecast: "Sunny",
  },
  handleClick: () => alert('click')
};
