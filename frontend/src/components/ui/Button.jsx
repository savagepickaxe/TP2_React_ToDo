export default function Button(props) {
    switch (props.view) {
        case "add":
            return (
                <button
                    className={`cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 rounded-lg shadow-md flex justify-center items-center bg-yellow-300 text-black hover:bg-yellow-500 ${props.personalizedStyles ? props.personalizedStyles : ""}`}
                    onClick={props.onClick ? props.onClick : undefined}
                    type="submit"
                >
                    {props.icone ? props.icone : null}

                    <span>{props.children}</span>
                </button>
            );
            break;

        case "edit":
            return (
                <button
                    className={`cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 rounded-lg shadow-md flex justify-center items-center bg-blue-500 text-white hover:bg-blue-700 ${props.personalizedStyles ? props.personalizedStyles : ""}`}
                    onClick={props.onClick ? props.onClick : undefined}
                    type="button"
                >
                    {props.icone ? props.icone : null}
                    <span className="hidden sm:inline sm:ml-2">
                        {props.children}
                    </span>
                </button>
            );
            break;
        case "delete":
            return (
                <button
                    className={`cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 rounded-lg shadow-md flex justify-center items-center bg-red-600 text-white hover:bg-red-800 ${props.personalizedStyles ? props.personalizedStyles : ""}`}
                    onClick={props.onClick ? props.onClick : undefined}
                    type="button"
                >
                    {props.icone ? props.icone : null}
                    <span className="hidden sm:inline sm:ml-2">
                        {props.children}
                    </span>
                </button>
            );
            break;
        case "save":
            return (
                <button
                    className={`cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 rounded-lg shadow-md flex justify-center items-center todo-item bg-blue-500 text-white hover:bg-blue-700 ${props.personalizedStyles ? props.personalizedStyles : ""}`}
                    onClick={props.onClick ? props.onClick : undefined}
                    type="submit"
                >
                    {props.icone ? props.icone : null}
                    <span className="ml-2">
                        {props.children}
                    </span>
                </button>
            );
            break;
        case "cancel":
            return (
                <button
                    className={`cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 rounded-lg shadow-md flex justify-center items-center todo-item bg-gray-400 text-white hover:bg-gray-600 ${props.personalizedStyles ? props.personalizedStyles : ""}`}
                    onClick={props.onClick ? props.onClick : undefined}
                    type="button"
                >
                    {props.icone ? props.icone : null}
                    <span className="ml-2">
                        {props.children}
                    </span>
                </button>
            );
            break;

        default:
            return (
                <button
                    className="cursor-pointer p-2 min-w-[45px] min-h-[45px] sm:min-w-0 sm:min-h-0 px-5 rounded-lg shadow-md todo-item bg-gray-200 text-black"
                    onClick={props.onClick ? props.onClick : undefined}
                >
                    {props.icone ? props.icone : null}
                    {props.children}
                </button>
            );
            break;
    }
}
