import Button from "./ui/Button";
import { useState } from "react";
import { TasksAPI } from "../../api/tasksAPI";
import { useNavigate } from "@tanstack/react-router";
export default function ToDoItem(props) {
    const Navigate = useNavigate();
    const [isCompleted, setIsCompleted] = useState(props.task.is_completed);
    const handleModify = async () => {
        await TasksAPI.modifyTask();
        props.shouldReload();
    };
    const handleDelete = async () => {
        props.delete(props.task.id);
    };
    const handleChange = async (event) => {
        setIsCompleted(event.target.checked);
        props.toggle(props.task.id);
    };

    return (
        <div className="bg-stone-100 p-4 rounded-lg shadow-md todo-item flex justify-between items-center">
            <div className="todo-item__info flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleChange}
                />

                <div className="todo-item__content">
                    <div
                        className={`todo-item__title ${isCompleted ? "line-through text-gray-500" : ""}`}
                    >
                        {props.task.title}
                    </div>
                    <div
                        className={`todo-item__date ${isCompleted ? "line-through text-gray-500" : ""}`}
                    >
                        📅 {props.task.due_date}
                    </div>
                </div>
            </div>

            <div className="todo-item__actions flex gap-2">
                <Button
                    type="modifier"
                    onClick={() => {
                        Navigate({
                            to: "/edit/$id",
                            params: {
                                id: props.task.id,
                            },
                        });
                    }}
                >
                    {" "}
                    Modifier
                </Button>
                <Button type="supprimer" onClick={handleDelete}>
                    Supprimer
                </Button>
            </div>
        </div>
    );
}
