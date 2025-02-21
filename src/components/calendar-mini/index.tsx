import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { generateCalendar } from "../../untils/generateCalendar"
import dayjs from "dayjs"
import { useMemo, useState } from "react"


const CalendarMini = () => {
    const [date, setDate] = useState<{
        month: number;
        year: number;
    }>({
        month: dayjs().month() + 1,
        year: dayjs().year()
    })
    const calendarsMini = useMemo(() => generateCalendar(date.year, date.month), [date])
    const currentDay = dayjs().format("DD-MM-YYYY")
    const currentMonthYear = dayjs(new Date(date.year, date.month - 1))

    const handleClickPrevious = () => {
        setDate({
            month: date.month === 1 ? 12 : date.month - 1,
            year: date.month === 1 ? date.year - 1 : date.year
        })
    }

    const handleClickNext = () => {
        setDate({
            month: date.month === 12 ? 1 : date.month + 1,
            year: date.month === 12 ? date.year + 1 : date.year
        })
    }
    return <div className="bg-white shadow rounded-[4px]">
        <div className="flex text-light-blue gap-x-6 justify-center items-center pt-8">
            <FaChevronLeft className="cursor-pointer" onClick={handleClickPrevious} />
            <h2 className="font-bold text-xl text-dark-blue min-w-[150px] text-center">
                {currentMonthYear.format("MMMM YYYY")}
            </h2>
            <FaChevronRight className="cursor-pointer" onClick={handleClickNext} />
        </div>
        <div className="px-[3.5rem] pb-2">
            <div className="grid grid-cols-7 text-xs text-center text-secondary-title font-mono my-4">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            {calendarsMini.map((row,idx) => {
                return <div
                    className="grid grid-cols-7 text-center text-dark-calendar-title font-mono my-4"
                    key={idx}
                >
                    {row.map((col) => {
                        const blurText = 'opacity-60'
                        const isToday = currentDay === col.date
                        return <div className="flex items-center justify-center" key={col.date}>
                            <p className={`flex items-center justify-center rounded-full w-5 h-5 p-4 text-xs ${col.isNextMonth || col.isPrevMonth ? blurText : ''} ${isToday ? 'bg-light-blue text-white' : ''}`}>{col.day}</p>
                        </div>
                    })}
                </div>
            })}
        </div>
    </div>
}


export default CalendarMini