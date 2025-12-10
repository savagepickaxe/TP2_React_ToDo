export default function ToDoList(props) {

    console.log( props.tasks );
    const tasks = props.tasks;
    return (
    <div>
        {  tasks.map( (task) => (
            <div key={task.id} >
                <h3>{task.title}</h3>
               </div>
        )
        ) }

    </div>
    );
}
