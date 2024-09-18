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
    timerActive: false,
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

  closeForm = (e) => {
    if (e.keyCode == '27') {
      console.log('heeell')
    }
  }

  onTimer = () => {
    if (!this.props.item.completed) {
      this.setState(({ timerActive }) => ({
        timerActive: !timerActive,
      }))
    }
  }

  render() {
    const { item, onDeleted, onToggleDone } = this.props
    const { label, id, completed, date, min, sec } = item
    const taskStatus = classNames('task', {
      editing: this.state.editing,
      completed: completed,
    })
    const timerTaskStatus = classNames('timer-icon', {
      'icon-play': !this.state.timerActive,
      'icon-pause': this.state.timerActive,
    })
    const time = `${min}:${sec}`

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
            <span className="description">
              <button className={timerTaskStatus} onClick={this.onTimer} />
              <div className="timer">{time}</div>
            </span>
            <span className="created">{`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}</span>
          </label>
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
        </div>

        {this.state.editing && (
          <form onSubmit={this.onSubmit} onKeyDown={this.closeForm}>
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
