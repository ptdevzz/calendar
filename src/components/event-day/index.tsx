import { EventModel } from "../../models/event"


interface EventDayProps {
    event: EventModel
}

export const EventDay = ({ event }: EventDayProps) => {
    return <div
        className="ml-4 bg-blue-500 text-white p-2 rounded-md shadow-md"
        style={{ top: "4px", height: "44px" }}
    >
        <p className="text-xs">{event.title}</p>
        <p className="text-xs font-semibold">{event.time}</p>
    </div>
}