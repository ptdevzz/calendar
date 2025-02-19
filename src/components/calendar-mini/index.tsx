import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { generateCalendar } from "../../untils/generateCalendar"
import dayjs from "dayjs"


const CalendarMini = () => {
    const calendarsMini = generateCalendar(2025, 2)
    const currentDay = dayjs().format("DD-MM-YYYY")
    return <div className="bg-white shadow rounded-[4px]">
        <div className="flex text-light-blue gap-x-6 justify-center items-center pt-8">
            <FaChevronLeft className="cursor-pointer" />
            <h2 className="font-bold text-xl text-dark-blue">
                April 2021
            </h2>
            <FaChevronRight className="cursor-pointer" />
        </div>
        <div className="px-[3.5rem] pb-2">
            <div className="grid grid-cols-7 text-xs text-center text-[#BEBFBE] font-mono my-4">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            {calendarsMini.map((row) => {
                return <div
                    className="grid grid-cols-7 text-center text-dark-calendar-title font-mono my-4"
                >
                    {row.map((col) => {
                        const blurText = 'opacity-60'
                        const isToday = currentDay === col.date
                        return <div className="flex items-center justify-center">
                            <p className={`flex items-center justify-center rounded-full w-5 h-5 p-4 text-xs ${col.isNextMonth || col.isPrevMonth ? blurText : ''} ${isToday ? 'bg-light-blue text-white' : ''}`}>{col.day}</p>
                        </div>
                    })}
                </div>
            })}
        </div>
    </div>
}


export default CalendarMini