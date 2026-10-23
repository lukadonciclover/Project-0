import type { Task } from "../types";

type TaskItemProps = {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li className="task-item">
      <label className="task-label">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`Mark ${task.text} ${task.completed ? "active" : "completed"}`}
        />
        <span className={task.completed ? "task-text is-complete" : "task-text"}>
          {task.text}
        </span>
      </label>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;