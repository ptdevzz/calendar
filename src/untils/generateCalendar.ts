import dayjs from "dayjs";
import { DayModel } from "../models/day";



export const generateCalendar = (year: number, month: number): DayModel[][] => {
    const currentDate = dayjs(new Date(year, month - 1, 1))
    const startDay = currentDate.day();
    const totalDaysInMonth = currentDate.daysInMonth();

    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    const previousDate = dayjs(new Date(previousYear, previousMonth, 0));
    const totalDaysInPreviousMonth = previousDate.daysInMonth();

    const nextMonth = month === 11 ? month + 1 : month - 1
    const nextYear = month === 11 ? year + 1 : year



    const calendar: DayModel[][] = [];

    let currentDay = 1;
    let prevMonthDay = totalDaysInPreviousMonth - startDay + 1;
    let nextMonthDay = 1;


    for (let i = 0; i < 6; i++) {
        const week: DayModel[] = [];

        for (let j = 0; j < 7; j++) {
            let dayInfo = { isPrevMonth: false, isCurrentMonth: false, isNextMonth: false, day: 0, date: '' };
            if (i === 0 && j < startDay) {

                const dateStr = dayjs(new Date(previousYear, previousMonth - 1, prevMonthDay)).format("DD-MM-YYYY")
                dayInfo.isPrevMonth = true;
                dayInfo.day = prevMonthDay++;
                dayInfo.date = dateStr;
            } else if (currentDay <= totalDaysInMonth) {
                const dateStr = dayjs(new Date(year, month - 1, currentDay)).format("DD-MM-YYYY")
                dayInfo.isCurrentMonth = true;
                dayInfo.day = currentDay++;
                dayInfo.date = dateStr
            } else {
                const dateStr = dayjs(new Date(nextYear, nextMonth, nextMonthDay)).format("DD-MM-YYYY")
                dayInfo.isNextMonth = true;
                dayInfo.day = nextMonthDay;
                dayInfo.date = dateStr
                nextMonthDay++;
            }

            week.push(dayInfo);
        }

        calendar.push(week);
    }

    return calendar;
}

