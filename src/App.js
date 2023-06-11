import { useState } from 'react';
import './App.css';
import { AiFillDelete } from "react-icons/ai"
import { IoMdDoneAll } from 'react-icons/io'
import { v4 as uuidv4 } from 'uuid'
uuidv4();

function App() {
  const [todo, setTodo] = useState([])
  const [data, setData] = useState({
    todos: ""
  })

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const addtoarray = () => {
    if (data.todos !== "") {
      setData({ ...data, todos: "" })
      setTodo([...todo, { id: uuidv4(), todo: data.todos, isCompleted: false, isEditing: false }])
    }
    document.querySelector('input').value = ""
  }
  localStorage.setItem("todo", JSON.stringify(...todo))

  const compelet = (id) => {
    setTodo(todo.map((a) => a.id === id ? { ...a, isCompleted: !a.isCompleted } : a))
  }
  console.log(todo)
  const deletetodo = (a) => {
    setTodo(todo.filter(item => item !== a))
  }
  return (
    <div className="App">
      <header>
        <h2>To Do List</h2>
      </header>
      <div className='inputs'>
        <input
          type="text"
          name='todos'
          placeholder='Enter your To-Do work'
          onChange={onChange}
          required
        />
        <button onClick={addtoarray}>Add</button>
      </div>
      <div className="todo-list">
        <div className='todo-wrap'>
          {
            todo.map((a) => (

              a.isCompleted ? (
                <div style={{ background: "#47bc6b" }} className='todo-item' key={a.id}>
                  <div className='todo-txt'>
                    <div>{a.todo}</div>
                    <div className='todo-btn'>
                      <div onClick={() => compelet(a.id)}>
                        <IoMdDoneAll />
                      </div>
                      <div onClick={() => deletetodo(a)} className='delete'>
                        <AiFillDelete />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='todo-item' key={a.id}>
                  <div className='todo-txt'>
                    <div >{a.todo}</div>
                    <div className='todo-btn'>
                      <div onClick={() => compelet(a.id)}>
                        <IoMdDoneAll />
                      </div>
                      <div onClick={() => deletetodo(a)} className='delete'>
                        <AiFillDelete />
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))
          }
        </div>
      </div>
    </div >
  );
}


export default App;
