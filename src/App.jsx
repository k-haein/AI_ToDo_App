import { useState, useEffect, useRef } from 'react';

const TodoItem = ({ 
  todo, 
  toggleTodo, 
  deleteTodo, 
  startEditing, 
  editingId, 
  editText, 
  setEditText, 
  saveEditing, 
  handleEditKeyDown, 
  editInputRef 
}) => (
  <div
    className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 mb-3 ${
      todo.completed
        ? 'bg-slate-50 border-slate-100 opacity-75'
        : 'bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
    }`}
  >
    <div className="flex items-center gap-3 flex-1 overflow-hidden">
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 group-hover:border-indigo-400'
        }`}
      >
        {todo.completed && (
          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      
      {editingId === todo.id ? (
        <input
          ref={editInputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={saveEditing}
          onKeyDown={handleEditKeyDown}
          className="flex-1 px-2 py-1 rounded border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 bg-white"
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && startEditing(todo)}
          className={`flex-1 truncate text-lg transition-all duration-300 cursor-pointer select-none ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
          title={!todo.completed ? "더블클릭하여 수정" : ""}
        >
          {todo.text}
        </span>
      )}
    </div>
    <button
      onClick={() => deleteTodo(todo.id)}
      className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-50 rounded-lg transform hover:scale-110"
      aria-label="삭제"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const editInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEditing = () => {
    if (!editText.trim()) {
      setEditingId(null);
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-10 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-slate-800 mb-8 text-center tracking-tight">To-Do List</h1>
          
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="할 일을 입력하세요"
              className="flex-1 px-5 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-500/30 active:scale-95 whitespace-nowrap"
            >
              일정등록
            </button>
          </form>

          <div className="space-y-6">
            {/* Active Todos */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">진행 중 ({activeTodos.length})</h2>
              <div className="space-y-1 min-h-[50px]">
                {activeTodos.length === 0 && completedTodos.length === 0 ? (
                  <p className="text-center text-slate-400 py-8 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    새로운 할 일을 등록해보세요!
                  </p>
                ) : activeTodos.length === 0 ? (
                  <p className="text-center text-slate-400 py-4 text-sm">모든 할 일을 완료했습니다! 🎉</p>
                ) : (
                  activeTodos.map((todo) => (
                    <TodoItem 
                      key={todo.id} 
                      todo={todo} 
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                      startEditing={startEditing}
                      editingId={editingId}
                      editText={editText}
                      setEditText={setEditText}
                      saveEditing={saveEditing}
                      handleEditKeyDown={handleEditKeyDown}
                      editInputRef={editInputRef}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Completed Todos */}
            {completedTodos.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 ml-1">완료됨 ({completedTodos.length})</h2>
                <div className="space-y-1">
                  {completedTodos.map((todo) => (
                    <TodoItem 
                      key={todo.id} 
                      todo={todo} 
                      toggleTodo={toggleTodo}
                      deleteTodo={deleteTodo}
                      startEditing={startEditing}
                      editingId={editingId}
                      editText={editText}
                      setEditText={setEditText}
                      saveEditing={saveEditing}
                      handleEditKeyDown={handleEditKeyDown}
                      editInputRef={editInputRef}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer Info */}
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between text-xs text-slate-400 font-medium">
          <span>더블클릭하여 수정</span>
          {todos.some(t => t.completed) && (
            <button 
              onClick={() => setTodos(todos.filter(t => !t.completed))}
              className="hover:text-red-500 transition-colors"
            >
              완료된 항목 전체 삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
