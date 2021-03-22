import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { ThemeProvider } from 'styled-components'
import Modal from 'react-modal'

import GlobalStyles from '../../styles/global'
import theme from '../../styles/theme'
import rootReducer from '../../store/reducers'
import CalendarView from '.'

const Wrapper = ({ children }) => (
  <Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware))}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {Modal.setAppElement(document.getElementsByTagName('body')[0])}
      {children}
    </ThemeProvider>
  </Provider>
)

test('renders calendar', () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const twentiethDay = screen.getByText('20')
  expect(twentiethDay).toBeInTheDocument()
})

test('renders more than a month', () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const firstDays = screen.getAllByText('1')
  expect(firstDays).toHaveLength(2)
})

test('renders the current month by default', () => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonthIndex = new Date().getMonth()
  render (<CalendarView />, { wrapper: Wrapper })
  const currentMonth = screen.getByText(MONTHS[currentMonthIndex])
  expect(currentMonth).toBeInTheDocument()
})

test('changes month to next', async () => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonthIndex = new Date().getMonth()
  render (<CalendarView />, { wrapper: Wrapper })
  const nextMonthBtn = screen.getByText('>')
  fireEvent(nextMonthBtn, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText(MONTHS[currentMonthIndex + 1]))
  expect(screen.getByText(MONTHS[currentMonthIndex + 1])).toBeInTheDocument()
})

test('changes month to previous', async () => {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const currentMonthIndex = new Date().getMonth()
  render (<CalendarView />, { wrapper: Wrapper })
  const nextMonthBtn = screen.getByText('<')
  fireEvent(nextMonthBtn, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText(MONTHS[currentMonthIndex - 1]))
  expect(screen.getByText(MONTHS[currentMonthIndex - 1])).toBeInTheDocument()
})

test('renders modal on day click', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByLabelText('Reminder:'))
  const reminderLabel = screen.getByLabelText('Reminder:')
  expect(reminderLabel).toBeInTheDocument()
})

test('modal is rendered with Submit button disabled', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const submitBtn = screen.getByText('Save reminder')
  expect(submitBtn).toHaveStyle(`background-color: ${theme.colors.gray}`)
})

test('adding a character to Reminder text enables Submit button', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'a' } })
  const submitBtn = screen.getByText('Save reminder')
  expect(submitBtn).toHaveStyle(`background-color: ${theme.colors.primary}`)
})

test('reminder input blocks strings over 30 characters', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  expect(reminderInput).toHaveAttribute('maxLength', '30')
})

test('submitting reminder modal with reminder text creates new reminder in calendar', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })
  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)
  const newReminder = screen.getByText('write tests')
  expect(newReminder).toBeInTheDocument()
})

test('reminder keeps city data', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })

  const cityInput = screen.getByPlaceholderText('Where will it happen?')
  fireEvent.change(cityInput, { target: { value: 'Bogotá' } })

  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)

  const newReminder = screen.getByText('write tests')
  fireEvent(newReminder, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Delete reminder'))

  const newReminderInput = screen.getByDisplayValue('write tests')
  const newCityInput = screen.getByDisplayValue('Bogotá')

  expect(newReminderInput).toBeInTheDocument()
  expect(newCityInput).toBeInTheDocument()
})

test('reminder keeps time data', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })

  const cityInput = screen.getByPlaceholderText('Where will it happen?')
  fireEvent.change(cityInput, { target: { value: 'Bogotá' } })

  const timeInput = screen.getByLabelText('Time:')
  fireEvent.change(timeInput, { target: { value: '22:02' } })
  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)

  const newReminder = screen.getByText('write tests')
  fireEvent(newReminder, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Delete reminder'))

  const newReminderInput = screen.getByDisplayValue('write tests')
  const newCityInput = screen.getByDisplayValue('Bogotá')
  const newTimeInput = screen.getByDisplayValue('22:02')

  expect(newReminderInput).toBeInTheDocument()
  expect(newCityInput).toBeInTheDocument()
  expect(newTimeInput).toBeInTheDocument()
})

test('shows delete reminder button when editing reminders', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })
  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)
  const newReminder = screen.getByText('write tests')

  fireEvent(newReminder, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Delete reminder'))
  const deleteBtn = screen.getByText('Delete reminder')

  expect(deleteBtn).toBeInTheDocument()
})

test('correctly edits reminders', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })
  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)
  const newReminder = screen.getByText('write tests')

  fireEvent(newReminder, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const newReminderInput = screen.getByDisplayValue('write tests')
  fireEvent.change(newReminderInput, { target: { value: 'write MOAR tests' } })
  const secondSubmitBtn = screen.getByText('Save reminder')
  fireEvent.click(secondSubmitBtn)
  const updatedReminder = screen.getByText('write MOAR tests')

  expect(updatedReminder).toBeInTheDocument()
})

test('correctly removes single reminder', async () => {
  render (<CalendarView />, { wrapper: Wrapper })
  const todayCell = screen.getByTestId('today-cell')
  fireEvent(todayCell, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Save reminder'))
  const reminderInput = screen.getByPlaceholderText('Remind me of...')
  fireEvent.change(reminderInput, { target: { value: 'write tests' } })
  const submitBtn = screen.getByText('Save reminder')
  fireEvent.click(submitBtn)
  const newReminder = screen.getByText('write tests')
  expect(screen.getAllByText('write tests')).toHaveLength(1)

  fireEvent(newReminder, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
  await waitFor(() => screen.getByText('Delete reminder'))
  const deleteBtn = screen.getByText('Delete reminder')
  fireEvent(deleteBtn, new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))

  expect(screen.queryAllByText('write tests')).toHaveLength(0)
})
