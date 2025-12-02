import { useState, useEffect } from 'react';

const TaskModal = ({ task, categories, onClose, onSave, onDelete, theme }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  useEffect(() => {
    setEditedTask({ ...task });
  }, [task]);

  const handleChange = (field, value) => {
    setEditedTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  if (!task) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm transition-colors duration-300 ${isDark ? 'bg-black/70' : 'bg-black/50'}`}>
      <div className={`w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-slate-200'}`}>
        <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-gray-700 bg-[#252526]' : 'border-slate-200 bg-slate-50'}`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>할 일 편집</h3>
          <button onClick={onClose} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>제목</label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              placeholder="할 일을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>카테고리</label>
              <select
                value={editedTask.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>중요도</label>
              <select
                value={editedTask.importance}
                onChange={(e) => handleChange('importance', e.target.value)}
                className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="루틴">루틴</option>
                <option value="긴급">긴급</option>
                <option value="높음">높음</option>
                <option value="보통">보통</option>
                <option value="낮음">낮음</option>
                <option value="보류">보류</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>진행 상태</label>
              <select
                value={editedTask.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              >
                <option value="접수">접수</option>
                <option value="진행중">진행중</option>
                <option value="대기중">대기중</option>
                <option value="완료">완료</option>
                <option value="미해결완료">미해결완료</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>D-Day (예: D-2)</label>
              <input
                type="text"
                value={editedTask.dDay || ''}
                onChange={(e) => handleChange('dDay', e.target.value)}
                className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                placeholder="D-Day 입력"
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>내용</label>
            <textarea
              value={editedTask.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className={`w-full border rounded p-2 focus:border-blue-500 focus:outline-none h-24 resize-none transition-colors ${isDark ? 'bg-[#2d2d2d] border-gray-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              placeholder="상세 내용을 입력하세요"
            />
          </div>

          <div className={`flex justify-between pt-4 border-t ${isDark ? 'border-gray-700' : 'border-slate-200'}`}>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className={`px-4 py-2 rounded transition-colors ${isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-500 hover:bg-red-50'}`}
            >
              삭제
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 rounded transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                취소
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors shadow-sm"
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
