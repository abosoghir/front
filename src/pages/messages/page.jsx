import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import messageService from '@/api/messageService';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import EmptyState from './components/EmptyState';

export default function MessagesPage() {
  const [searchParams] = useSearchParams();
  const initialConvId = searchParams.get('conv') ? searchParams.get('conv') : null;
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(initialConvId ?? null);
  const [showMobileList, setShowMobileList] = useState(true);
  const [isTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const selectedConv = conversations.find((c) => c.id === selectedId) ?? null;
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
    setShowMobileList(false);
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unreadCount: 0,
              messages: (c.messages || []).map((m) => ({ ...m, read: true })),
            }
          : c
      )
    );
  }, []);

  // Fetch conversations from API
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const data = await messageService.getConversations();
        setConversations(data || []);
      } catch {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    if (initialConvId) handleSelect(initialConvId);
  }, [initialConvId, handleSelect]);

  const handleSend = async (text) => {
    if (!selectedId) return;
    // Optimistically add message to UI
    const newMsg = {
      id: Date.now(),
      conversationId: selectedId,
      sender: 'me',
      type: 'text',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...(c.messages || []), newMsg], lastMessage: text, lastMessageAt: 'Just now' }
          : c
      )
    );
    // Send via API
    try {
      await messageService.sendMessage({
        receiverId: selectedConv?.otherUserId || selectedId,
        content: text,
      });
    } catch {
      // Message already added optimistically
    }
  };
  const handleBack = () => {
    setShowMobileList(true);
    setSelectedId(null);
  };
  return (
    <div className="flex h-screen bg-[#f7f7f8] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold text-[#1a1a2e]">
              Wasla
            </Link>
            <div className="hidden sm:flex items-center gap-1 text-gray-300">
              <i className="ri-arrow-right-s-line text-sm"></i>
            </div>
            <span className="hidden sm:block text-sm font-semibold text-gray-500">Messages</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/seeker" className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1a1a2e] transition-colors">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-dashboard-line text-sm"></i>
              </div>
              <span className="hidden sm:block">Seeker Dashboard</span>
            </Link>
            <Link to="/dashboard/helper" className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#1a1a2e] transition-colors">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-user-star-line text-sm"></i>
              </div>
              <span className="hidden sm:block">Helper Dashboard</span>
            </Link>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer relative">
              <i className="ri-notification-3-line text-base"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e94560] rounded-full"></span>
            </button>
            <img
              src="https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20startup%20founder%20portrait%20friendly%20smile%20clean%20white%20background%20entrepreneur%20business%20confident%20look%20headshot&width=32&height=32&seq=msg-topbar-av-001&orientation=squarish"
              alt="User"
              className="w-8 h-8 rounded-full object-cover object-top cursor-pointer"
            />
          </div>
        </header>
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={handleSelect}
            mobileVisible={showMobileList}
          />
          {selectedConv ? (
            <ChatWindow
              conversation={selectedConv}
              messages={selectedConv.messages}
              onBack={handleBack}
              onSend={handleSend}
              isTyping={isTyping}
            />
          ) : (
            <div className="hidden lg:flex flex-1">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}