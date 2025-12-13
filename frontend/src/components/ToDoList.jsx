import ToDoItem from "./ToDoItem";
import FormTask from "./FormTask";
import { List } from "lucide-react";
import ListTasks from "./listTasks";

export default function ToDoList(props) {
    const tasks = props.tasks;
    console.log(props.tasks);
    return (
        <div>
            <FormTask
                statusLoading={props.statusLoading}
                create={props.create}
            />
            <ListTasks 
                tasks={tasks}
                delete={props.delete}
                toggle={props.toggle}
                statusLoading={props.statusLoading}
                personalizedStyle={"rounded-b-2xl"}   
            />  
        </div>
    );
}
