import dayjs from "dayjs"
import { DayModel } from "../../../models/day"


interface DayItemProps {
    item: DayModel
    rowIndex: number
    onDayClick?: (day: DayModel) => void;
    dayRender?: (day: DayModel) => React.ReactNode | null;
}





const DayItem = ({ item, rowIndex, onDayClick, dayRender }: DayItemProps) => {
    const isToday = dayjs().format("DD-MM-YYYY") === item.date
    const todayClass = 'bg-dark-blue text-white'

    

    return <div className={`h-[8rem] border border-calendar-title ${rowIndex === 0 ? 'border-t-2' : ''}`} onClick={() => {
        onDayClick?.(item)
    }}>
        <div className="flex items-center justify-center">
            <p className={`text-center ${item.isNextMonth || item.isPrevMonth ? 'text-[#d1dfd8]' : 'text-dark-calendar-title'}  ${isToday ? todayClass : ''} w-8 h-8 p-1 rounded-full flex items-center justify-center`}>{item.day}</p>
        </div>
        <div className="h-[75%] overflow-auto  
        [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-dark-blue"
        >
            {dayRender?.(item)}
        </div>
    </div>
}





export default DayItem