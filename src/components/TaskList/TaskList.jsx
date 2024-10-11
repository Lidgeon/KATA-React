//список задач
//import PropTypes from 'prop-types'

import Task from '../Task/Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleDone, onEdit, filter, timerUpdate }) => {
  const filterTodos = (f, tds) => {
    if (f === 'All') return tds
    if (f === 'Completed') {
      return tds.filter((el) => el.completed)
    } else {
      return tds.filter((el) => !el.completed)
    }
  }
  const filteredTodos = filterTodos(filter, todos)

  return (
    <ul className="todo-list">
      {filteredTodos?.map((item) => (
        <Task
          key={item.id}
          item={item}
          onDeleted={() => onDeleted(item.id)}
          onEdit={onEdit}
          onToggleDone={() => onToggleDone(item.id)}
          timerUpdate={timerUpdate}
        />
      ))}
    </ul>
  )
}

export default TaskList

// TaskList.propTypes = {
//   todos: PropTypes.any,
//   onToggleDone: PropTypes.func.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDeleted: PropTypes.func.isRequired,
// }
