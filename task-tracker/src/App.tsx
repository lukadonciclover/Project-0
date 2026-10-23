import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task, TaskFilter } from "./types";

const STORAGE_KEY = "daymark-tasks";

function loadTasks(): Task[] {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (!savedTasks) return [];

    const parsedTasks: unknown = JSON.parse(savedTasks);
    if (!Array.isArray(parsedTasks)) return [];

    return parsedTasks.filter(
      (task): task is Task =>
        typeof task === "object" &&
        task !== null &&
        typeof task.id === "string" &&
        typeof task.text === "string" &&
        typeof task.completed === "boolean",
    );
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // The app remains usable when browser storage is unavailable.
    }
  }, [tasks]);

  function addTask(text: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  const activeCount = tasks.filter((task) => !task.completed).length;
  const emptyMessage =
    tasks.length === 0
      ? "Your list is clear. Add a task to get started."
      : filter === "active"
        ? "No active tasks. A nice place to be."
        : "No completed tasks yet.";

  const filters: { label: string; value: TaskFilter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <main className="page-shell">
      <section className="tracker" aria-labelledby="page-title">
        <header className="page-header">
          <p className="eyebrow"><span aria-hidden="true">●</span> DAYMARK / YOUR TASKS</p>
          <h1 id="page-title">Make room for what matters.</h1>
          <p className="intro">A calm place to keep track of the next things.</p>
        </header>

        <TaskForm onAdd={addTask} />

        <section className="task-section" aria-label="Your task list">
          <div className="list-toolbar">
            <p className="remaining-count" aria-live="polite">
              <strong>{activeCount}</strong> {activeCount === 1 ? "task" : "tasks"} left
            </p>
            <div className="filter-group" role="group" aria-label="Filter tasks">
              {filters.map((option) => (
                <button
                  className={`filter-button${filter === option.value ? " is-selected" : ""}`}
                  type="button"
                  key={option.value}
                  aria-pressed={filter === option.value}
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            tasks={visibleTasks}
            emptyMessage={emptyMessage}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>

        <footer className="page-footer">Small steps count.</footer>
      </section>
    </main>
  );
}

export default App;