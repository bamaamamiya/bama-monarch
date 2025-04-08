function ChatBubble({ msg, isCurrent }) {
  const alignment = msg.role === 'now' ? 'justify-start' : 'justify-end'
  const bubbleColor = msg.role === 'now' ? 'bg-blue-200' : 'bg-green-200'
  const name = msg.role === 'now' ? 'Bama Now' : 'Bama Monarch'

  return (
    <div className={`flex ${alignment} mb-2`}>
      <div className={`p-2 rounded-xl max-w-xs ${bubbleColor}`}>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-base">{msg.text}</p>
        <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default ChatBubble
