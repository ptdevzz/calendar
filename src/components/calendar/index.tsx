import { generateCalendar } from "../../untils/generateCalendar";

import { ControlCalendar } from "./control";
import DayItem from "./day-item";



const Calendar = () => {
    const calendars = generateCalendar(2025, 2)

    return <div className="bg-white rounded-[4px] shadow">
        <ControlCalendar />
        <div className="mt-8">
            {/* Header */}
            <div className="grid grid-cols-7 text-center text-[#BEBFBE] font-bold mb-6">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            {/* Days */}
            {calendars.map((row,rowIdx) => {
                return <div className="grid grid-cols-7">
                    {row.map((col) => {
                        return <DayItem key={col.date} item={col} rowIndex={rowIdx} />
                    })}
                </div>
            })}
        </div>
    </div>
}



export default Calendar