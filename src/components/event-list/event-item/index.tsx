import { EVENT_TYPE } from '../../../constant'
import { EventModel, EventType } from '../../../models/event'

interface EventItemProps {
  type: EventType
  event: EventModel
}

const EventItem = ({ type, event }: EventItemProps) => {

  const time = Number(event?.time?.split(':')?.[0] || 0)
  const classByType = {
    [EVENT_TYPE.CONFIRM]: {
      wrapper: 'bg-light-orange text-light-blue before:bg-dark-blue',
      title: 'text-dark-blue',
      time: 'text-dark-blue',
      link: 'text-light-blue',
      beforeWrapper: 'before:bg-dark-blue'
    },
    [EVENT_TYPE.PENDING]: {
      wrapper: 'bg-dark-orange text-dark-blue before:bg-light-blue',
      title: 'text-dark-blue',
      time: 'text-dark-blue',
      link: 'text-light-blue',
      beforeWrapper: 'before:bg-dark-blue'
    },
    [EVENT_TYPE.CANCEL]: {
      wrapper: 'bg-light-blue text-light-blue before:bg-dark-blue',
      title: 'text-gray-200',
      time: 'text-gray-300',
      link: 'text-gray-300',
      beforeWrapper: 'before:bg-dark-orange'
    }
  }

  return (
    <li
      className={`mb-1 p-1 pl-6 py-6 rounded-lg relative before:absolute before:w-2  before:h-full before:top-0 before:left-0 overflow-hidden ${classByType?.[type]?.wrapper} ${classByType?.[type]?.beforeWrapper}`}
    >
      <div>
        <div>
          <p
            className={`text-lg line-clamp-1 ${classByType?.[type]?.title} text-wrap font-medium`}
          >
            {event.title}
          </p>
          <p className={`mt-2 font-light ${classByType?.[type]?.time}`}>
            {event.time} {time > 12 ? 'PM' : 'AM'}
          </p>
        </div>
        <div></div>
      </div>
      <div className='flex items-center gap-x-2 mt-4'>
        <img
          src='https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid'
          className='w-10 h-10 rounded-full'
        />
        <span
          className={`text-md underline cursor-pointer ${classByType?.[type]?.link}`}
        >
          View Client Profile
        </span>
      </div>
    </li>
  )
}

export default EventItem
