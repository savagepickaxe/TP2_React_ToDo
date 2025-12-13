import ToDoItem from "./ToDoItem";
export default function ListTasks(props) {
    return (
        <div
            className={`bg-violet-100 flex flex-col gap-4 px-5 py-10 ${props.personalizedStyle ? props.personalizedStyle : ""}`}
        >
            {props.statusLoading ? (
                [...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-white p-4 rounded-lg shadow-md todo-item flex justify-between items-center"
                    >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-5 h-5 rounded-full border-2 border-violet-800 bg-violet-200"></div>
                            <div className="todo-item__content flex-1 min-w-0">
                                <div className="h-4 bg-violet-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-violet-200 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="todo-item__actions flex flex-col ml-3 sm:flex-row gap-2">
                            <div className="h-8 bg-violet-200 rounded w-16 mb-2"></div>
                            <div className="h-8 bg-violet-200 rounded w-16"></div>
                        </div>
                    </div>
                ))
            ) : !props.tasks.length ? (
                <p className="text-center text-violet-950">
                    Aucune tâche à afficher
                </p>
            ) : (
                props.tasks.map((task) => (
                    <ToDoItem
                        key={task.id}
                        task={task}
                        error={props.error}
                        delete={props.delete}
                        toggle={props.toggle}
                        statusLoading={props.statusLoading}
                    />
                ))
            )}
        </div>
    );
}