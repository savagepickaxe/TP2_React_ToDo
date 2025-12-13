import { TasksAPI } from "../../api/tasksAPI";
import React from "react";
export function useTasks() {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    // Charger toutes les tâches
    const loadTasks = React.useCallback(async () => {
        try {
            setLoading(true);
            // TODO: Appeler l'API pour récupérer les tâches
            const data = await TasksAPI.fetchTasks();
            // TODO: Mettre à jour le state tasks
            setTasks(data);
            console.log(data);
        } catch (err) {
            // TODO: Gérer l'erreur
            setError("Échec du chargement des tâches");
        } finally {
            setLoading(false);
        }
    }, []);

    // Ajouter une tâche
    const addTask = React.useCallback(async (title, dueDate) => {
        try {
            // TODO: Valider les données
            const regexTitle = /^.{1,255}$/;
            if (!regexTitle.test(title)) {
                setError("Titre invalide");
                return;
            }
            if (dueDate) {
                if (isNaN(new Date(dueDate).getTime())) {
                    setError("Date invalide");
                    return;
                }
            }
            // TODO: Appeler l'API POST
            await TasksAPI.createTask({ title, dueDate });
            // TODO: Rafraîchir la liste
            await loadTasks();
        } catch (err) {
            setError("Échec de la création de la tâche");
        }
    }, []);

    // Modifier le statut d'une tâche
    const toggleTask = React.useCallback(
        async (taskId) => {
            try {
                // TODO: Trouver la tâche actuelle
                const task = tasks.find((t) => t.id === taskId);
                if (!task) {
                    setError("Tâche non trouvée");
                    return;
                }
                const newStatus = task.is_completed === 1 ? 0 : 1;
                // TODO: Appeler l'API PUT avec le nouveau statut
                await TasksAPI.ModifyStatus({
                    id: taskId,
                    currentStatus: newStatus,
                });
                // TODO: Mettre à jour le state
                await loadTasks();
            } catch (err) {
                setError("Échec de la modification du statut de la tâche");
            }
        },
        [tasks],
    );

    // Modifier une tâche
    const editTask = React.useCallback(async (taskId, title, dueDate) => {
        try {
            const regexTitle = /^.{1,255}$/;
            if (!regexTitle.test(title)) {
                setError("Titre invalide");
                return;
            }
            if (dueDate) {
                if (isNaN(new Date(dueDate).getTime())) {
                    setError("Date invalide");
                    return;
                }
            }
            // TODO: Appeler l'API PUT
            await TasksAPI.updateTask({
                id: taskId,
                title: title,
                dueDate: dueDate,
            });
            // TODO: Mettre à jour le state
            await loadTasks();
        } catch (err) {
            setError("Échec de la modification de la tâche");
        }
    }, []);

    // Supprimer une tâche
    const deleteTask = React.useCallback(async (taskId) => {
        try {
            // TODO: Demander confirmation
            const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
            if (!confirmDelete) {
                return;
            }
            // TODO: Appeler l'API DELETE
            await TasksAPI.deleteTask(taskId);
            // TODO: Mettre à jour le state
            await loadTasks();
        } catch (err) {
            setError("Échec de la suppression de la tâche");
        }
    }, []);

    React.useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        tasks,
        loading,
        error,
        loadTasks,
        addTask,
        toggleTask,
        editTask,
        deleteTask,
    };
}
