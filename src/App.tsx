import { useEffect, useState } from 'react'
import Form from './components/AcessesForm'
import { Profile } from './components/Profile'

export default function App() {
  const [username, setUsername] = useState('')
  const [pages, setPages] = useState(false)

  return (
    <>
      {
        pages ? <Profile username={username}/> : <Form status={setPages} username={setUsername}/>
      }
    </>
  )
}