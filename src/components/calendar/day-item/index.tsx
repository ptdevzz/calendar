import dayjs from "dayjs"
import { DayModel } from "../../../models/day"


interface DayItemProps {
    item: DayModel
    rowIndex: number
}


const Event = () => {
    const statusClass = {
        confirmed: 'bg-light-orange text-light-blue before:bg-dark-blue',
        pending: 'bg-dark-orange text-dark-blue before:bg-light-blue',
        cancel: 'bg-dark-blue text-gray-300 before:bg-dark-orange'
    }
    return <div className={`mb-1 p-1 pl-2 py-[6px] rounded-md relative before:absolute before:w-1 before:h-full before:top-0 before:left-0 overflow-hidden ${statusClass['cancel']}`}>
        <p className="text-xs line-clamp-1">First session with asdsad ad asd</p>
    </div>
}

const DayItem = ({ item, rowIndex }: DayItemProps) => {
    const isToday = dayjs().format("DD-MM-YYYY") === item.date

    const todayClass = 'bg-dark-blue text-white'
    return <div className={`h-[8rem] border border-calendar-title ${rowIndex === 0 ? 'border-t-2' : ''}`}>
        <div className="flex items-center justify-center">
            <p className={`text-center ${item.isNextMonth || item.isPrevMonth ? 'text-[#d1dfd8]' : 'text-dark-calendar-title'}  ${isToday ? todayClass : ''} w-8 h-8 p-1 rounded-full flex items-center justify-center`}>{item.day}</p>
        </div>
        <div className="h-[75%] overflow-auto  
        [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:bg-dark-blue"
        >
            <Event />
            <Event />

        </div>
    </div>
}





export default DayItem