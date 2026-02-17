import { useEffect, useState } from 'react'
import supabase from '../../utils/supabase'
import { Message } from '../../data/mock-data'

function Page() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function getMessages() {
      const { data, error } = await supabase.from('messages').select('*')

      if (error) {
        console.error("Erreur Supabase:", error.message)
        return
      }

      if (data && data.length > 0) {
        setMessages(data as Message[])
      }

      console.log("messages:", data)
    }

    getMessages()
  }, [])

  return (
    <div className='p-6 bg-primary rounded mt-4'>
      {messages.length > 0 ? (
        <ul>
          {messages.map((message) => (
            <li className='list-none' key={message.id}>
              <strong>{message.name}</strong> — {message.subject}
            </li>
          ))}
        </ul>
      ) : (
        <h2>Aucun message n'est disponible</h2>
      )}
    </div>
  )
}

export default Page
