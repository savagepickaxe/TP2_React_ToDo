import Button from "./ui/Button";
import { useState } from "react";
import { TasksAPI } from "../../api/tasksAPI";

export default function ToDoItem(props) {
  const [isCompleted, setIsCompleted] = useState(
    props.task.is_completed === 1
  );

  const handleChange = async (event) => {
    const newValue = event.target.checked;

    setIsCompleted(newValue);

    await TasksAPI.ModifyStatus({
      id: props.task.id,
      currentStatus: newValue,
    });
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
          <div className={`todo-item__title ${isCompleted ? "line-through text-gray-500" : ""}`}>{props.task.title}</div>
          <div className={`todo-item__date ${isCompleted ? "line-through text-gray-500" : ""}`}>📅 {props.task.due_date}</div>
        </div>
      </div>

      <div className="todo-item__actions flex gap-2">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </Button>
        <Button className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </Button>
      </div>
    </div>
  );
}
