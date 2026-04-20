import { Link } from 'react-router-dom';
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-3.5 h-3.5 flex items-center justify-center">
          <i className={`text-xs ${i <= Math.round(rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}></i>
        </div>
      ))}
    </div>
  );
}
export default function HelperCard({ helper, view }) {
  if (view === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5 hover:border-[#e94560]/30 hover:shadow-sm transition-all group">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative shrink-0">
            <img
              src={helper.avatar}
              alt={helper.name}
              className="w-16 h-16 rounded-xl object-cover object-top"
            />
            {helper.isAvailable && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-bold text-[#1a1a2e] group-hover:text-[#e94560] transition-colors">
                  {helper.name}
                </h3>
                {helper.isVerified && (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-verified-badge-fill text-sky-500 text-sm"></i>
                  </div>
                )}
                {helper.badges.slice(0, 1).map((b) => (
                  <span key={b.name} className="text-xs px-2 py-0.5 bg-[#e94560]/10 text-[#e94560] rounded-full font-medium whitespace-nowrap">
                    {b.name}
                  </span>
                ))}
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black text-[#1a1a2e]">${helper.hourlyRate}</span>
                <span className="text-xs text-gray-400">/hr</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2 truncate">{helper.headline}</p>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <StarRating rating={helper.averageRating} />
                <span className="text-xs font-semibold text-gray-700">{helper.averageRating}</span>
                <span className="text-xs text-gray-400">({helper.totalReviewsCount})</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-map-pin-line text-xs"></i>
                </div>
                {helper.location}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-check-double-line text-xs text-emerald-500"></i>
                </div>
                {helper.completedTasksCount} tasks done
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <div className="w-3.5 h-3.5 flex items-center justify-center">
                  <i className="ri-time-line text-xs"></i>
                </div>
                Responds in ~{helper.speedOfResponseInMinutes}min
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {helper.skills.slice(0, 5).map((skill) => (
                <span key={skill} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
                  {skill}
                </span>
              ))}
              {helper.skills.length > 5 && (
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full whitespace-nowrap">
                  +{helper.skills.length - 5} more
                </span>
              )}
            </div>
          </div>
          <div className="flex sm:flex-col gap-2 shrink-0 sm:justify-start">
            <Link
              to={`/helpers/${helper.id}`}
              className="px-4 py-2 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap text-center"
            >
              View Profile
            </Link>
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap cursor-pointer">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#e94560]/30 hover:shadow-sm transition-all group flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={helper.avatar}
              alt={helper.name}
              className="w-14 h-14 rounded-xl object-cover object-top"
            />
            {helper.isAvailable && (
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-[#1a1a2e]">${helper.hourlyRate}<span className="text-xs font-normal text-gray-400">/hr</span></div>
            <div className={`text-xs font-medium mt-0.5 ${helper.isAvailable ? 'text-emerald-500' : 'text-gray-400'}`}>
              {helper.isAvailable ? 'Available' : 'Busy'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-sm font-bold text-[#1a1a2e] group-hover:text-[#e94560] transition-colors truncate">
            {helper.name}
          </h3>
          {helper.isVerified && (
            <div className="w-4 h-4 flex items-center justify-center shrink-0">
              <i className="ri-verified-badge-fill text-sky-500 text-sm"></i>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{helper.headline}</p>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={helper.averageRating} />
          <span className="text-xs font-semibold text-gray-700">{helper.averageRating}</span>
          <span className="text-xs text-gray-400">({helper.totalReviewsCount})</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {helper.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full whitespace-nowrap">
              {skill}
            </span>
          ))}
          {helper.skills.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full whitespace-nowrap">
              +{helper.skills.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-map-pin-line text-xs"></i>
            </div>
            <span className="truncate">{helper.location}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-3.5 h-3.5 flex items-center justify-center">
              <i className="ri-check-double-line text-xs text-emerald-500"></i>
            </div>
            {helper.completedTasksCount} done
          </div>
        </div>
      </div>
      {helper.badges.length > 0 && (
        <div className="px-5 pb-3 flex gap-1.5 flex-wrap">
          {helper.badges.map((b) => (
            <div key={b.name} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full whitespace-nowrap">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className={`${b.icon} text-xs`}></i>
              </div>
              {b.name}
            </div>
          ))}
        </div>
      )}
      <div className="border-t border-gray-100 p-4 flex gap-2">
        <Link
          to={`/helpers/${helper.id}`}
          className="flex-1 py-2 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors text-center whitespace-nowrap"
        >
          View Profile
        </Link>
        <button className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-lg text-gray-400 hover:border-[#e94560] hover:text-[#e94560] transition-colors cursor-pointer shrink-0">
          <i className="ri-heart-line text-sm"></i>
        </button>
      </div>
    </div>
  );
}