import { createFileRoute } from '@tanstack/react-router';
import { useState , useEffect } from 'react';
import { TasksAPI } from '../../api/tasksAPI';
import ToDoList from '../components/ToDoList.jsx';
import { useTasks } from '../hooks/useTasks.js';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { tasks, loading, error, addTask, deleteTask, toggleTask } = useTasks();
  
  return (
    <ToDoList tasks={tasks} statusLoading={loading} error={error} create={addTask} delete={deleteTask} toggle={toggleTask} />
  );
}