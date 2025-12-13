import { createFileRoute } from "@tanstack/react-router";
import { useTasks } from "../hooks/useTasks.js";
import ListTasks from "../components/listTasks";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    layouts,
    plugins,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ToDoItem from "../components/ToDoItem.jsx";
import ToDoList from "../components/ToDoList.jsx";

export const Route = createFileRoute("/chart")({
    component: StatusChart,
});

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusChart() {
    const { tasks, loading, error, addTask, deleteTask, toggleTask } = useTasks();
    const finishedTasks = tasks.filter(
        (task) => task.is_completed === 1,
    ).length;
    const numberUnfinishedTasks = tasks.length - finishedTasks;
    const unfinishedTasks = tasks.filter((task) => task.is_completed === 0);
    const data = {
        labels: ["Complétées", "Non complétées"],
        datasets: [
            {
                label: "# of Votes",
                data: [finishedTasks ? finishedTasks : 0, numberUnfinishedTasks ? numberUnfinishedTasks : 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        cutout: "70%",
        layouts: {
            padding: 20,
        },
        plugins: {
            legend: {
                position: "center",
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 14,
                        weight: "500",
                    },
                },
            },
        },
    };
    const centerTextPlugin = {
        id: "centerText",
        beforeDraw(chart) {
            const { width, height, ctx } = chart;
            const completed = chart.data.datasets[0].data[0];
            const total = chart._metasets[0].total;

            const percent = Math.round((completed / total) * 100);

            ctx.save();

            ctx.font = "bold 24px Arial";
            ctx.fillStyle = "#111";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${percent}%`, width / 2, height / 2 - 10);

            ctx.font = "14px Arial";
            ctx.fillStyle = "#666";
            ctx.fillText("complétées", width / 2, height / 2 + 16);

            ctx.restore();
        },
    };

    return (
        <div >
            <div className="sm:w-1/2 mx-auto p-10">
            <Doughnut
                data={data}
                options={options}
                plugins={[centerTextPlugin]}
            />
            </div>
                <ListTasks
                    tasks={unfinishedTasks}
                    statusLoading={loading}
                    error={error}
                    create={addTask}
                    delete={deleteTask}
                    toggle={toggleTask}
                    personalizedStyle="rounded-2xl"
                />
        </div>
    );
}
