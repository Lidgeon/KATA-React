import './App.css'
import { Component } from 'react'

import NewTaskForm from '../components/NewTaskForm/NewTaskForm'
import TaskList from '../components/TaskList/TaskList'
import Footer from '../components/Footer/Footer'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [],
    filter: 'All',
  }

  createTask(label) {
    return {
      label,
      completed: false,
      id: this.maxId++,
      date: new Date(),
    }
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArr = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]

      return {
        todoData: newArr,
      }
    })
  }

  editTask = (id, text) => {
    //console.log("А мне передали", id, text);
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        if (el.id === id) el.label = text
        return el
      }),
    }))
  }

  deleteAllTask = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.completed)
      return {
        todoData: newArr,
      }
    })
  }

  addTask = (text) => {
    const newItem = this.createTask(text)

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]

      return {
        todoData: newArr,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldTask = arr[idx]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }
    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      }
    })
  }

  filterTask() {
    const { todoData, filter } = this.state
    return todoData.filter(({ completed }) => {
      if (filter === 'All') {
        return true
      }
      if (filter === 'Completed') {
        return completed
      }
      return !completed
    })
  }

  changeFilter(data) {
    this.setState({ filter: data })
  }

  render() {
    const todoCount = this.state.todoData.filter((el) => !el.completed).length
    //
    //const { todoData } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.addTask} />
        </header>

        <section className="main">
          <TaskList
            todos={this.filterTask()}
            onDeleted={this.deleteTask}
            onEdit={this.editTask}
            onToggleDone={this.onToggleDone}
          />

          <Footer
            toDo={todoCount}
            onDeleteAll={this.deleteAllTask}
            changeFilter={this.changeFilter.bind(this)}
            filter={this.state.filter}
          />
        </section>
      </section>
    )
  }
}
