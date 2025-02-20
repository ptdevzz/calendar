import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { SetStateAction } from "react";
import dayjs from "dayjs";
import { Button } from "../../../common/button";
import { Select } from "../../../common/select";
interface ControlCalendarProps {
    setDate: React.Dispatch<SetStateAction<{
        month: number;
        year: number
        day: number;
    }>>
    date: {
        month: number;
        year: number
        day: number;
    }
    setViewMode: React.Dispatch<React.SetStateAction<"day" | "month">>
    viewMode: "day" | "month"
}



export const ControlMonthView = ({ setDate, date, setViewMode, viewMode }: ControlCalendarProps) => {

    const currentDate = dayjs()

    const daySelected = dayjs(new Date(date.year, date.month - 1))

    const handleClickToday = () => {
        setDate({
            ...date,
            month: currentDate.month() + 1,
            year: currentDate.year()
        })
    }

    const handleClickPrevious = () => {
        const newDate = daySelected.subtract(1, 'month')
        setDate({
            ...date,
            month: newDate.month() + 1,
            year: newDate.year()
        })
    }

    const handleClickNext = () => {
        const newDate = daySelected.add(1, 'month')
        setDate({
            ...date,
            month: newDate.month() + 1,
            year: newDate.year()
        })
    }

    return <div className="flex items-center justify-between p-6 flex-wrap gap-y-4">
        <div className="flex items-center gap-x-6">
            <Button buttonType="primary" onClick={handleClickToday}>
                Today
            </Button>
            <div className="flex text-light-blue gap-x-6">
                <FaChevronLeft className="cursor-pointer" onClick={handleClickPrevious} />
                <FaChevronRight className="cursor-pointer" onClick={handleClickNext} />
            </div>
            <h2 className="font-bold text-xl text-dark-blue">
                {daySelected.format("MMMM YYYY")}
            </h2>
        </div>
        <div>
            <Select
                onChange={(e) => {
                    setViewMode(e.target.value as "month" | "day")
                }}
                value={viewMode}
                options={[{
                    label: 'Month',
                    value: 'month'
                },
                {
                    label: 'Day',
                    value: 'day'
                }]}
            />
        </div>
    </div>
}