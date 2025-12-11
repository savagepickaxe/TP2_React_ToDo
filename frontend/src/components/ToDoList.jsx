import ToDoItem from './ToDoItem';
import FormTask from './FormTask';

export default function ToDoList(props) {

    const tasks = props.tasks;
    return (

    <div className="bg-yellow-500 flex flex-col gap-8">
        <FormTask statusLoading={props.statusLoading} create={props.create}  />
        {  tasks.map( (task) => (
            <ToDoItem key={task.id} task={task} delete={props.delete} toggle={props.toggle} statusLoading={props.statusLoading} />
        )
        ) }

    </div>

    );
}
