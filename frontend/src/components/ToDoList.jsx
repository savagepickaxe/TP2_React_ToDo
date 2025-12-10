import ToDoItem from './ToDoItem';
import FormTask from './FormTask';
export default function ToDoList(props) {

    const tasks = props.tasks;
    return (

    <div className="bg-yellow-500 flex flex-col gap-8">
        <FormTask shouldReload={props.shouldReload}/>
        {  tasks.map( (task) => (
            <ToDoItem key={task.id} task={task}  shouldReload={props.shouldReload} />
        )
        ) }

    </div>

    );
}
