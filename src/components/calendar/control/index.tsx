import { Button } from "../../common/button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Select } from "../../common/select";
import { SetStateAction } from "react";
import dayjs from "dayjs";
interface ControlCalendarProps {
    setDate: React.Dispatch<SetStateAction<{
        month: number;
        year: number
    }>>
    date: {
        month: number;
        year: number
    }
}



export const ControlCalendar = ({ setDate, date }: ControlCalendarProps) => {

    const currentDate = dayjs()

    const currentMonthYear = dayjs(new Date(date.year, date.month - 1))

    const handleClickToday = () => {
        setDate({
            month: currentDate.month() + 1,
            year: currentDate.year()
        })
    }

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
                {currentMonthYear.format("MMMM YYYY")}
            </h2>
        </div>
        <div>
            <Select
                options={[{
                    label: 'Month',
                    value: 'month'
                }]}
            />
        </div>
    </div>
}