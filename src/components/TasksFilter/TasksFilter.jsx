//фильтры в футере

import { Component } from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default class TasksFilter extends Component {
  render() {
    const { changeFilter, filter } = this.props
    return (
      <ul className="filters">
        <li>
          <button onClick={() => changeFilter('All')} className={filter === 'All' ? 'selected' : null}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => changeFilter('Active')} className={filter === 'Active' ? 'selected' : null}>
            Active
          </button>
        </li>
        <li>
          <button onClick={() => changeFilter('Completed')} className={filter === 'Completed' ? 'selected' : null}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.defaultProps = {
  filter: 'All',
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
}
