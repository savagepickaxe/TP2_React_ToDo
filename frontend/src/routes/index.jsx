import { createFileRoute } from '@tanstack/react-router';
import { useState , useEffect } from 'react';
import { TasksAPI } from '../../api/tasksAPI';
import ToDoList from '../components/ToDoList.jsx';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const [tasks, setTasks] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

  useEffect(() =>{
    
    const tasksData = async () => {
      const data = await TasksAPI.fetchTasks();
      setTasks(data);
      
    }
    tasksData();
  },
  [isLoading]);
  
  return (
    <ToDoList tasks={tasks} shouldReload={() => setIsLoading(true)}/>
    
  );
}