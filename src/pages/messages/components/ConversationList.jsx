import { useState } from 'react';
export default function ConversationList({ conversations, selectedId, onSelect, mobileVisible }) {
  const [search, setSearch] = useState('');
  const filtered = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.relatedTaskTitle.toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filtered.filter((c) => c.isPinned);
  const others = filtered.filter((c) => !c.isPinned);
  const totalUnread = conversations.reduce((s, c) => s + c.unreadCount, 0);
  return (
    <aside
      className={`
        flex flex-col bg-white border-r border-gray-100 shrink-0
        w-full lg:w-80
        ${mobileVisible ? 'flex' : 'hidden lg:flex'}
      `}
    >
      <div className="px-5 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#1a1a2e]">Messages</h2>
            {totalUnread > 0 && (
              <span className="text-xs font-bold bg-[#e94560] text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {totalUnread}
              </span>
            )}
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#1a1a2e] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <i className="ri-edit-line text-base"></i>
          </button>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
            <i className="ri-search-line text-sm"></i>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-[#1a1a2e] focus:outline-none focus:border-gray-200 transition-colors"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {pinned.length > 0 && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-5 pt-4 pb-2">Pinned</p>
            {pinned.map((conv) => (
              <ConvItem key={conv.id} conv={conv} selected={selectedId === conv.id} onSelect={onSelect} />
            ))}
          </>
        )}
        {others.length > 0 && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-5 pt-4 pb-2">All Messages</p>
            {others.map((conv) => (
              <ConvItem key={conv.id} conv={conv} selected={selectedId === conv.id} onSelect={onSelect} />
            ))}
          </>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-12 px-5">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-3">
              <i className="ri-search-line text-xl text-gray-400"></i>
            </div>
            <p className="text-sm text-gray-400">No conversations found</p>
          </div>
        )}
      </div>
    </aside>
  );
}
function ConvItem({ conv, selected, onSelect }) {
  const fileTypeIcons = {
    PDF: 'ri-file-pdf-line',
    Figma: 'ri-file-line',
    MP4: 'ri-video-line',
  };
  const lastIsFile = conv.messages[conv.messages.length - 1]?.type === 'file';
  const lastIsOffer = conv.messages[conv.messages.length - 1]?.type === 'offer';
  return (
    <button
      onClick={() => onSelect(conv.id)}
      className={`w-full flex items-start gap-3 px-5 py-3.5 transition-colors text-left cursor-pointer ${
        selected ? 'bg-[#e94560]/5 border-r-2 border-[#e94560]' : 'hover:bg-gray-50'
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={conv.participantAvatar}
          alt={conv.participantName}
          className="w-11 h-11 rounded-full object-cover object-top"
        />
        {conv.participantOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className={`text-sm font-semibold truncate ${selected ? 'text-[#e94560]' : 'text-[#1a1a2e]'}`}>
            {conv.participantName}
          </span>
          <span className="text-xs text-gray-400 whitespace-nowrap ml-2 shrink-0">{conv.lastMessageAt}</span>
        </div>
        <p className="text-xs text-gray-400 truncate mb-1">
          {lastIsFile ? (
            <span className="flex items-center gap-1">
              <i className="ri-attachment-2 text-xs"></i> Attachment
            </span>
          ) : lastIsOffer ? (
            <span className="flex items-center gap-1">
              <i className="ri-price-tag-3-line text-xs"></i> Sent an offer
            </span>
          ) : conv.lastMessage}
        </p>
        <p className="text-xs text-gray-300 truncate">{conv.relatedTaskTitle}</p>
      </div>
      {conv.unreadCount > 0 && (
        <span className="shrink-0 min-w-[20px] h-5 flex items-center justify-center bg-[#e94560] text-white text-xs font-bold rounded-full px-1.5 mt-1">
          {conv.unreadCount}
        </span>
      )}
    </button>
  );
}