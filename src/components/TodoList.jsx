import { useState } from "react";
import useTodo from "../contexts/TodoContext";

function TodoList({ todo }) {
  const [todoMsg, setTodoMsg] = useState(todo.todoDesc);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todoDesc: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 border transition-all duration-300
        ${todo?.isCompleted
          ? "bg-emerald-500/8 border-emerald-500/20 shadow-emerald-500/5"
          : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
        } shadow-sm`}
    >
      {/* Completion indicator strip */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3/5 rounded-full transition-all duration-500
          ${todo?.isCompleted ? "bg-emerald-400 opacity-100" : "bg-violet-500 opacity-0 group-hover:opacity-40"}`}
      />

      {/* Custom Checkbox */}
      <button
        onClick={toggleCompleted}
        className={`relative shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer
          ${todo.isCompleted
            ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/30"
            : "border-white/25 hover:border-violet-400 hover:shadow-violet-500/20 hover:shadow-md"
          }`}
        aria-label={todo.isCompleted ? "Mark incomplete" : "Mark complete"}
      >
        {todo.isCompleted && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Text input */}
      <input
        type="text"
        className={`flex-1 bg-transparent outline-none text-sm transition-all duration-300 min-w-0
          ${isTodoEditable
            ? "text-white border-b border-violet-400/60 pb-0.5 caret-violet-400"
            : "border-b border-transparent"
          }
          ${todo.isCompleted
            ? "line-through text-white/35"
            : "text-white/85"
          }`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
        onKeyDown={(e) => {
          if (e.key === "Enter" && isTodoEditable) editTodo();
          if (e.key === "Escape") {
            setTodoMsg(todo.todoDesc);
            setIsTodoEditable(false);
          }
        }}
      />

      {/* Action buttons — always visible */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Edit (blue) / Save (green) button */}
        <button
          onClick={() => {
            if (todo.isCompleted) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable((prev) => !prev);
            }
          }}
          disabled={todo.isCompleted}
          title={isTodoEditable ? "Save" : "Edit"}
          className={`w-7 h-7 rounded-lg border flex items-center justify-center text-xs transition-all duration-200 active:scale-90
            ${todo.isCompleted
              ? "border-white/8 bg-white/3 text-white/20 cursor-not-allowed"
              : isTodoEditable
                ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/35 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/20"
                : "border-blue-400/50 bg-blue-500/15 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/20"
            }`}
        >
          {isTodoEditable ? (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )}
        </button>

        {/* Delete button — always red-styled, deeper red on hover */}
        <button
          onClick={() => deleteTodo(todo.id)}
          title="Delete"
          className="w-7 h-7 rounded-lg border border-red-400/50 bg-red-500/15 text-red-300 flex items-center justify-center text-xs transition-all duration-200 active:scale-90 hover:bg-red-500/30 hover:border-red-400 hover:text-red-200 hover:shadow-md hover:shadow-red-500/25"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoList;