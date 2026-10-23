import TaskItem from "./TaskItem";
import type { Task } from "../types";

type TaskListProps = {
  tasks: Task[];
  emptyMessage: string;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
};

function TaskList({ tasks, emptyMessage, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state" role="status">{emptyMessage}</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;