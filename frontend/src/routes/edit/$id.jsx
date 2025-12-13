import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import Button from "../../components/ui/Button";
import { Save, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/edit/$id")({
    component: RouteComponent,
});

function RouteComponent() {
    const Navigate = useNavigate();
    const { id } = Route.useParams();
    const [task, setTask] = useState(null);
    const { tasks, loading, error, editTask } = useTasks();

    useEffect(() => {
        if (!tasks.length) return;

        const data = tasks.find((t) => t.id === parseInt(id));
        setTask(data);
    }, [tasks, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        editTask(id, event.target.title.value, event.target.dueDate.value);
        alert("Tâche modifiée avec succès !");
        window.location.href = "/";
    };
    return (
        <div>
            <h1 className="bg-violet-800 text-white text-2xl font-bold p-4 rounded-t-2xl">
                Modifier la tâche
            </h1>
            {loading ? (
                <p>chargement de la tâche</p>
            ) : error ? (
                <p>{error}</p>
            ) : !task ? (
                <p>Tâche introuvable</p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-violet-100 text-violet-950 flex flex-col rounded-b-2xl gap-4 space-between p-5"
                >
                    <div className="flex flex-col gap-2 sm:max-w-1/2">
                        <label htmlFor="title">Titre :</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="min-h-[45px] bg-white rounded px-4 focus:outline-none focus:ring-4 focus:ring-violet-950 shadow-md"
                            defaultValue={task.title}
                        />
                    </div>
                    <div className="flex flex-col gap-2 sm:max-w-1/2">
                        <label htmlFor="dueDate">Date d'échéance :</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            className="min-h-[45px] bg-white rounded px-4 focus:outline-none focus:ring-4 focus:ring-violet-950 shadow-md"
                            defaultValue={task.due_date}
                        />
                    </div>
                    <div className="flex gap-2 flex-col-reverse sm:flex-row sm:max-w-1/2 justify-center ">
                        <Button
                            view="cancel"
                            personnalizedStyles={"flex-1"}
                            icone={<ArrowLeft className="w-5 h-5" />}
                            onClick={() => {
                                Navigate({
                                    to: "/",
                                });
                            }}
                        >
                            Annuler
                        </Button>
                        <Button
                            view="save"
                            personnalizedStyles={"flex-1"}
                            icone={<Save className="w-5 h-5" />}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
