import { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Web Development',
    description: 'Websites, web apps, e-commerce, APIs, and full-stack solutions',
    icon: 'ri-code-s-slash-line',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    count: 1240,
    subcategories: ['React / Vue / Angular', 'WordPress', 'E-Commerce', 'Backend APIs', 'Landing Pages', 'Web Scraping'],
    image: 'https://readdy.ai/api/search-image?query=modern%20web%20development%20workspace%20with%20multiple%20monitors%20showing%20code%20editor%20and%20website%20design%20clean%20minimal%20desk%20setup%20professional%20developer%20environment%20bright%20natural%20light&width=400&height=220&seq=cat-web-001&orientation=landscape',
  },
  {
    id: 2,
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform mobile applications',
    icon: 'ri-smartphone-line',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    count: 680,
    subcategories: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'App Store Optimization'],
    image: 'https://readdy.ai/api/search-image?query=mobile%20app%20development%20smartphone%20screens%20showing%20beautiful%20app%20interfaces%20clean%20white%20background%20professional%20product%20photography%20minimal%20design&width=400&height=220&seq=cat-mobile-001&orientation=landscape',
  },
  {
    id: 3,
    name: 'UI/UX Design',
    description: 'User interface design, prototyping, and user experience research',
    icon: 'ri-palette-line',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    count: 920,
    subcategories: ['Figma Design', 'Prototyping', 'User Research', 'Design Systems', 'Wireframing', 'Usability Testing'],
    image: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20workspace%20with%20tablet%20showing%20wireframes%20and%20design%20mockups%20colorful%20sticky%20notes%20clean%20modern%20studio%20environment%20creative%20professional&width=400&height=220&seq=cat-uiux-001&orientation=landscape',
  },
  {
    id: 4,
    name: 'Graphic Design',
    description: 'Logos, branding, illustrations, print design, and visual identity',
    icon: 'ri-brush-line',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    count: 1560,
    subcategories: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Illustrations', 'Print Design', 'Packaging'],
    image: 'https://readdy.ai/api/search-image?query=graphic%20design%20studio%20with%20colorful%20brand%20identity%20materials%20logo%20designs%20on%20white%20desk%20creative%20workspace%20professional%20designer%20tools%20clean%20minimal&width=400&height=220&seq=cat-graphic-001&orientation=landscape',
  },
  {
    id: 5,
    name: 'Content Writing',
    description: 'Blog posts, copywriting, SEO content, and technical writing',
    icon: 'ri-quill-pen-line',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    count: 2100,
    subcategories: ['Blog Articles', 'SEO Copywriting', 'Product Descriptions', 'Technical Writing', 'Proofreading', 'Ghostwriting'],
    image: 'https://readdy.ai/api/search-image?query=content%20writing%20workspace%20with%20laptop%20notebook%20coffee%20cup%20clean%20white%20desk%20professional%20writer%20environment%20minimal%20modern%20aesthetic%20natural%20light&width=400&height=220&seq=cat-writing-001&orientation=landscape',
  },
  {
    id: 6,
    name: 'Digital Marketing',
    description: 'Social media, SEO, paid ads, email marketing, and growth strategies',
    icon: 'ri-bar-chart-line',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    count: 870,
    subcategories: ['Social Media Management', 'Google Ads', 'Facebook Ads', 'SEO Optimization', 'Email Marketing', 'Analytics'],
    image: 'https://readdy.ai/api/search-image?query=digital%20marketing%20analytics%20dashboard%20on%20laptop%20screen%20with%20charts%20graphs%20social%20media%20icons%20clean%20modern%20office%20environment%20professional%20marketer%20workspace&width=400&height=220&seq=cat-marketing-001&orientation=landscape',
  },
  {
    id: 7,
    name: 'Video Editing',
    description: 'Video production, motion graphics, animation, and post-production',
    icon: 'ri-film-line',
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    count: 540,
    subcategories: ['YouTube Videos', 'Social Media Reels', 'Motion Graphics', 'Color Grading', 'Animation', 'Subtitles'],
    image: 'https://readdy.ai/api/search-image?query=video%20editing%20workstation%20with%20multiple%20monitors%20showing%20timeline%20footage%20professional%20video%20editor%20setup%20dark%20studio%20environment%20cinematic%20lighting&width=400&height=220&seq=cat-video-001&orientation=landscape',
  },
  {
    id: 8,
    name: 'Translation',
    description: 'Professional translation, localization, and interpretation services',
    icon: 'ri-translate-2',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    count: 430,
    subcategories: ['Arabic ↔ English', 'Legal Translation', 'Technical Translation', 'Website Localization', 'Subtitles', 'Proofreading'],
    image: 'https://readdy.ai/api/search-image?query=translation%20workspace%20with%20multiple%20language%20books%20dictionary%20laptop%20clean%20minimal%20desk%20professional%20translator%20environment%20natural%20light%20white%20background&width=400&height=220&seq=cat-translation-001&orientation=landscape',
  },
  {
    id: 9,
    name: 'Data Entry',
    description: 'Data processing, spreadsheets, database management, and research',
    icon: 'ri-database-2-line',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-100',
    count: 760,
    subcategories: ['Excel / Google Sheets', 'Data Cleaning', 'Web Research', 'CRM Data Entry', 'PDF to Excel', 'Database Management'],
    image: 'https://readdy.ai/api/search-image?query=data%20entry%20workspace%20with%20spreadsheets%20on%20laptop%20screen%20organized%20desk%20clean%20professional%20environment%20minimal%20white%20background%20office%20setting&width=400&height=220&seq=cat-data-001&orientation=landscape',
  },
];

