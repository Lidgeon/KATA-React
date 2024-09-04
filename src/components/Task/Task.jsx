//одна задача

import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import KG from 'date-fns/locale/en-AU'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Task.css'

export default class Task extends Component {
  state = {
    editing: false,
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {
      onEdit,
      item: { id },
    } = this.props
    if (this.state.label.trim()) {
      onEdit(id, this.state.label)
      this.setState({ label: '' })
      this.setState({ editing: false })
    }
  }

  render() {
    const { item, onDeleted, onToggleDone } = this.props
    const { label, id, completed, date } = item
    const taskStatus = classNames('task', {
      editing: this.state.editing,
      completed: completed,
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
            <span className="description">{label}</span>
            <span className="created">{`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}</span>
          </label>
        </div>
        <button
          className="icon icon-edit"
          onClick={() =>
            this.setState(({ editing }) => ({
              editing: !editing,
              label: this.props.item.label,
            }))
          }
        ></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
        {this.state.editing && (
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onLabelChange} type="text" className="edit" value={this.state.label} />
          </form>
        )}
      </li>
    )
  }
}

Task.defaultProps = {
  item: {},
}

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    //
  }),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
