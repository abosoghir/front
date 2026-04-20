import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
const fileIcons = {
  PDF: { icon: 'ri-file-pdf-line', color: 'text-red-500', bg: 'bg-red-50' },
  Figma: { icon: 'ri-file-line', color: 'text-violet-500', bg: 'bg-violet-50' },
  MP4: { icon: 'ri-video-line', color: 'text-sky-500', bg: 'bg-sky-50' },
  ZIP: { icon: 'ri-file-zip-line', color: 'text-amber-500', bg: 'bg-amber-50' },
  DOCX: { icon: 'ri-file-word-line', color: 'text-sky-600', bg: 'bg-sky-50' },
};
function MessageBubble({ msg, participantAvatar }) {
  const isMe = msg.sender === 'me';
  if (msg.type === 'system') {
    return (
      <div className="flex justify-center my-3">
        <div className="flex items-center gap-2 bg-gray-100 text-gray-500 text-xs px-4 py-2 rounded-full max-w-sm text-center">
          <div className="w-3 h-3 flex items-center justify-center shrink-0">
            <i className="ri-information-line text-xs"></i>
          </div>
          {msg.text}
        </div>
      </div>
    );
  }
  if (msg.type === 'offer') {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
        {!isMe && (
          <img src={participantAvatar} alt="" className="w-7 h-7 rounded-full object-cover object-top mr-2 mt-auto shrink-0" />
        )}
        <div className="max-w-xs">
          <div className={`rounded-2xl overflow-hidden border ${isMe ? 'border-[#e94560]/20' : 'border-gray-200'}`}>
            <div className={`px-4 py-3 ${isMe ? 'bg-[#e94560]/10' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-price-tag-3-line text-sm text-[#e94560]"></i>
                </div>
                <span className="text-xs font-bold text-[#e94560] uppercase tracking-wide">Offer Sent</span>
              </div>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-2xl font-bold text-[#1a1a2e]">${msg.offerAmount}</span>
                <span className="text-xs text-gray-400 mb-1">USD</span>
              </div>
              <p className="text-xs text-gray-500">Delivery in {msg.offerDays} days</p>
            </div>
            <div className="px-4 py-2.5 bg-white flex items-center justify-between">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                msg.offerStatus === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
                msg.offerStatus === 'declined' ? 'bg-red-50 text-red-500' :
                'bg-amber-50 text-amber-600'
              }`}>
                {msg.offerStatus === 'accepted' ? 'Accepted' : msg.offerStatus === 'declined' ? 'Declined' : 'Pending Review'}
              </span>
              {!isMe && msg.offerStatus === 'pending' && (
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Decline</button>
                  <button className="text-xs font-semibold text-[#e94560] hover:text-[#c73652] cursor-pointer transition-colors">Accept</button>
                </div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1 px-1 text-right">{msg.timestamp}</p>
        </div>
      </div>
    );
  }
  if (msg.type === 'file') {
    const fileConf = fileIcons[msg.fileType || ''] || { icon: 'ri-file-line', color: 'text-gray-500', bg: 'bg-gray-100' };
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
        {!isMe && (
          <img src={participantAvatar} alt="" className="w-7 h-7 rounded-full object-cover object-top mr-2 mt-auto shrink-0" />
        )}
        <div className="max-w-xs">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer hover:opacity-90 transition-opacity ${
            isMe ? 'bg-[#1a1a2e] border-[#1a1a2e]' : 'bg-white border-gray-200'
          }`}>
            <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${isMe ? 'bg-white/10' : fileConf.bg}`}>
              <i className={`${fileConf.icon} text-base ${isMe ? 'text-white' : fileConf.color}`}></i>
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-semibold truncate ${isMe ? 'text-white' : 'text-[#1a1a2e]'}`}>{msg.fileName}</p>
              <p className={`text-xs ${isMe ? 'text-white/50' : 'text-gray-400'}`}>{msg.fileType} · {msg.fileSize}</p>
            </div>
            <div className={`w-7 h-7 flex items-center justify-center shrink-0 ${isMe ? 'text-white/60' : 'text-gray-400'}`}>
              <i className="ri-download-line text-base"></i>
            </div>
          </div>
          <p className={`text-xs text-gray-400 mt-1 px-1 ${isMe ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isMe && (
        <img src={participantAvatar} alt="" className="w-7 h-7 rounded-full object-cover object-top mr-2 mt-auto shrink-0" />
      )}
      <div className={`max-w-sm lg:max-w-md ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isMe
            ? 'bg-[#e94560] text-white rounded-br-sm'
            : 'bg-white border border-gray-100 text-[#1a1a2e] rounded-bl-sm'
        }`}>
          {msg.text}
        </div>
        <div className={`flex items-center gap-1 mt-1 px-1 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-xs text-gray-400">{msg.timestamp}</span>
          {isMe && (
            <div className="w-3 h-3 flex items-center justify-center">
              <i className={`text-xs ${msg.read ? 'ri-check-double-line text-sky-400' : 'ri-check-line text-gray-400'}`}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function ChatWindow({ conversation, messages, onBack, onSend, isTyping }) {
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const emojis = ['😊', '👍', '🙏', '🔥', '✅', '💯', '🎉', '👏', '😄', '❤️', '🚀', '💪'];
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
    setShowEmoji(false);
    inputRef.current?.focus();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    inputRef.current?.focus();
  };
  const groupedMessages = [];
  messages.forEach((msg) => {
    const date = msg.timestamp.includes(',') ? msg.timestamp.split(',')[0] : 'Today';
    const last = groupedMessages[groupedMessages.length - 1];
    if (last && last.date === date) {
      last.msgs.push(msg);
    } else {
      groupedMessages.push({ date, msgs: [msg] });
    }
  });
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#f7f7f8]">
      <div className="bg-white border-b border-gray-100 px-5 h-16 flex items-center gap-4 shrink-0">
        <button
          onClick={onBack}
          className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#1a1a2e] cursor-pointer transition-colors"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>
        <div className="relative shrink-0">
          <img
            src={conversation.participantAvatar}
            alt={conversation.participantName}
            className="w-9 h-9 rounded-full object-cover object-top"
          />
          {conversation.participantOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white"></span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-[#1a1a2e] truncate">{conversation.participantName}</p>
            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full shrink-0">{conversation.participantRole}</span>
            <div className="flex items-center gap-0.5 shrink-0">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-star-fill text-amber-400 text-xs"></i>
              </div>
              <span className="text-xs text-gray-500">{conversation.participantRating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 truncate">
            {conversation.participantOnline ? (
              <span className="text-emerald-500 font-medium">Online now</span>
            ) : 'Last seen recently'} · {conversation.relatedTaskTitle}
          </p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Link
            to={`/dashboard/seeker/tasks/${conversation.relatedTaskId}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <div className="w-3 h-3 flex items-center justify-center">
              <i className="ri-task-line text-xs"></i>
            </div>
            View Task
          </Link>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1a1a2e] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <i className="ri-phone-line text-base"></i>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1a1a2e] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <i className="ri-more-2-line text-base"></i>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        {groupedMessages.map((group) => (
          <div key={group.date}>
            <div className="flex justify-center my-4">
              <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{group.date}</span>
            </div>
            {group.msgs.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} participantAvatar={conversation.participantAvatar} />
            ))}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-end gap-2 mb-3">
            <img src={conversation.participantAvatar} alt="" className="w-7 h-7 rounded-full object-cover object-top shrink-0" />
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
        {showEmoji && (
          <div className="mb-3 flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => addEmoji(emoji)}
                className="text-xl hover:scale-125 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-end gap-3">
          <div className="flex items-center gap-1 pb-1 shrink-0">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${showEmoji ? 'text-[#e94560] bg-[#e94560]/10' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}
            >
              <i className="ri-emotion-line text-lg"></i>
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <i className="ri-attachment-2 text-lg"></i>
            </button>
          </div>
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Enter to send)"
              rows={1}
              className="w-full resize-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-gray-300 transition-colors max-h-32 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all cursor-pointer shrink-0 mb-0.5 ${
              input.trim()
                ? 'bg-[#e94560] text-white hover:bg-[#c73652]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className="ri-send-plane-fill text-base"></i>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-center">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}