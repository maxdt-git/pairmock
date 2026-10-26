import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import './App.css'
import { Calendar } from './components/ui/calendar'
import { Button } from './components/ui/button'

declare global {
  interface Window {
    gapi: any
    google: any
  }
}

interface CalendarEvent {
  id: string
  summary: string
  start: { dateTime?: string; date?: string }
}



const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isSignedIn, setIsSignedIn] = useState(false)
  const tokenClientRef = useRef<any>(null)
  const [link, setLink] = useState('');

  useEffect(() => {
    const initClients = async () => {
      await new Promise<void>((resolve) => {
        window.gapi.load('client', async () => {
          await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          })
          resolve()
        })
      })

      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
      })
    }

    const interval = setInterval(() => {
      if (window.gapi && window.google?.accounts?.oauth2) {
        clearInterval(interval)
        initClients()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const loadEvents = async () => {
    try {
      const res = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      setEvents(res.result.items || [])
    } catch (err) {
      console.error('Failed to load events:', err)
    }
  }

  const handleAuth = () => {
    if (!tokenClientRef.current) return

    tokenClientRef.current.callback = async (res: any) => {
      if (res.error) return
      setIsSignedIn(true)
      await loadEvents()
    }

    const hasToken = window.gapi.client.getToken() !== null
    tokenClientRef.current.requestAccessToken({ prompt: hasToken ? '' : 'consent' })
  }


  console.log("Vite Env Check:", {
    raw: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    all: import.meta.env
  });


  const createEvent = async () => {
    if (!window.gapi?.client?.calendar) {
      alert('Please sync with Google Calendar first.')
      return
    }

    const event = {
      summary: 'Mock interview TITLE',
      description: 'Mock interview description',
      start: {
        dateTime: '2026-10-27T17:00:00+01:00',
        timeZone: 'Europe/Paris',
      },
      end: {
        dateTime: '2026-10-27T18:00:00+01:00',
        timeZone: 'Europe/Paris',
      },
      attendees: [
        { email: 'testtestMOCK@gmail.com' },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          // Use a dynamic ID to prevent caching or collisions across different events
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    }

    try {
      const { result } = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1, // REQUIRED: Tells Google to process conferenceData
        resource: event,
      })
      // The Meet link is returned directly on result.hangoutLink
      const meetLink = result.hangoutLink
      console.log('Google Meet URL:', meetLink)
      setLink(meetLink || result.htmlLink)
    } catch (err: any) {
      console.error('Error creating event:', err)
      alert(err?.result?.error?.message || 'Failed to create event')
    }
  }
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
          className="rounded-lg border w-100"
        />
      </div>
      <div className="my-4 flex flex-col items-center gap-2">
        <button
          onClick={handleAuth}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {isSignedIn ? 'Refresh Calendar Events' : 'Sync Google Calendar'}
        </button>
        <Button onClick={() => createEvent()}>Create Event</Button>
        {link && <pre>Event created: {link}</pre>}
      </div>
    </>
  )
}

export default App