import './App.css'
import { useState } from 'react'

import NewTaskForm from '../components/NewTaskForm/NewTaskForm'
import TaskList from '../components/TaskList/TaskList'
import Footer from '../components/Footer/Footer'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [id, setId] = useState(100)
  const [filter, setFilter] = useState('All')

  const todoCount = todoData.filter((el) => !el.completed).length

  const createTask = (label, min, sec) => {
    setId((id) => id + 1)
    return {
      label,
      completed: false,
      id,
      date: new Date(),
      time: { min, sec },
    }
  }

  const addTask = (text, min, sec) => {
    const newItem = createTask(text, min, sec)
    setTodoData((tdData) => {
      return [...tdData, newItem]
    })
  }

  const changeFilter = (data) => {
    setFilter(data)
  }

  const deleteTask = (id) => {
    setTodoData((tdData) => {
      return tdData.filter((el) => el.id !== id)
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id)

    const oldTask = arr[idx]
    const newTask = { ...oldTask, [propName]: !oldTask[propName] }
    return [...arr.slice(0, idx), newTask, ...arr.slice(idx + 1)]
  }

  const onToggleDone = (id) => {
    setTodoData((tdData) => {
      return toggleProperty(tdData, id, 'completed')
    })
  }

  const editTask = (id, text) => {
    //console.log('А мне передали', id, text)
    setTodoData((tdData) => {
      return tdData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label: text,
          }
        }
        return el
      })
    })
  }

  const timerUpdate = (id, min, sec) => {
    //console.log('меня вызвали?' + id, min, sec)
    setTodoData((tdData) => {
      return tdData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            time: { min, sec },
          }
        }
        return el
      })
    })
  }

  const deleteAllTask = () => {
    setTodoData((tdData) => {
      return tdData.filter((el) => !el.completed)
    })
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={addTask} />
      </header>
      <TaskList
        todos={todoData}
        filter={filter}
        onDeleted={deleteTask}
        onEdit={editTask}
        onToggleDone={onToggleDone}
        timerUpdate={timerUpdate}
      />
      <Footer toDo={todoCount} onDeleteAll={deleteAllTask} changeFilter={changeFilter} filter={filter} />
    </section>
  )
}

export default App
