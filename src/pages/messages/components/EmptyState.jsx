export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#f7f7f8] p-8">
      <div className="w-20 h-20 flex items-center justify-center bg-white rounded-2xl border border-gray-100 mb-5">
        <i className="ri-message-3-line text-4xl text-gray-300"></i>
      </div>
      <h3 className="text-base font-bold text-[#1a1a2e] mb-2">Select a conversation</h3>
      <p className="text-sm text-gray-400 text-center max-w-xs">
        Choose a conversation from the list to start chatting with your helpers or seekers.
      </p>
    </div>
  );
}