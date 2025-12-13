import Button from "./ui/Button";
import { useState } from "react";
import { TasksAPI } from "../../api/tasksAPI";
import { useNavigate } from "@tanstack/react-router";
import { Trash2, Edit } from "lucide-react";
export default function ToDoItem(props) {
    const Navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(props.task.is_completed);

    const handleDelete = () => {
        props.delete(props.task.id);
    };

    const handleChange = (event) => {
        setIsCompleted(event.target.checked);
        props.toggle(props.task.id);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md todo-item flex justify-between items-center">
            {/* BLOC GAUCHE = texte + checkbox */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleChange}
                    className="w-5 h-5 cursor-pointer rounded-full border-2 border-violet-800 accent-violet-800"
                />

                {/* Conteneur texte autorisé à rétrécir */}
                <div className="todo-item__content flex-1 min-w-0">
                    <div
                        className={`truncate ${isCompleted ? "line-through text-violet-400" : "text-violet-950"}`}
                    >
                        {props.task.title}
                    </div>

                    {props.task.due_date && (
                        <div
                            className={`${isCompleted ? "line-through text-violet-400" : "text-violet-950"}`}
                        >
                            📅 {props.task.due_date}
                        </div>
                    )}
                </div>
            </div>

            {/* BLOC DROIT = boutons */}
            <div className="todo-item__actions flex flex-col ml-3 sm:flex-row gap-2">
                <Button
                    view="edit"
                    icone={<Edit className="w-4 h-4" />}
                    onClick={() => {
                        Navigate({
                            to: "/edit/$id",
                            params: { id: props.task.id },
                        });
                    }}
                >
                    Modifier
                </Button>
                <Button
                    view="delete"
                    icone={<Trash2 className="w-4 h-4" />}
                    onClick={handleDelete}
                >
                    Supprimer
                </Button>
            </div>
        </div>
    );
}
