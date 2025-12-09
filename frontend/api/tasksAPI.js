import axios from "axios";

export class TasksAPI {
  static async fetchTasks() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks.php`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch tasks");
    }
  }
  static async fetchTask(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tasks.php?id=${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch task");
    }
  }
  static async ModifyStatus(taskData) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks.php?id=${taskData.id}`,
        { is_completed: !taskData.currentStatus },
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }
  static async updateTask(taskData) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks.php?id=${taskData.id}`,
        {
          title: taskData.title,
          due_date: taskData.dueDate,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update task");
    }
  }
  static async createTask(taskData) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks.php`,
        {
          title: taskData.title,
          due_date: taskData.dueDate,
        },
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }
  static async deleteTask(id) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/tasks.php?id=${id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete task");
    }
  }
}
