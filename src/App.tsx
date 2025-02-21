import { useMemo, useState } from 'react'
import './App.css'
import Calendar from './components/calendar'
import CalendarMini from './components/calendar-mini'
import Modal from './components/common/modal'
import EventList from './components/event-list'
import { data } from './data/event'
import { CalendarDay, EventModel } from './models/event'
import Event from './components/event'
import { useForm } from 'react-hook-form'
import { EventDay } from './components/event-day'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Options, RRule } from 'rrule'
console.log(data, 'data');

dayjs.extend(customParseFormat)
function App() {
  const [currentDate, setCurrentDate] = useState<{
    month: number
    year: number
    day: number
  }>({
    month: dayjs().month() + 1,
    year: dayjs().year(),
    day: dayjs().date()
  })
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

  const eventsToDay = useMemo(() => {
    return { ...events.find((e) => e.date === today) }
  }, [events])

  const dateForEvent = useMemo(() => {
    const allRecuringEvent = getAllRecuringEvent(events)
    return getDateForRecurringEvent([...allRecuringEvent])
  }, [events])


  function getAllRecuringEvent(eventsArr: CalendarDay[]) {
    const result: CalendarDay[] = []
    eventsArr.forEach((v) => {
      v.events.forEach((event) => {
        if (event.recurrence !== 'none') {
          result.push(v)
        }
      })
    })

    console.log(events, 'events');


    return result
  }

  function getDateForRecurringEvent(eventList: CalendarDay[]) {
    const result: {
      [key: string]: {
        event: EventModel
        dateBetween: string[]
      }
    } = {}

    eventList.forEach((event) => {
      event.events.forEach((ei) => {
        const dateForEvent = getRecurringEventDates(ei, event.date)
        if (dateForEvent && dateForEvent?.length > 0) {
          result[ei.id] = {
            event: ei,
            dateBetween: dateForEvent || []
          }
        }
      })
    })
    return result
  }

  const eventsByDate = useMemo(() => {
    return events.reduce<{ [key: string]: EventModel[] }>((prev, curr) => {
      if (curr.date in prev) {
        return prev
      }
      prev[curr.date] = [...curr.events]
      return {
        ...prev
      }
    }, {})
  }, [events])

  const onSubmit = (values) => {
    const valueAdd = {
      ...values,
      type: values.type === 'appointment' ? 1 : 2,
      id: events.length + 1
    }

    if (openModal.date) {
      if (openModal.date in eventsByDate) {
        const newEvent = [...events].map((event) => {
          if (event.date === openModal.date) {
            return {
              ...event,
              events: [...event.events, ...[valueAdd]]
            }
          }
          return { ...event }
        })
        setEvents([...newEvent])
      } else {
        const newEvent = {
          date: openModal.date,
          events: [valueAdd]
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

  function getRecurringEventDates(event: EventModel, dateStr: string) {
    const convertFreq = () => {
      switch (event.recurrence) {
        case 'daily':
          return RRule.DAILY
        case 'monthly':
          return RRule.MONTHLY
        case 'weekly':
          return RRule.WEEKLY
        case 'yearly':
          return RRule.YEARLY
        default:
          return undefined
      }
    }

    if (convertFreq() || convertFreq() === 0) {
      const dateCurr = dayjs(dateStr, 'DD-MM-YYYY')
      const dateSelected = dayjs(
        new Date(currentDate.year, currentDate.month - 1, currentDate.day)
      )
      const preMonthDateCurr = dateSelected.subtract(1, 'month')
      const nextMonthDateCurr = dateSelected.add(1, 'month')


      const ruleConfig: Partial<Options> = {
        freq: convertFreq(),
        dtstart: new Date(dateCurr.year(), dateCurr.month(), dateCurr.date())
      }
      if (ruleConfig.freq === RRule.MONTHLY) {
        ruleConfig.bymonthday = [-1]
      }
      const rule = new RRule(ruleConfig)

      const allDates = rule.between(
        new Date(preMonthDateCurr.year(), preMonthDateCurr.month(), 1),
        new Date(
          nextMonthDateCurr.year(),
          nextMonthDateCurr.month(),
          nextMonthDateCurr.daysInMonth()
        ),
        true
      )

      // console.log("prev", preMonthDateCurr.format("DD/MM/YYYY"));
      // console.log("current", dateSelected.format("DD/MM/YYYY"));
      // console.log("next", nextMonthDateCurr.format("DD/MM/YYYY"));
      // console.log(allDates.map((date) => dayjs(date).format('DD-MM-YYYY')));

      return allDates.map((date) => dayjs(date).format('DD-MM-YYYY'))
    }
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
            <option value='appointment'>Appointment</option>
            <option value='event'>Event</option>
          </select>

          <select
            className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all'
            {...register('recurrence')}
          >
            <option value='none'>Does not repeat</option>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='yearly'>Yearly</option>
          </select>
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
            dateOnChange={(date) => setCurrentDate(date)}
            monthViewRender={(dayItem) => {
              const eventList = eventsByDate[dayItem.date] || []


              Object.keys(dateForEvent).forEach((key) => {
                // console.log(dayItem, dateForEvent[key].dateBetween.includes(dayItem.date));
                if (dateForEvent[key].dateBetween.includes(dayItem.date)) {
                  // check is recurring date
                  const checkExist = eventList.some(
                    (e) => e.id === dateForEvent[key].event.id
                  )
                  if (!checkExist) {
                    eventList.push(dateForEvent[key].event)
                  }
                }
              })

              return eventList.map((v) => <Event title={v.title} key={v.id} />)
            }}
            dayViewRender={(start, date) => {
              const dateFormat = dayjs(
                new Date(date.year, date.month - 1, date.day)
              ).format('DD-MM-YYYY')
              const events = eventsByDate[dateFormat] || []
              Object.keys(dateForEvent).forEach((key) => {
                if (dateForEvent[key].dateBetween.includes(dateFormat)) {
                  // check is recurring date
                  const checkExist = events.some(
                    (e) => e.id === dateForEvent[key].event.id
                  )
                  if (!checkExist) {
                    events.push(dateForEvent[key].event)
                  }
                }
              })
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
