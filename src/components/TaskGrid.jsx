import React, { useEffect, useRef, useState } from 'react';

const TaskGrid = ({ tasks, theme }) => {
  const gridRef = useRef(null);
  const sheetId = 'taskSheet';
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 이미 초기화되었으면 스킵
    if (isInitialized) return;

    const initSheet = () => {
      if (!window.IBSheet) return;

      // 이미 생성된 시트가 있다면 제거 (안전장치)
      if (window[sheetId]) {
        try {
          window[sheetId].dispose();
        } catch (e) {
          console.warn("Sheet dispose error:", e);
        }
      }

      // 매뉴얼에 따른 옵션 설정
      const options = {
        Cfg: {
            "ColorState": 7
        },
        // 각 열에 대한 정의
        Cols: [
          { 
            Header: "상태", 
            Name: "status", 
            Type: "Enum", 
            Align: "Center", 
            Width: 100,
            Enum: "|접수|진행중|대기중|완료|미해결완료",
            EnumKeys: "|접수|진행중|대기중|완료|미해결완료"
          },
          { 
            Header: "중요도", 
            Name: "importance", 
            Type: "Enum", 
            Align: "Center", 
            Width: 100,
            Enum: "|<i class='fa fa-circle' style='color: purple'></i> 루틴|<i class='fa fa-circle' style='color: red'></i> 긴급|<i class='fa fa-circle' style='color: orange'></i> 높음|<i class='fa fa-circle' style='color: blue'></i> 보통|<i class='fa fa-circle' style='color: gray'></i> 낮음|<i class='fa fa-circle' style='color: darkgray'></i> 보류",
            EnumKeys: "|루틴|긴급|높음|보통|낮음|보류"
          },
          { 
            Header: "카테고리", 
            Name: "category", 
            Type: "Text", 
            Align: "Center", 
            Width: 100 
          },
          { 
            Header: "제목", 
            Name: "title", 
            Type: "Lines", 
            RelWidth: 1, 
            MinWidth: 150 
          },
          { 
            Header: "내용", 
            Name: "content", 
            Type: "Lines", 
            RelWidth: 1, 
            MinWidth: 200 
          },
          { 
            Header: "D-Day", 
            Name: "dDay", 
            Type: "Text", 
            Align: "Center", 
            Width: 80 
          },
        ],
        // 이벤트 정의
        Events: {
          onRenderFirstFinish: (evt) => {
            console.log("IBSheet Rendered Successfully");
            setIsInitialized(true);
          }
        }
      };

      // IBSheet 생성
      console.log("Creating IBSheet with ID:", sheetId);
      
      // DOM이 확실히 렌더링된 후 생성
      setTimeout(() => {
        // 이미 생성된 시트가 있으면 스킵
        if (window[sheetId]) {
          console.log("Sheet already exists, skipping creation");
          setIsInitialized(true);
          return;
        }

        if (!gridRef.current) {
          console.error("Grid container ref is null");
          return;
        }
        
        try {
          window.IBSheet.create({
            id: sheetId,
            el: 'taskGridContainer', // DOM ID를 문자열로 전달
            options: options,
            data: tasks
          });
          console.log("IBSheet.create called");
        } catch (err) {
          console.error("IBSheet creation failed:", err);
        }
      }, 200);
    };

    // 스크립트 로드 확인 후 초기화
    if (window.IBSheet) {
      initSheet();
    } else {
      console.log("Waiting for IBSheet script...");
      const checkInterval = setInterval(() => {
        if (window.IBSheet) {
          clearInterval(checkInterval);
          console.log("IBSheet script loaded");
          initSheet();
        }
      }, 100);
      
      // 5초 후에도 로드 안되면 중단
      setTimeout(() => clearInterval(checkInterval), 5000);
    }

    return () => {
      if (window[sheetId]) {
        try {
          console.log("Disposing IBSheet");
          window[sheetId].dispose();
        } catch (e) {
          // dispose 중 에러 무시
        }
      }
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 데이터 변경 시 리로드
  useEffect(() => {
    if (window[sheetId]) {
      window[sheetId].loadSearchData(tasks);
    }
  }, [tasks]);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-hidden">
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
        카테고리 표 (IBSheet8)
      </h2>
      <div 
        className={`rounded-lg border ${theme === 'dark' ? 'bg-[#1e1e1e] border-gray-700' : 'bg-white border-slate-200'}`}
        style={{ height: '600px', width: '100%' }}
      >
        {/* 시트가 생성될 DIV 객체 */}
        <div id="taskGridContainer" ref={gridRef} style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default TaskGrid;
