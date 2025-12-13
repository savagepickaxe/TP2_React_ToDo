import Button from "./ui/Button.jsx";
import {Plus } from "lucide-react"

export default function FormTask(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        props.create(event.target.task.value, event.target.date.value);
        console.log(props.error);
        event.target.task.value = "";
        event.target.date.value = "";
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="bg-violet-800 text-violet-950 flex flex-col sm:flex-row rounded-t-2xl gap-4 space-between align-middle height-full p-5  border-t-black-500"
        >
            <input
                className="flex-1 min-h-[45px] bg-amber-50 rounded px-4 focus:outline-none focus:ring-4 focus:ring-violet-950"
                type="text"
                name="task"
            />
            <input
                type="date"
                name="date"
                className="bg-amber-50 min-h-[45px] rounded px-4 focus:outline-none focus:ring-4 focus:ring-violet-950"
            />
            <Button view="add" type="submit" icone={<Plus className="w-4 h-4" />}>Ajouter</Button>
        </form>
    );
}
