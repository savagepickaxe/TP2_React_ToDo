import Button from "./ui/Button";

export default function ToDoItem(props) {
  return (
    <div className="bg-stone-100 p-4 rounded-lg shadow-md todo-item">
        <div className="todo-item__content">
            <div className="todo-item__title">{props.task.title}</div>
            <div className="todo-item__date">📅 {props.task.due_date}</div>
        </div>
    </div>
  )
}
