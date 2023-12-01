function ChatMessages({ messages }: { messages: string[] }) {
  return (
    <div>
      {messages.map((message, i) => (
      <div key={i}>{message}</div>
      ))}
    </div>
  )
}

export default ChatMessages
