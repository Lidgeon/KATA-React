//список задач
import { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onEdit, timerUpdate, filter } = this.props
    return (
      <ul className="todo-list">
        {todos.map((item) => (
          <Task
            key={item.id}
            item={item}
            onDeleted={() => onDeleted(item.id)}
            onEdit={onEdit}
            onToggleDone={() => onToggleDone(item.id)}
            timerUpdate={timerUpdate}
            filter={filter}
          />
        ))}
      </ul>
    )
  }
}

TaskList.defaultProps = {
  todos: {},
}

TaskList.propTypes = {
  todos: PropTypes.any,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
}
