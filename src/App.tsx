import { useMemo, useState } from 'react'
import './App.css'
import Calendar from './components/calendar'
import CalendarMini from './components/calendar-mini'
import Modal from './components/common/modal'
import EventList from './components/event-list'
import data from './data/event.json'
import { CalendarDay, EventModel } from './models/event'
import Event from './components/event'
import { useForm } from 'react-hook-form'
import { RRule } from 'rrule'
import dayjs from 'dayjs'
import { EventDay } from './components/event-day'
function App() {
  const [openModal, setOpenModal] = useState<{
    date: string | null
    isOpen: boolean
  }>({
    date: null,
    isOpen: false
  })
  const [events, setEvents] = useState<CalendarDay[]>(data as CalendarDay[])
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const today = dayjs().format('DD-MM-YYYY')
  const eventsToDay = events.find((e) => e.date === today)

  const eventsByDate = useMemo(() => {
    return events.reduce<{ [key: string]: EventModel[] }>((prev, curr) => {
      if (curr.date in prev) {
        return prev
      }
      prev[curr.date] = curr.events
      return {
        ...prev
      }
    }, {})
  }, [events])

  // const tes = test()
  console.log(eventsByDate)
  const onSubmit = (values) => {
    console.log(values)

    if (openModal.date) {
      if (openModal.date in eventsByDate) {
        const newEvent = [...events].map((event) => {
          if (event.date === openModal.date) {
            return {
              ...event,
              events: [...event.events, ...[values]]
            }
          }
          return { ...event }
        })
        setEvents([...newEvent])
      } else {
        const newEvent = {
          date: openModal.date,
          events: [values]
        }
        setEvents([...events, ...[newEvent]])
      }
    }
    reset()
    setOpenModal({
      date: null,
      isOpen: false
    })
  }

  function generateRecurringEvents(
    event: EventModel,
    rule: 'weekly' | 'daily' | 'yearly' | 'monthly'
  ) {
    const rruleOptions = {
      freq:
        rule === 'daily'
          ? RRule.DAILY
          : rule === 'weekly'
          ? RRule.WEEKLY
          : rule === 'monthly'
          ? RRule.MONTHLY
          : RRule.YEARLY,
      dtstart: new Date('2025-02-11'),
      until: undefined,
      count: 30
    }
    console.log(event, rruleOptions)

    const ruleInstance = new RRule(rruleOptions)
    const occurrences = ruleInstance.all()

    return occurrences.map((occurrence) => {
      return dayjs(occurrence).format('DD-MM-YYYY')
    })
  }

  return (
    <div className='bg-calendar-title'>
      <Modal
        isOpen={openModal.isOpen}
        onClose={() => {
          setOpenModal({
            date: null,
            isOpen: false
          })
          reset()
        }}
        onSave={() => {
          handleSubmit(onSubmit)()
        }}
      >
        <h2 className='text-xl font-semibold mb-4'>Create Event</h2>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            placeholder='Event Title'
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('title', { required: 'Event title is required' })}
          />
          {errors.title && (
            <span className='text-red-500 text-sm'>
              {errors.title.message as string}
            </span>
          )}

          <input
            type='text'
            placeholder='Location'
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && (
            <span className='text-red-500 text-sm'>
              {errors.location.message as string}
            </span>
          )}

          <input
            type='time'
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('time')}
          />
          {errors.location && (
            <span className='text-red-500 text-sm'>
              {errors.location.message as string}
            </span>
          )}

          <textarea
            placeholder='Description'
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('description')}
          />

          <select
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('type')}
          >
            <option value='none'>Appointment</option>
            <option value='daily'>Event</option>
          </select>

          {/* <select
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('recurrence')}
          >
            <option value='none'>Does not repeat</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </select> */}
        </form>
      </Modal>
      <div className='md:container mx-auto md:p-10 p-4 gap-y-6'>
        <div className='md:grid md:grid-cols-[30%_70%] md:gap-x-4 '>
          <div className='flex flex-col gap-y-1'>
            <CalendarMini />
            <EventList event={eventsToDay} />
          </div>
          <Calendar
            onDayClick={(day) => {
              setOpenModal({
                date: day.date,
                isOpen: true
              })
            }}
            monthViewRender={(dayItem) => {
              if (dayItem.date in eventsByDate) {
                const eventList = eventsByDate[dayItem.date]

                return eventList.map((v) => (
                  <Event title={v.title} key={v.id} />
                ))
              }
              return null
            }}
            dayViewRender={(start, date) => {
              const dateFormat = dayjs(
                new Date(date.year, date.month - 1, date.day)
              ).format('DD-MM-YYYY')
              const events = eventsByDate[dateFormat]

              return events?.map((e) => {
                const startTime = Number(e.time?.split(':')?.[0] || 0)
                return startTime === start && <EventDay event={e} key={e.id} />
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
