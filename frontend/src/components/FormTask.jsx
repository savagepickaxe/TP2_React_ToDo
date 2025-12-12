import Button from "./ui/Button.jsx";

export default function FormTask(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        props.create(event.target.task.value, event.target.date.value);
        console.log(props.error);
        event.target.task.value = "";
        event.target.date.value = "";
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-4 mb-4 space-between align-middle height-full p-5 bg-gray-300 border-t-black-500"
        >
            <input
                className="flex-1 bg-amber-50 rounded-2xl"
                type="text"
                name="task"
            />
            <input
                type="date"
                name="date"
                className="bg-amber-50 rounded-2xl p-2"
            />
            <Button type="submit">Ajouter</Button>
        </form>
    );
}
