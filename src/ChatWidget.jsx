import { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

const INITIAL_MESSAGES = [
  { role: 'assistant', content: 'Hi! Ask me about our products.' },
]

function ChatWidget() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const listRef = useRef(null)

  // Keep the newest message in view as the list grows.
  useEffect(() => {
    const list = listRef.current
    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    const content = inputValue.trim()
    if (!content) return

    setMessages((messages) => [...messages, { role: 'user', content }])
    setInputValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-widget">
      <header className="chat-header">
        <h2>Product assistant</h2>
      </header>

      <div className="chat-messages" ref={listRef} role="log" aria-live="polite">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message chat-message-${message.role}`}>
            <div className="chat-bubble">{message.content}</div>
          </div>
        ))}
      </div>

      <div className="chat-composer">
        <input
          type="text"
          className="chat-input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          aria-label="Message"
        />
        <button
          type="button"
          className="chat-send"
          onClick={sendMessage}
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatWidget
