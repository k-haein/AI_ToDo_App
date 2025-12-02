import React from 'react';

const getStatusColors = (isDark) => ({
  '접수': `border-l-4 border-l-gray-500 ${isDark ? 'bg-[#252526]' : 'bg-white'}`,
  '진행중': `border-l-4 border-l-blue-500 ${isDark ? 'bg-[#252526]' : 'bg-white'}`,
  '대기중': `border-l-4 border-l-yellow-500 ${isDark ? 'bg-[#252526]' : 'bg-white'}`,
  '완료': `border-l-4 border-l-green-500 opacity-70 ${isDark ? 'bg-[#1e1e1e]' : 'bg-slate-50'}`,
  '미해결완료': `border-l-4 border-l-red-500 opacity-70 ${isDark ? 'bg-[#1e1e1e]' : 'bg-slate-50'}`,
});

const getImportanceBadges = (isDark) => ({
  '루틴': isDark ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
  '긴급': isDark ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
  '높음': isDark ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
  '보통': isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
  '낮음': isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700',
  '보류': isDark ? 'bg-gray-800 text-gray-500' : 'bg-gray-300 text-gray-600',
});

const TaskCard = ({ task, onClick, theme }) => {
  const isDark = theme === 'dark';
  const statusColors = getStatusColors(isDark);
  const importanceBadges = getImportanceBadges(isDark);

  const statusClass = statusColors[task.status] || statusColors['접수'];
  const importanceClass = importanceBadges[task.importance] || importanceBadges['보통'];

  return (
    <div 
      onClick={() => onClick(task)}
      className={`p-3 mb-2 rounded-md shadow-sm cursor-pointer hover:shadow-md transition-all ${statusClass} border ${isDark ? 'border-gray-700 hover:bg-[#2a2d2e]' : 'border-slate-200 hover:bg-slate-50'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] px-1.5 py-0.5 rounded ${importanceClass} font-medium`}>
          {task.importance}
        </span>
        {task.dDay && (
          <span className={`text-[10px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-400'}`}>
            {task.dDay}
          </span>
        )}
      </div>
      
      <h4 className={`text-sm font-medium ${task.status === '완료' || task.status === '미해결완료' ? (isDark ? 'text-gray-500' : 'text-slate-400') + ' line-through' : (isDark ? 'text-gray-200' : 'text-slate-800')}`}>
        {task.title}
      </h4>
      
      {task.content && (
        <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
          {task.content}
        </p>
      )}
    </div>
  );
};

export default TaskCard;
