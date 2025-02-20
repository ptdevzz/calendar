import React from "react";

interface CalendarDayViewProps {
    date: {
        month: number;
        year: number
        day: number;
    }

    dayRender?: (start: number, date: {
        month: number;
        year: number
        day: number;
    }) => React.ReactNode | null;
}


const CalendarDayView = ({ dayRender, date }: CalendarDayViewProps) => {
    return (
        <div className="relative border-l-2 border-gray-300 pl-16">
            <div className="absolute top-[-10px] bottom-0 left-20 h-full border-r border-gray-300"></div>
            {[...Array(24)].map((_, index) => (
                <div key={index} className="relative h-12 border-t border-gray-200">
                    <span className="absolute -left-14 text-gray-500 text-sm">
                        {index === 0 ? '1 AM' : index > 11 ? `${index - 11} PM` : `${index + 1} AM`}
                    </span>
                    {dayRender?.(index + 1, date)}
                </div>
            ))}
        </div>
    );
};

export default CalendarDayView;
