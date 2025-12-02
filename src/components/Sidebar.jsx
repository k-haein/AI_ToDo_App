import { useState } from 'react';

const Sidebar = ({ memos, setMemos, theme }) => {
  const [isOpen, setIsOpen] = useState(true);

  const addMemo = () => {
    const newMemo = {
      id: Date.now(),
      title: '새 메모',
      content: '',
      expanded: true,
    };
    setMemos([...memos, newMemo]);
  };

  const updateMemo = (id, field, value) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, [field]: value } : memo
    ));
  };

  const toggleMemo = (id) => {
    setMemos(memos.map(memo => 
      memo.id === id ? { ...memo, expanded: !memo.expanded } : memo
    ));
  };

  const deleteMemo = (id) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  const isDark = theme === 'dark';

  return (
    <div className={`w-80 border-r flex flex-col h-full transition-colors duration-300 ${isDark ? 'bg-[#1e1e1e] border-gray-800 text-gray-300' : 'bg-white border-slate-200 text-slate-700'}`}>
      <div className={`p-4 border-b flex justify-between items-center ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">📝</span>
          <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>TO-DO 12월 1주</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {memos.map(memo => (
          <div key={memo.id} className={`rounded-lg overflow-hidden border shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#2d2d2d] border-gray-700 shadow-none' : 'bg-slate-50 border-slate-200'}`}>
            <div 
              className={`p-3 flex justify-between items-center cursor-pointer transition-colors ${isDark ? 'bg-[#3d3d3d] hover:bg-[#4d4d4d]' : 'bg-slate-100 hover:bg-slate-200'}`}
              onClick={() => toggleMemo(memo.id)}
            >
              <div className="flex items-center gap-2">
                <span className={`transform transition-transform ${memo.expanded ? 'rotate-90' : ''}`}>▶</span>
                <input 
                  type="text" 
                  value={memo.title}
                  onChange={(e) => updateMemo(memo.id, 'title', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className={`bg-transparent border-none focus:outline-none font-bold w-full ${isDark ? 'text-orange-400' : 'text-indigo-600'}`}
                />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteMemo(memo.id); }}
                className={`hover:text-red-500 ${isDark ? 'text-gray-500 hover:text-red-400' : 'text-slate-400'}`}
              >
                ×
              </button>
            </div>
            
            {memo.expanded && (
              <div className="p-3">
                <textarea
                  value={memo.content}
                  onChange={(e) => updateMemo(memo.id, 'content', e.target.value)}
                  className={`w-full h-32 bg-transparent resize-none focus:outline-none text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}
                  placeholder="메모를 입력하세요..."
                />
              </div>
            )}
          </div>
        ))}
        
        <button 
          onClick={addMemo}
          className={`w-full py-2 border-2 border-dashed rounded-lg transition-all ${isDark ? 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-400' : 'border-slate-300 text-slate-500 hover:border-indigo-400 hover:text-indigo-500'}`}
        >
          + 메모 추가
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
