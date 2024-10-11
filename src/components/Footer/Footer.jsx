//футер с информацией и кнопками

import './Footer.css'

import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

const Footer = ({ toDo, onDeleteAll, changeFilter, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} changeFilter={changeFilter} />
      <button className="clear-completed" onClick={onDeleteAll}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  toDo: PropTypes.number,
  onDeleteAll: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}
