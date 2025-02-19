
import './App.css'
import Calendar from './components/calendar'
import CalendarMini from './components/calendar-mini'
import EventList from './components/event-list'

function App() {

  return (
    <div className='bg-calendar-title'>
      <div className='container mx-auto p-10'>
        <div className='grid grid-cols-[30%_70%] gap-x-4'>
          <div className='flex flex-col gap-y-1'>
            <CalendarMini />
            <EventList />
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  )
}

export default App
