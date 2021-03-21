import { useState } from 'react'

import ReactModal from 'react-modal'

import Button from '../Button'
import * as S from './styles'

const ReminderModal = ({
  handleConfirmClick,
  handleCloseModal,
  handleDeleteReminderClick,
  isOpen,
  selectedDate,
  selectedReminder = {id: '', text: '', time: '', city: '', color: ''},
}) => {
  const {
    id: reminderId,
    text: reminderText,
    time: reminderTime,
    city: reminderCity,
    color: reminderColor,
  } = selectedReminder

  const [text, setText] = useState(reminderText)
  const [time, setTime] = useState(reminderTime)
  const [city, setCity] = useState(reminderCity)
  const [color, setColor] = useState(reminderColor)

  // since this modal is having its portal conditionally rendered on the page level
  // there's no need to use useEffect to set and cleanup its initial state

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
    >
      <S.Wrapper>
        <S.CancelButtonContainer>
            <Button
              onClick={() => handleCloseModal()}
              label='x'
              secondary
            />
        </S.CancelButtonContainer>
        <S.FormWrapper>
          <S.InputWrapper>
            <S.Label htmlFor='text'>
              Reminder:
              <br/>
              <S.Input
                type='text'
                id='text'
                minLength='1'
                maxLength='30'
                onChange={e => setText(e.target.value)}
                value={text}
              />
            </S.Label>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor='time'>
              Time:
              <br/>
              <S.Input
                type='time'
                id='time'
                onChange={e => setTime(e.target.value)}
                value={time}
              />
            </S.Label>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor='city'>
              City:
              <br/>
              <S.Input
                type='text'
                id='city'
                onChange={e => setCity(e.target.value)}
                value={city}
              />
            </S.Label>
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor='color'>
              Color:
              <br/>
              <S.Select
                name='color-select'
                id='color'
                onChange={e => setColor(e.target.value)}
                value={color}
              >
                <S.Option value='' color=''> - Select a tag color - </S.Option>
                <S.Option value='red' color='red'>Red</S.Option>
                <S.Option value='blue' color='blue'>Blue</S.Option>
                <S.Option value='purple' color='purple'>Purple</S.Option>
                <S.Option value='yellow' color='yellow'>Yellow</S.Option>
              </S.Select>
            </S.Label>
          </S.InputWrapper>
        </S.FormWrapper>
        <S.ModalButtonsContainer>
            <Button
              onClick={() => {
                handleDeleteReminderClick({id: reminderId, date: selectedDate})
              }}
              label='Delete reminder'
              backgroundColor='red'
            />
            <S.SpacerSmall />
            <Button
              onClick={() => {
                handleConfirmClick({id: reminderId, date: selectedDate, time, text, city, color})
              }}
              label='Save reminder'
              primary
            />
        </S.ModalButtonsContainer>
      </S.Wrapper>
    </ReactModal>
  )
}

export default ReminderModal
