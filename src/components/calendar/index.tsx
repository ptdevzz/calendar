import { useMemo, useState } from "react";
import { generateCalendar } from "../../untils/generateCalendar";

import dayjs from "dayjs";
import { DayModel } from "../../models/day";
import CalendarMonthView from "./grid-view/month/CalendarMonthView";
import CalendarDayView from "./grid-view/day/CalendarDayView";
import { ControlMonthView } from "./control/month";
import { ControlDayView } from "./control/day";

interface CalendarProps {
    onDayClick?: (day: DayModel) => void;
    monthViewRender?: (day: DayModel) => React.ReactNode | null;
    dayViewRender?: (start: number, date: {
        month: number;
        year: number;
        day: number;
    }) => React.ReactNode | null
}

const Calendar = ({ onDayClick, monthViewRender, dayViewRender }: CalendarProps) => {
    const [viewMode, setViewMode] = useState<"day" | "month">('month')
    const [date, setDate] = useState<{
        month: number;
        year: number;
        day: number;
    }>({
        month: dayjs().month() + 1,
        year: dayjs().year(),
        day: dayjs().date()
    })
    const calendars = useMemo(() => generateCalendar(date.year, date.month), [date])
    const gridViewCpn: { [key: string]: { control: React.ReactNode; view: React.ReactNode } } = {
        day: {
            control: <ControlDayView date={date} setDate={setDate} setViewMode={setViewMode} viewMode={viewMode} />,
            view: <CalendarDayView dayRender={dayViewRender} date={date} />
        },
        month: {
            control: <ControlMonthView date={date} setDate={setDate} setViewMode={setViewMode} viewMode={viewMode} />,
            view: <CalendarMonthView calendars={calendars} dayRender={monthViewRender} onDayClick={onDayClick} />
        }
    }

    return <div className="bg-white rounded-[4px] shadow h-fit">
        {gridViewCpn[viewMode].control}
        <div className="">
            {gridViewCpn[viewMode].view}
        </div>
    </div>
}



export default Calendar