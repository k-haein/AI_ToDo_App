import React from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = ({ categories, tasks, onTaskClick, onAddPage, theme }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`flex-1 overflow-x-auto overflow-y-hidden p-6 transition-colors duration-300 ${isDark ? 'bg-[#1e1e1e]' : 'bg-slate-50'}`}>
      <div className="flex gap-4 h-full min-w-max">
        {categories.map(category => {
          const categoryTasks = tasks.filter(task => task.category === category);
          
          return (
            <div key={category} className="w-72 flex flex-col h-full">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold 
                    ${category === '업무' ? (isDark ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') : 
                      category === '부업' ? (isDark ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800') :
                      category === '결혼' ? (isDark ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800') :
                      category === '개인' ? (isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                      category === '살림' ? (isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                      (isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700')}`}>
                    {category}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{categoryTasks.length}</span>
                </div>
              </div>

              {/* Tasks Area */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {categoryTasks.map(task => (
                  <TaskCard 
                    key={task.id} 
                    task={task} 
                    onClick={onTaskClick} 
                    theme={theme}
                  />
                ))}
                
                <button 
                  onClick={() => onAddPage(category)}
                  className={`w-full py-2 mt-2 text-left px-3 rounded transition-colors text-sm ${isDark ? 'text-gray-500 hover:bg-[#2d2d2d]' : 'text-slate-500 hover:bg-slate-200'}`}
                >
                  + 새 페이지
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Add Category Button Placeholder */}
        <div className="w-72 flex items-start justify-center pt-10 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span className={isDark ? 'text-gray-500' : 'text-slate-500'}>+ 카테고리 추가</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
