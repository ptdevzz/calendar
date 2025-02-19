import { EVENT_TYPE } from "../../constant"
import { Button } from "../common/button"
import EventItem from "./event-item"



const EventList = () => {
    return <div className="bg-white shadow rounded-[4px] p-6">
        <div className="flex items-center justify-between">
            <h4 className="text-2xl text-dark-blue font-bold">Upcoming Events</h4>
            <Button buttonType="secondary">
                View All
            </Button>
        </div>
        <p className="font-medium text-xl text-secondary-title">Today, 4 Apr</p>
        <ul className="mt-6">
            <EventItem type={EVENT_TYPE.CONFIRM} />
            <EventItem type={EVENT_TYPE.PENDING} />
            <EventItem type={EVENT_TYPE.CANCEL} />
        </ul>
    </div>
}


export default EventList 