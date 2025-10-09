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
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
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

  const isSelected = (day: number) => {
    return selectedDate === day;
  };

  const handlePreviousMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
    setShowForm(false);
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
    setShowForm(false);
  };

  const handleDateClick = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(selectedDate === day ? null : day);
    setShowForm(false);
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(!showForm);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedOption && email) {
      // Reset form
      setSelectedDate(null);
      setSelectedOption('');
      setEmail('');
      setShowForm(false);
    }
  };

  const handleBackToCalendar = () => {
    setShowForm(false);
    setSelectedOption('');
    setEmail('');
  };

  return (
    <div
      key={item.id}
      className="grid-box calendar-box"
      onClick={() => onSectionChange('Calendar')}
    >
      <div className="box-header">
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
              className={`calendar-day ${isToday(dayNumber) ? 'today' : ''} ${isSelected(dayNumber) ? 'selected' : ''}`}
              onClick={(e) => handleDateClick(dayNumber, e)}
            >
              <span>{dayNumber}</span>
            </div>
          );
        })}
        
        {/* Fill remaining cells to complete 7 rows */}
        {Array.from({ length: 42 - daysInMonth - (startDay - 1) }, (_, i) => {
          const isLastCell = i === (42 - daysInMonth - (startDay - 1) - 1);

          return (
            <div
              key={`fill-${i}`}
              className={`calendar-day empty ${isLastCell ? 'arrow-cell' : ''}`}
              onClick={selectedDate && isLastCell ? handleArrowClick : undefined}
            >
              {isLastCell && <span>→</span>}
            </div>
          );
        })}
      </div>

      {/* Modal overlay */}
      {showForm && selectedDate && (
        <div className="calendar-modal-overlay">
          <div className="calendar-modal">
            <div className="modal-header">
              <h4>Book a meeting for {months[currentMonth]} {selectedDate}</h4>
              <button className="modal-close" onClick={handleBackToCalendar}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-options">
                <label className="form-option">
                  <input 
                    type="radio" 
                    name="meeting-type" 
                    value="coffee"
                    checked={selectedOption === 'coffee'}
                    onChange={() => handleOptionSelect('coffee')}
                  />
                  <span>Let's get a coffee</span>
                </label>
                <label className="form-option">
                  <input 
                    type="radio" 
                    name="meeting-type" 
                    value="strategize"
                    checked={selectedOption === 'strategize'}
                    onChange={() => handleOptionSelect('strategize')}
                  />
                  <span>Let's strategize</span>
                </label>
              </div>
              
              <div className="email-input">
                <label htmlFor="email">Email address:</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="form-buttons">
                <button type="button" onClick={handleBackToCalendar} className="back-button">
                  Back
                </button>
                <button type="submit" className="submit-button" disabled={!selectedOption || !email}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

