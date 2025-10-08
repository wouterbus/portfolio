import { useState } from 'react';
import './CalendarBox.css';

interface CalendarBoxProps {
  item: {
    id: string;
    number?: string;
    title: string;
  };
  onSectionChange: (section: string) => void;
}

export default function CalendarBox({ item, onSectionChange }: CalendarBoxProps) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  
  // Get days in current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Convert Sunday (0) to Monday (1) start
  const startDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
  
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const handlePreviousMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div
      key={item.id}
      className="grid-box calendar-box"
      onClick={() => onSectionChange('Calendar')}
    >
      <div className="box-header header">
        <h3 className="box-number">{item.number}</h3>
        <h3 
          className="calendar-title"
          data-month={`${months[currentMonth]} ${currentYear}`}
        >
          <div className="nav-arrow left" onClick={handlePreviousMonth}>
            <span>←</span>
          </div>
          <div className="nav-arrow right" onClick={handleNextMonth}>
            <span>→</span>
          </div>
        </h3>
      </div>
      <div className="calendar-grid">
        {/* Day headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {/* Empty cells for offset */}
        {Array.from({ length: startDay - 1 }, (_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        
        {/* Days of the month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const dayNumber = i + 1;
          
          return (
            <div 
              key={i} 
              className={`calendar-day ${isToday(dayNumber) ? 'today' : ''}`}
            >
              <span>{dayNumber}</span>
            </div>
          );
        })}
        
        {/* Fill remaining cells to complete 7 rows */}
        {Array.from({ length: 42 - daysInMonth - (startDay - 1) }, (_, i) => (
          <div key={`fill-${i}`} className="calendar-day empty"></div>
        ))}
      </div>
    </div>
  );
}

