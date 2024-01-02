import React, { useState, useEffect } from 'react'
import './TodoBlock.css'
import { Todo } from './model';
import { Delete, Done, Edit, Undo } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

interface Props {
    todoItem: Todo,
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    stateChanged: React.Dispatch<React.SetStateAction<boolean>>;
}



const TodoBlock = ({ todoItem, todos, setTodos, stateChanged }: Props) => {
    
    const [todoItemName, setTodoItemName] = useState<string>(todoItem.todo);
    useEffect(()=>{
        setTodoItemName(todoItem.todo);
        console.log(1);
    },[todoItem.todo])
    
   

    // const [todoItemIsEditable,setTodoItemIsEditable] =useState<boolean>(todoItem.isEditable);
    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (todoItemName !== "") {
            todoItem.todo = todoItemName;
            todoItem.isEditable = false;
            // setTodoItemIsEditable(false);
            document.getElementById(todoItem.id.toString())?.blur();
            setTodos(todos.map(element => element.id === todoItem.id ? { ...element, todoItem } : element))
            stateChanged(true);
        }
    }

    return (
        <form className={`app__todo__component ${todoItem.isDone ? 'done' : 'todo'}`} onSubmit={submitForm}>
            <input id={todoItem.id.toString()}
                className={`app__todo__component__label ${todoItem.isEditable ? 'enabled' : 'disabled'}`}
                value={todoItemName}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setTodoItemName(e.currentTarget.value);
                    // setTodoItem(todo);
                }}
            />




            <div className='app__todo__component__icons'>
                
                <Tooltip title = "Edit">
                    <Edit onClick={() => {
                    todoItem.isEditable = true;
                    document.getElementById(todoItem.id.toString())?.focus();
                    // setTodoItemIsEditable(true);
                    setTodos(todos.map(element => element.id === todoItem.id ? { ...element, todoItem } : element))
                }} className='icon' />
                </Tooltip>

                <Tooltip title= "Delete">
                    <Delete className='icon'  onClick={() => {
                    setTodos(todos.filter(element=> element.id !== todoItem.id));
                    stateChanged(true);
                }}  />
                </Tooltip>
                
                {todoItem.isDone?(<Tooltip title="Mark as TODO"><Undo onClick={() => {
                    todoItem.isDone = false;
                    todoItem.stateModifiedAt= new Date(Date.now())
                    setTodos(todos.map(element => element.id === todoItem.id ? { ...element, todoItem } : element))
                    stateChanged(true);
                }}  className='icon' /></Tooltip>):(<Tooltip title="Mark as Done"><Done onClick={() => {
                    todoItem.isDone = true;
                    todoItem.stateModifiedAt= new Date(Date.now())
                    setTodos(todos.map(element => element.id === todoItem.id ? { ...element, todoItem } : element));
                    stateChanged(true);
                }}  className='icon' /></Tooltip>)}
                

            </div>
        </form>

    )
}

export default TodoBlock