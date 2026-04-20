import { Link } from 'react-router-dom';
import SeekerLayout from '../../components/SeekerLayout';

export default function PostTaskPage() {
  return (
    <SeekerLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>
              Post a New Task
            </h1>
            <p className="text-gray-500 text-sm mt-1">Describe what you need and let helpers come to you.</p>
          </div>
          <Link to="/dashboard/seeker/tasks" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#e94560] transition-colors">
            <i className="ri-arrow-left-line text-sm"></i>
            Back to Tasks
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Task Title</label>
            <input
              type="text"
              placeholder="e.g. Build a React E-Commerce Website"
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all bg-white">
              <option value="">Select a category</option>
              {['Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design', 'Content Writing', 'Digital Marketing', 'Video Editing', 'Translation', 'Data Entry', 'Other'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              rows={5}
              placeholder="Describe your task in detail..."
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget (USD)</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-money-dollar-circle-line text-base"></i>
                </div>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deadline</label>
              <input
                type="date"
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Attachments (optional)</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-[#e94560]/30 transition-colors cursor-pointer">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-2">
                <i className="ri-upload-cloud-line text-xl text-gray-400"></i>
              </div>
              <p className="text-sm text-gray-500">Drag & drop files here or <span className="text-[#e94560] font-medium">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX, PNG, ZIP — Max 10MB per file</p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link to="/dashboard/seeker/tasks" className="flex-1 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center">
              Cancel
            </Link>
            <button className="flex-1 py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer flex items-center justify-center gap-2">
              <i className="ri-send-plane-line text-sm"></i>
              Post Task
            </button>
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
}
