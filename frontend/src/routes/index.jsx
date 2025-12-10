import { createFileRoute } from '@tanstack/react-router';
import { useState , useEffect } from 'react';
import { TasksAPI } from '../../api/tasksAPI';
import ToDoList from '../components/ToDoList.jsx';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [tasks, setTasks] = useState([]);
  useEffect(() =>{
    
    const tasksData = async () => {
      const data = await TasksAPI.fetchTasks();
      setTasks(data);
      
    }
    tasksData();
  },
  []);
  
  return (
    <ToDoList tasks={tasks}/>
    
  );
}