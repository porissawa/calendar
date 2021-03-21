import { useState } from 'react'

import ReactModal from 'react-modal'

import Button from '../Button'
import * as S from './styles'

const ReminderModal = ({
  handleConfirmClick,
  handleCloseModal,
  isOpen,
  selectedDate,
  selectedReminderId,
}) => {
  const [text, setText] = useState('')
  const [time, setTime] = useState('')
  const [city, setCity] = useState('')
  const [color, setColor] = useState('')

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
    >
      <S.Wrapper>
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
            />
          </S.Label>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Label htmlFor='color'>
            Color:
            <br/>
            <S.Input
              type='text'
              id='color'
              onChange={e => setColor(e.target.value)}
            />
          </S.Label>
        </S.InputWrapper>
        <Button
          onClick={() => {
            console.log(selectedDate, time, text, city, color)
            handleConfirmClick({date: selectedDate, time, text, city, color})
          }}
          label='Save reminder'
        />
      </S.Wrapper>
    </ReactModal>
  )
}

export default ReminderModal

// text
// date
// time
// city
