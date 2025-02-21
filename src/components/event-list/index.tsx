import dayjs from "dayjs"
import { CalendarDay } from "../../models/event"
import { Button } from "../common/button"
import EventItem from "./event-item"
interface EventListProps {
    event?: CalendarDay
}

const EventList = ({ event }: EventListProps) => {
    const today = dayjs().format("dddd, D MMM ")
    return <div className="bg-white shadow rounded-[4px] p-6">
        <div className="flex items-center justify-between">
            <h4 className="text-2xl text-dark-blue font-bold">Upcoming Events</h4>
            <Button buttonType="secondary">
                View All
            </Button>
        </div>
        <p className="font-medium text-xl text-secondary-title">{today}</p>
        <ul className="mt-6">
            {event?.events?.map((e) => <EventItem type={e.status} key={e.id} event={e} />)}
        </ul>
    </div>
}


export default EventList 