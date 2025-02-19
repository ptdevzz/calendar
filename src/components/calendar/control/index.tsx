import { Button } from "../../button"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Select } from "../../select";


export const ControlCalendar = () => {
    return <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-x-6">
            <Button buttonType="primary">
                Today
            </Button>
            <div className="flex text-light-blue gap-x-6">
                <FaChevronLeft className="cursor-pointer" />
                <FaChevronRight className="cursor-pointer" />
            </div>
            <h2 className="font-bold text-xl text-dark-blue">
                April 2021
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