import { useEffect, useState } from 'react'
import { messageService } from '@/services/message.service'
import { Message } from '../../data/mock-data'

function Page() {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    async function getMessages() {
      try {
        const data = await messageService.getAll()
        setMessages(data)
        console.log("messages:", data)
      } catch (error: any) {
        console.error("Erreur récupération messages:", error.message)
      }
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
