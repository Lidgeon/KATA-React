//форма для добавления

import { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label.trim()) {
      this.props.onAdded(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        />
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