export default function CategoriesPage() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.subcategories.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const totalTasks = categories.reduce((s, c) => s + c.count, 0);

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-[#1a1a2e]">Wasla</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/helpers" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Browse Helpers</Link>
            <Link to="/tasks" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Open Tasks</Link>
            <Link to="/categories" className="text-sm font-semibold text-[#e94560]">Categories</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors whitespace-nowrap">Sign In</Link>
            <Link to="/register" className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#1a1a2e] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Browse by Category</h1>
          <p className="text-white/60 mb-2">Find the right talent across {categories.length} service categories</p>
          <p className="text-white/40 text-sm mb-8">{totalTasks.toLocaleString()}+ tasks posted</p>
          <div className="relative max-w-xl mx-auto">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories or skills..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e94560]/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No categories match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((cat) => (
              <div
                key={cat.id}
                className={`bg-white rounded-xl border overflow-hidden hover:border-gray-200 transition-all cursor-pointer ${cat.border}`}
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
              >
                <div className="h-36 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${cat.bg}`}>
                        <i className={`${cat.icon} text-lg ${cat.color}`}></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#1a1a2e]">{cat.name}</h3>
                        <p className="text-xs text-gray-400">{cat.count.toLocaleString()} tasks</p>
                      </div>
                    </div>
                    <i className={expanded === cat.id ? 'ri-arrow-up-s-line text-gray-400' : 'ri-arrow-down-s-line text-gray-400'}></i>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                  {expanded === cat.id && (
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Subcategories</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/helpers?category=${encodeURIComponent(cat.name)}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <Link
                      to={`/helpers?category=${encodeURIComponent(cat.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                    >
                      Browse Helpers
                    </Link>
                    <Link
                      to={`/tasks?category=${encodeURIComponent(cat.name)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 text-center py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap"
                    >
                      View Tasks
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#1a1a2e] py-14 mt-6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Can't find what you need?</h2>
          <p className="text-white/60 mb-6">Post a task and let helpers come to you with their best offers</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-[#e94560] text-white rounded-md font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">
              Post a Task
            </Link>
            <Link to="/helpers" className="px-6 py-3 bg-white/10 text-white rounded-md font-semibold hover:bg-white/20 transition-colors whitespace-nowrap">
              Browse Helpers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
