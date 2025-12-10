import React from 'react'
import Button from './ui/Button.jsx'
import { TasksAPI } from '../../api/tasksAPI.js';

export default function FormTask(props) {
    const handleSubmit = async (event) => {
    event.preventDefault();
    await TasksAPI.createTask({
      title: event.target.task.value,
      dueDate: event.target.date.value,
    });
       props.shouldReload();
       event.target.titleTask.value = '';
       event.target.titleDate.value = '';
      
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-4 mb-4 space-between align-middle height-full p-5 bg-gray-300 border-t-black-500'>
   
        <input className='flex-1 bg-amber-50 rounded-2xl' type="text" name="task" id="titleTask"/>
        <input type="date" name="date" className='bg-amber-50 rounded-2xl p-2' id="titleDate" />
        <Button type="submit">Ajouter</Button>
     

    </form>
  )
}
