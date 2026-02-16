import { useState } from "react";
import useTodo from "../contexts/TodoContext";

function TodoForm() {
  const [todoMsg, setTodoMsg] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      todoDesc: todoMsg,
      isCompleted: false,
    });
    setTodoMsg("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1 group">
        {/* Glowing border effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-60 blur transition-opacity duration-300" />
        <input
          type="text"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          placeholder="What needs to be done?"
          className="relative w-full bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-black  text-sm outline-none transition-all duration-300 focus:bg-white/12 focus:border-white/25"
        />
      </div>
      <button
        type="submit"
        disabled={!todoMsg.length > 0}
        className={`relative shrink-0 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group
          ${todoMsg.length > 0
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 cursor-pointer active:scale-95"
            : "bg-white/8 text-white/30 cursor-not-allowed border border-white/10"
          }`}
      >
        {/* Shimmer on hover */}
        {todoMsg.length > 0 && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        )}
        <span className="relative flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </span>
      </button>
    </form>
  );
}

export default TodoForm;