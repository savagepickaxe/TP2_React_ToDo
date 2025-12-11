import { createFileRoute } from '@tanstack/react-router'
import { TasksAPI } from '../../../api/tasksAPI';
import { use } from 'react';
import { useEffect, useState } from 'react';  
export const Route = createFileRoute('/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams();
    const [task, setTask] = useState(null);
    useEffect(() => {
        const fetchTask = async () => {
            const data = await TasksAPI.fetchTask(id);
            setTask(data);
            
        };
        fetchTask();
    }, []);
    console.log(task);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await TasksAPI.updateTask({
          id: id,
          title: event.target.title.value,
          dueDate: event.target.dueDate.value,
        });
        alert("Tâche modifiée avec succès !");
        window.location.href = '/';
      }
    if (!task) {
        return <div>Chargement...</div>
      }
      
  return (
    <div>
      <h1>Modifier la tâche</h1>
      {!task ? (
        <p>chargement des taches</p>
      ) : (
        <form onSubmit={handleSubmit} >
            <div>
            <label htmlFor="title">Titre :</label>
            <input type="text" id="title" name="title"  defaultValue={task.title}   />
            </div>
            <div>
            <label htmlFor="dueDate">Date d'échéance :</label>
            <input type="date" id="dueDate" name="dueDate" defaultValue={task.due_date}  />
            </div>
            <button type="submit">Enregistrer les modifications</button>
        </form>
      )}
    </div>
  );
}
