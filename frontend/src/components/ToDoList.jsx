import FormTask from "./FormTask";
import ListTasks from "./ListTasks.jsx";


export default function ToDoList(props) {
    const tasks = props.tasks;
    console.log(props.tasks);
    return (
        <div>
            <FormTask
                statusLoading={props.statusLoading}
                create={props.create}
                error={props.error}
            />
            <ListTasks 
                tasks={tasks}
                delete={props.delete}
                toggle={props.toggle}
                error={props.error}
                statusLoading={props.statusLoading}
                personalizedStyle={"rounded-b-2xl"}   
            />  
        </div>
    );
}
