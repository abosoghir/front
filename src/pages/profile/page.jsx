import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const skillOptions = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Django', 'Laravel', 'PHP',
  'UI/UX Design', 'Figma', 'Adobe XD', 'Graphic Design', 'Illustrator', 'Photoshop',
  'Content Writing', 'SEO', 'Digital Marketing', 'Social Media', 'Video Editing',
  'Motion Graphics', 'Translation', 'Data Entry', 'Excel', 'Data Analysis',
  'Mobile Development', 'Flutter', 'React Native', 'iOS', 'Android',
];

const categories = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Content Writing', 'Digital Marketing', 'Video Editing', 'Translation', 'Data Entry',
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState('https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20designer%20portrait%20friendly%20smile%20clean%20white%20background%20creative%20confident%20headshot&width=120&height=120&seq=profile-main-av-001&orientation=squarish');
  const fileRef = useRef(null);

  const [selectedSkills, setSelectedSkills] = useState(['React', 'UI/UX Design', 'Figma', 'Node.js']);
  const [skillInput, setSkillInput] = useState('');

  const [form, setForm] = useState({
    firstName: 'Layla',
    lastName: 'Ibrahim',
    email: 'layla.ibrahim@email.com',
    phone: '+20 100 234 5678',
    country: 'Egypt',
    city: 'Cairo',
    bio: 'Creative UI/UX designer and frontend developer with 5+ years of experience building beautiful digital products. Passionate about clean design and seamless user experiences.',
    headline: 'UI/UX Designer & Frontend Developer',
    category: 'UI/UX Design',
    hourlyRate: '25',
    website: 'https://laylaibrahim.design',
    linkedin: 'linkedin.com/in/laylaibrahim',
    github: 'github.com/laylaibrahim',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !selectedSkills.includes(trimmed)) {
      setSelectedSkills((prev) => [...prev, trimmed]);
      setSkillInput('');
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'ri-user-line' },
    { id: 'professional', label: 'Professional', icon: 'ri-briefcase-line' },
    { id: 'security', label: 'Security', icon: 'ri-shield-keyhole-line' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-bold text-[#1a1a2e]">Wasla</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-600">My Profile</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/helper" className="text-sm text-gray-500 hover:text-[#e94560] transition-colors cursor-pointer whitespace-nowrap">
              Dashboard
            </Link>
            <button
              onClick={handleSave}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                saved ? 'bg-emerald-500 text-white' : 'bg-[#e94560] text-white hover:bg-[#c73652]'
              }`}
            >
              {saved ? (
                <span className="flex items-center gap-2"><i className="ri-check-line"></i> Saved!</span>
              ) : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          <div className="w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover object-top mx-auto"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-[#e94560] text-white rounded-full cursor-pointer hover:bg-[#c73652] transition-colors"
                >
                  <i className="ri-camera-line text-sm"></i>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" />
              </div>
              <p className="font-semibold text-[#1a1a2e]">{form.firstName} {form.lastName}</p>
              <p className="text-sm text-gray-500 mt-0.5">{form.headline}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <i className="ri-map-pin-line text-xs text-gray-400"></i>
                <span className="text-xs text-gray-400">{form.city}, {form.country}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-center">
                <div>
                  <p className="text-lg font-bold text-[#1a1a2e]">64</p>
                  <p className="text-xs text-gray-400">Tasks</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1a1a2e]">4.8</p>
                  <p className="text-xs text-gray-400">Rating</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#1a1a2e]">430</p>
                  <p className="text-xs text-gray-400">Points</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#e94560]/5 text-[#e94560] border-l-2 border-[#e94560]'
                      : 'text-gray-600 hover:bg-gray-50 border-l-2 border-transparent'
                  }`}
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${tab.icon} text-base`}></i>
                  </div>
                  {tab.label}
                </button>
              ))}
            </div>

            <Link
              to="/helpers/1"
              className="flex items-center gap-2 text-sm text-[#e94560] font-medium hover:text-[#c73652] transition-colors cursor-pointer"
            >
              <i className="ri-external-link-line"></i>
              View Public Profile
            </Link>
          </div>

          <div className="flex-1 min-w-0">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">First Name</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Last Name</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email Address</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                      <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Country</label>
                      <select name="country" value={form.country} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors cursor-pointer">
                        <option>Egypt</option>
                        <option>Saudi Arabia</option>
                        <option>UAE</option>
                        <option>Jordan</option>
                        <option>Lebanon</option>
                        <option>Morocco</option>
                        <option>Tunisia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">City</label>
                      <input name="city" value={form.city} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Bio</label>
                    <textarea name="bio" value={form.bio} onChange={handleChange} rows={4} maxLength={500} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors resize-none" />
                    <p className="text-xs text-gray-400 mt-1 text-right">{form.bio.length}/500</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">Social Links</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'website', label: 'Website', icon: 'ri-global-line', placeholder: 'https://yourwebsite.com' },
                      { name: 'linkedin', label: 'LinkedIn', icon: 'ri-linkedin-line', placeholder: 'linkedin.com/in/username' },
                      { name: 'github', label: 'GitHub', icon: 'ri-github-line', placeholder: 'github.com/username' },
                    ].map((field) => (
                      <div key={field.name} className="flex items-center gap-3">
                        <div className="w-9 h-9 flex items-center justify-center bg-gray-50 rounded-md border border-gray-200 shrink-0">
                          <i className={`${field.icon} text-gray-500`}></i>
                        </div>
                        <input
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="flex-1 border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">Professional Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Professional Headline</label>
                      <input name="headline" value={form.headline} onChange={handleChange} placeholder="e.g. Full-Stack Developer & UI Designer" className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Main Category</label>
                        <select name="category" value={form.category} onChange={handleChange} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors cursor-pointer">
                          {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Hourly Rate (USD)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                          <input name="hourlyRate" type="number" value={form.hourlyRate} onChange={handleChange} className="w-full border border-gray-200 rounded-md pl-7 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-2">Skills</h3>
                  <p className="text-sm text-gray-500 mb-4">Select your skills or add custom ones</p>
                  {selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSkills.map((skill) => (
                        <span key={skill} className="flex items-center gap-1.5 px-3 py-1 bg-[#e94560]/10 text-[#e94560] rounded-full text-sm font-medium">
                          {skill}
                          <button onClick={() => toggleSkill(skill)} className="w-4 h-4 flex items-center justify-center hover:text-[#c73652] cursor-pointer">
                            <i className="ri-close-line text-xs"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mb-4">
                    <input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addCustomSkill()}
                      placeholder="Add a custom skill..."
                      className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
                    />
                    <button onClick={addCustomSkill} className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-medium hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.filter((s) => !selectedSkills.includes(s)).map((skill) => (
                      <button key={skill} onClick={() => toggleSkill(skill)} className="px-3 py-1 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors cursor-pointer whitespace-nowrap">
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    {[
                      { label: 'Current Password', placeholder: '••••••••' },
                      { label: 'New Password', placeholder: '••••••••' },
                      { label: 'Confirm New Password', placeholder: '••••••••' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{field.label}</label>
                        <input type="password" placeholder={field.placeholder} className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#e94560] transition-colors" />
                      </div>
                    ))}
                    <button className="px-5 py-2.5 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-100 p-6">
                  <h3 className="text-base font-semibold text-[#1a1a2e] mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200">
                        <i className="ri-smartphone-line text-gray-600"></i>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Authenticator App</p>
                        <p className="text-xs text-gray-500">Not configured</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 border border-[#e94560] text-[#e94560] rounded-md text-sm font-medium hover:bg-[#e94560]/5 transition-colors cursor-pointer whitespace-nowrap">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-red-100 p-6">
                  <h3 className="text-base font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-5 py-2.5 border border-red-300 text-red-500 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
