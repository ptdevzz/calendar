import { useMemo, useState } from "react";
import { generateCalendar } from "../../untils/generateCalendar";

import { ControlCalendar } from "./control";
import DayItem from "./day-item";
import dayjs from "dayjs";
import { DayModel } from "../../models/day";

interface CalendarProps {
    onDayClick?: (day: DayModel) => void;
    dayRender?:(day:DayModel) => React.ReactNode | null;
}


const Calendar = ({ onDayClick,dayRender }: CalendarProps) => {
    const [date, setDate] = useState<{
        month: number;
        year: number;
    }>({
        month: dayjs().month() + 1,
        year: dayjs().year()
    })
    const calendars = useMemo(() => generateCalendar(date.year, date.month), [date])
        console.log(calendars);
        
    return <div className="bg-white rounded-[4px] shadow h-fit">
        <ControlCalendar
            date={date}
            setDate={setDate}
        />
        <div className="mt-8">
            {/* Header */}
            <div className="grid grid-cols-7 text-center text-secondary-title font-bold mb-6">
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
                return <div className="grid grid-cols-7">
                    {row.map((col) => {
                        return <DayItem key={col.date} item={col} rowIndex={rowIdx} onDayClick={onDayClick} dayRender={dayRender} />
                    })}
                </div>
            })}
        </div>
    </div>
}



export default Calendar