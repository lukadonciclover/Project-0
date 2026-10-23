import { useId, useState, type FormEvent } from "react";

type TaskFormProps = {
  onAdd: (text: string) => void;
};

function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputId = useId();
  const errorId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Type a task before adding it.");
      return;
    }

    onAdd(trimmedText);
    setText("");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId}>New task</label>
      <div className="form-row">
        <input
          id={inputId}
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Send the project update"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button className="add-button" type="submit">
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>
      {error && <p className="form-error" id={errorId} role="alert">{error}</p>}
    </form>
  );
}

export default TaskForm;