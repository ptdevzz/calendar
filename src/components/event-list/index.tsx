import { Button } from "../button"



const EventList = () => {
    return <div className="bg-white shadow rounded-[4px] p-6">
        <div className="flex items-center justify-between">
            <h4 className="text-2xl text-dark-blue">Upcoming Events</h4>
            <Button buttonType="secondary">
                View All
            </Button>
        </div>
    </div>
}


export default EventList 