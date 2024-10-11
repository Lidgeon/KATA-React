//одна задача

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
//import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Task.css'
import Timer from '../../Timer/Timer'

const Task = ({ item, onDeleted, onToggleDone, onEdit, timerUpdate }) => {
  const { label, id, completed, date } = item
  const [editing, setEdit] = useState(false)
  const [labelInput, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (labelInput.trim()) {
      onEdit(id, labelInput)
      setLabel('')
      setEdit(false)
    }
  }

  const closeForm = (e) => {
    if (e.keyCode == '27') {
      setEdit(false)
    }
  }

  const setEditingButton = () => {
    setEdit(true), setLabel(label)
  }

  const taskStatus = classNames('task', {
    editing: editing,
    completed,
  })

  return (
    <li className={taskStatus}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={() => {
            onToggleDone(item)
          }}
        />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          {
            <span className="description">
              <Timer item={item} timerUpdate={timerUpdate} />
            </span>
          }
          <span className="created">{`created ${formatDistanceToNow(date, {
            includeSeconds: true,
            locale: KG,
            addSuffix: true,
          })}`}</span>
        </label>
        <button className="icon icon-edit" onClick={setEditingButton}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>

      {editing && (
        <form onSubmit={onSubmit} onKeyDown={closeForm}>
          <input onChange={onLabelChange} type="text" className="edit" value={labelInput} />
        </form>
      )}
    </li>
  )
}

export default Task

// Task.propTypes = {
//   item: PropTypes.shape({
//     id: PropTypes.number,
//     label: PropTypes.string,
//     completed: PropTypes.bool,
//     //
//   }),
//   onDeleted: PropTypes.func.isRequired,
//   onToggleDone: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
// }
