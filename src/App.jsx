import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((ele) => {
        if (ele.id === id) {
          return { id, ...todo };
        } else {
          return ele;
        }
      }),
    );
  };

  useEffect(() => {
    const todosData = JSON.parse(localStorage.getItem("todosList"));
    if (todosData && todosData.length > 0) {
      setTodos(todosData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((ele) => {
        if (ele.id === id) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return ele;
        }
      }),
    );
  };

  const completedCount = todos.filter((t) => t.isCompleted).length;

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      {/* Animated background */}
      <div className="min-h-screen bg-[#0a0a1a] py-10 px-4 relative overflow-hidden">
        {/* Background orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse delay-1000" />
          <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-fuchsia-600/10 blur-[100px] animate-pulse delay-500" />
        </div>

        <div className="relative w-full max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 uppercase tracking-widest mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Task Manager
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 tracking-tight">
              TICKSTACK
            </h1>
            {todos.length > 0 && (
              <p className="mt-2 text-white/40 text-sm">
                {completedCount} of {todos.length} tasks completed
              </p>
            )}
          </div>

          {/* Progress bar */}
          {todos.length > 0 && (
            <div className="mb-6">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(completedCount / todos.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Glass card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/40">
            {/* Form */}
            <div className="mb-6">
              <TodoForm />
            </div>

            {/* Divider */}
            {todos.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs uppercase tracking-widest">
                  {todos.length} {todos.length === 1 ? "Task" : "Tasks"}
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
            )}

            {/* Todo list */}
            <div className="flex flex-col gap-3">
              {todos.length > 0 ? (
                todos.map((ele, index) => (
                  <div
                    key={ele.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                  >
                    <TodoList todo={ele} />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">✦</div>
                  <p className="text-white/30 text-sm">Your canvas is empty. Add a task above.</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-white/20 text-xs mt-6 tracking-wide">
            Tasks are saved automatically
          </p>
        </div>
      </div>

      {/* Global animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.35s ease-out both;
        }
      `}</style>
    </TodoProvider>
  );
}

export default App;