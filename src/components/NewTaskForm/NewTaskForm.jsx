//форма для добавления

import { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

const NewTaskForm = ({ onAdded }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }
  const onMinChange = (e) => {
    setMin(e.target.value)
  }
  const onSecChange = (e) => {
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const input = [label, min, sec]
    if (label.trim()) {
      onAdded(...input)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        value={label}
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        onChange={onMinChange}
        value={min}
        type="number"
        required
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        onChange={onSecChange}
        value={sec}
        type="number"
        required
      />
      <button type="submit"></button>
    </form>
  )
}

export default NewTaskForm

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onAdded: PropTypes.func.isRequired,
}
