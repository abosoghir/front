
const skillOptions = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Content Writing', 'Translation', 'Digital Marketing', 'Data Entry',
  'Video Editing', 'SEO', 'Social Media', 'Photography',
];
export default function StepProfile({ role, data, onChange, onNext, onBack }) {
  const toggleSkill = (skill) => {
    const updated = data.skills.includes(skill)
      ? data.skills.filter((s) => s !== skill)
      : [...data.skills, skill];
    onChange({ ...data, skills: updated });
  };
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          {role === 'helper' ? 'Set up your helper profile' : 'Tell us about yourself'}
        </h2>
        <p className="text-gray-500 text-sm">
          {role === 'helper'
            ? 'A complete profile gets 3x more offers. You can edit this anytime.'
            : 'Help seekers know who they\'re working with.'}
        </p>
      </div>
      <div className="space-y-4 mb-6">
        {role === 'helper' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Professional Headline
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                <i className="ri-briefcase-line text-base"></i>
              </div>
              <input
                type="text"
                value={data.headline}
                onChange={(e) => onChange({ ...data, headline: e.target.value })}
                placeholder="e.g. Full-Stack Developer with 5 years experience"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
              />
            </div>
          </div>
        )}
        {role === 'seeker' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Company Name
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                <i className="ri-building-line text-base"></i>
              </div>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => onChange({ ...data, companyName: e.target.value })}
                placeholder="Your company or organization"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Location
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
              <i className="ri-map-pin-line text-base"></i>
            </div>
            <input
              type="text"
              value={data.location}
              onChange={(e) => onChange({ ...data, location: e.target.value })}
              placeholder="e.g. Cairo, Egypt"
              className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Bio
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => onChange({ ...data, bio: e.target.value.slice(0, 500) })}
            placeholder={
              role === 'helper'
                ? 'Describe your expertise, experience, and what makes you stand out...'
                : 'Tell helpers a bit about yourself and your typical projects...'
            }
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all resize-none"
          />
          <p className="text-xs text-gray-400 text-right mt-1">{data.bio.length}/500</p>
        </div>
        {role === 'helper' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Hourly Rate (USD)
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                <i className="ri-money-dollar-circle-line text-base"></i>
              </div>
              <input
                type="number"
                min="1"
                value={data.hourlyRate}
                onChange={(e) => onChange({ ...data, hourlyRate: e.target.value })}
                placeholder="e.g. 25"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
              />
            </div>
          </div>
        )}
        {role === 'helper' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Skills
              <span className="text-gray-400 font-normal ml-1">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                    data.skills.includes(skill)
                      ? 'bg-[#e94560] border-[#e94560] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-[#e94560] hover:text-[#e94560]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {data.skills.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">{data.skills.length} skill{data.skills.length > 1 ? 's' : ''} selected</p>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
          Create Account
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-right-line"></i>
          </div>
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4">
        You can skip this step and complete your profile later.
      </p>
    </div>
  );
}