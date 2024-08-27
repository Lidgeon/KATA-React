//футер с информацией и кнопками

import './Footer.css'

import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'

export default class Footer extends Component {
  render() {
    const { toDo, onDeleteAll, changeFilter, filter } = this.props
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
}

Footer.defaultProps = {
  toDo: 0,
  filter: 'All',
}

Footer.propTypes = {
  toDo: PropTypes.number,
  onDeleteAll: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
}
