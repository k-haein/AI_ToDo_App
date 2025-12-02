import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import TaskGrid from './components/TaskGrid';

const DEFAULT_CATEGORIES = ['업무', '부업', '결혼', '개인', '살림', '가족'];

function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // View Mode State
  const [viewMode, setViewMode] = useState('kanban');

  // Apply Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggling theme. Current:', theme);
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // State for Tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  // State for Memos
  const [memos, setMemos] = useState(() => {
    const saved = localStorage.getItem('kanban_memos');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: '업무 메모', content: '- 영업정보시스템 개발건\n- 하나은행 기업뱅킹 이슈', expanded: true }
    ];
  });

  // State for Categories
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('kanban_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('kanban_memos', JSON.stringify(memos));
  }, [memos]);

  useEffect(() => {
    localStorage.setItem('kanban_categories', JSON.stringify(categories));
  }, [categories]);

  // Handlers
  const handleTaskClick = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleAddPage = (category) => {
    const newTask = {
      id: Date.now(),
      title: '',
      category: category,
      importance: '보통',
      status: '접수',
      content: '',
      dDay: '',
    };
    setCurrentTask(newTask);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task) => {
    if (!task.title.trim()) return; 

    setTasks(prev => {
      const exists = prev.find(t => t.id === task.id);
      if (exists) {
        return prev.map(t => t.id === task.id ? task : t);
      } else {
        return [...prev, task];
      }
    });
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <div className={theme}>
      <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Sidebar */}
        <Sidebar memos={memos} setMemos={setMemos} theme={theme} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header / Toolbar */}
          <div className={`h-14 border-b flex items-center justify-between px-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#1e1e1e] border-gray-800' : 'bg-white border-slate-200'}`}>
            <div className={`flex gap-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              <button 
                onClick={() => {
                  console.log("Switching to Kanban view");
                  setViewMode('kanban');
                }}
                className={`transition-colors ${viewMode === 'kanban' ? (theme === 'dark' ? 'text-white font-bold' : 'text-slate-900 font-bold') : (theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-800')}`}
              >
                📅 카테고리 칸반
              </button>
              <button 
                onClick={() => {
                  console.log("Switching to Grid view");
                  setViewMode('grid');
                }}
                className={`transition-colors ${viewMode === 'grid' ? (theme === 'dark' ? 'text-white font-bold' : 'text-slate-900 font-bold') : (theme === 'dark' ? 'hover:text-white' : 'hover:text-slate-800')}`}
              >
                田 카테고리 표
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors text-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-100'}`}
                title={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button 
                onClick={() => handleAddPage(categories[0])}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors shadow-sm"
              >
                새로 만들기
              </button>
            </div>
          </div>

          {/* Content Area */}
          {viewMode === 'kanban' ? (
            <KanbanBoard 
              categories={categories} 
              tasks={tasks} 
              onTaskClick={handleTaskClick}
              onAddPage={handleAddPage}
              theme={theme}
            />
          ) : (
            <TaskGrid 
              tasks={tasks}
              theme={theme}
            />
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <TaskModal 
            task={currentTask} 
            categories={categories}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTask}
            onDelete={handleDeleteTask}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}

export default App;
