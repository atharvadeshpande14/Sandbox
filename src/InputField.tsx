import React, { FormEvent } from 'react'
import './InputField.css'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e:React.FormEvent) => void;
}

const InputField= ({todo, setTodo, handleAdd}: Props) => {
  return (
    <form className='todoForm' onSubmit={handleAdd}>
        <input value = {todo} onChange={(e)=>{setTodo(e.target.value)}} type="text" className = "todoForm__input" placeholder='Enter a task'/>
        <button type='submit' className='todoForm__submit' >Go</button>

    </form>
  )
}

export default InputField