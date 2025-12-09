import ToDoItem from './ToDoItem';
export default function ToDoList(props) {

    const tasks = props.tasks;
    return (
    <div className="bg-yellow-500 flex flex-col gap-8">
        {  tasks.map( (task) => (
            <ToDoItem key={task.id} task={task} />
        )
        ) }

    </div>
    );
}
