import { Link } from 'react-router'
import './App.css'
import { Calendar } from './components/ui/calendar'
import { useState } from 'react'

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <>
      <p>Hello World! Mock platfrom</p>
      <Link to={"/login"}>Login</Link>
      <p>Date picked: {date?.toLocaleDateString()}</p>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border w-[400px]"
        />
      </div>
    </>
  )
}

export default App
