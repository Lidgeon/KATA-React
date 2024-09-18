//форма для добавления

import { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const input = [this.state.label, this.state.min, this.state.sec]
    console.log(input)
    if (this.state.label.trim()) {
      this.props.onAdded(...input)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          onChange={this.onMinChange}
          value={this.state.min}
          type="number"
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          onChange={this.onSecChange}
          value={this.state.sec}
          type="number"
          required
        />
        <button type="submit"></button>
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  title: 'Todos',
}

NewTaskForm.propTypes = {
  placeholder: PropTypes.string,
  title: PropTypes.string,
  onAdded: PropTypes.func.isRequired,
}
