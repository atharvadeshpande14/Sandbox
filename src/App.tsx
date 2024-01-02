import React, { FormEvent, useState, useEffect } from 'react';
import './App.css';
import InputField from './InputField';
import { Todo } from './model';
import TodoBlock from './TodoBlock';
import { Save } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DoneIcon from '@mui/icons-material/Done';


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doneCount, setDoneCount] = useState<number>(0);
  const [stateChanged, setStateChanged] = useState<boolean>(false);

  useEffect(() => {
    setDoneCount(todos.filter(element => element.isDone === true).length);
    setTodos(todos.sort((el1, el2) => (Number(el1.stateModifiedAt) - Number(el2.stateModifiedAt))));
  }, [todos])

  useEffect(() => {
    if ((localStorage.getItem("TODO_LIST"))) {
      //@ts-ignore
      setTodos((JSON.parse(localStorage.getItem("TODO_LIST"))));
    }
  }, [])

  useEffect(() => {
    //@ts-ignore
    const unloadCallback = (event) => {
      if (stateChanged) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }

    };
    window.addEventListener("beforeunload", unloadCallback);


    return () => window.removeEventListener("beforeunload", unloadCallback);

  }, [stateChanged]);
  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false, isEditable: false, stateModifiedAt: new Date(Date.now()) }])
      setTodo("");
      setStateChanged(true);

    }
  }



  const SaveState = () => {
    localStorage.setItem("TODO_LIST", JSON.stringify(todos));
    setStateChanged(false);
    console.log(stateChanged)
  }

  console.log(todos)
  return (
    <div className="app">
      <div className="app__header">
        <div>Todo List</div>
        <Tooltip title="Save" className='icon' onClick={SaveState}><Save /></Tooltip>
      </div>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <div className='app__main'>
        {todos.length - doneCount === 0 ? (null) : (

          <div className='app__main__block'>
            {todos.map((todoItem: Todo) => {
              if (!todoItem.isDone)
                return (
                  <TodoBlock todoItem={todoItem} todos={todos} setTodos={setTodos} stateChanged={setStateChanged} />
                )
              return null;
            })}
          </div>
        )}


        {doneCount === 0 ? (null) : (
          <div className='app__main__block__done'>
            {todos.map((todoItem: Todo) => {
              if (todoItem.isDone)
                return (
                  <TodoBlock todoItem={todoItem} todos={todos} setTodos={setTodos} stateChanged={setStateChanged} />
                )
              return null;
            })}
          </div>
        )}

       

      </div>

    </div>
  );
}

export default App;
