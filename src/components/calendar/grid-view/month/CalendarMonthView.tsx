import { DayModel } from '../../../../models/day'
import DayItem from '../../day-item'

interface CalendarMonthViewProps {
  calendars: DayModel[][]
  onDayClick?: (day: DayModel) => void
  dayRender?: (day: DayModel) => React.ReactNode | null
}

const CalendarMonthView = ({
  calendars,
  dayRender,
  onDayClick
}: CalendarMonthViewProps) => {
  return (
    <>
      {/* Header */}
      <div className='grid grid-cols-7 text-center text-secondary-title font-bold mb-6'>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      {/* Days */}
      {calendars.map((row, rowIdx) => {
        return (
          <div className='grid grid-cols-7' key={rowIdx}>
            {row.map((col) => {
              return (
                <DayItem

                  key={col.date}
                  item={col}
                  rowIndex={rowIdx}
                  onDayClick={onDayClick}
                  dayRender={dayRender}
                />
              )
            })}
          </div>
        )
      })}
    </>
  )
}

export default CalendarMonthView
