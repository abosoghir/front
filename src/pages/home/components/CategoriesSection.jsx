const categories = [
  {
    name: 'Web Development',
    count: '2,400+ Helpers',
    icon: 'ri-code-s-slash-line',
    image: 'https://readdy.ai/api/search-image?query=web%20development%20coding%20laptop%20screen%20code%20editor%20dark%20theme%20modern%20clean%20professional%20developer%20workspace%20minimal%20background%20technology%20abstract&width=400&height=300&seq=cat-web-001&orientation=landscape',
    color: 'from-[#1a1a2e]/70',
  },
  {
    name: 'UI/UX Design',
    count: '1,800+ Helpers',
    icon: 'ri-palette-line',
    image: 'https://readdy.ai/api/search-image?query=UI%20UX%20design%20wireframe%20prototype%20figma%20design%20tool%20colorful%20interface%20mockup%20creative%20workspace%20modern%20clean%20minimal%20professional%20designer&width=400&height=400&seq=cat-design-001&orientation=squarish',
    color: 'from-[#e94560]/70',
  },
  {
    name: 'Mobile Development',
    count: '1,200+ Helpers',
    icon: 'ri-smartphone-line',
    image: 'https://readdy.ai/api/search-image?query=mobile%20app%20development%20smartphone%20screen%20app%20interface%20modern%20clean%20technology%20developer%20coding%20professional%20minimal%20background&width=400&height=300&seq=cat-mobile-001&orientation=landscape',
    color: 'from-[#1a1a2e]/70',
  },
  {
    name: 'Graphic Design',
    count: '3,100+ Helpers',
    icon: 'ri-brush-line',
    image: 'https://readdy.ai/api/search-image?query=graphic%20design%20creative%20artwork%20colorful%20poster%20branding%20logo%20design%20professional%20designer%20workspace%20modern%20clean%20minimal%20artistic&width=400&height=500&seq=cat-graphic-001&orientation=portrait',
    color: 'from-[#e94560]/70',
  },
  {
    name: 'Content Writing',
    count: '2,700+ Helpers',
    icon: 'ri-quill-pen-line',
    image: 'https://readdy.ai/api/search-image?query=content%20writing%20copywriting%20person%20writing%20notebook%20laptop%20creative%20workspace%20minimal%20clean%20professional%20warm%20light%20cozy%20atmosphere&width=400&height=300&seq=cat-writing-001&orientation=landscape',
    color: 'from-[#1a1a2e]/70',
  },
  {
    name: 'Digital Marketing',
    count: '1,500+ Helpers',
    icon: 'ri-megaphone-line',
    image: 'https://readdy.ai/api/search-image?query=digital%20marketing%20social%20media%20analytics%20dashboard%20charts%20graphs%20modern%20professional%20workspace%20clean%20minimal%20technology%20business%20growth&width=400&height=300&seq=cat-marketing-001&orientation=landscape',
    color: 'from-[#e94560]/70',
  },
  {
    name: 'Video Editing',
    count: '980+ Helpers',
    icon: 'ri-film-line',
    image: 'https://readdy.ai/api/search-image?query=video%20editing%20timeline%20software%20creative%20editor%20professional%20workspace%20monitor%20screen%20modern%20clean%20minimal%20filmmaker%20post%20production&width=400&height=400&seq=cat-video-001&orientation=squarish',
    color: 'from-[#1a1a2e]/70',
  },
  {
    name: 'Data Entry',
    count: '4,200+ Helpers',
    icon: 'ri-database-2-line',
    image: 'https://readdy.ai/api/search-image?query=data%20entry%20spreadsheet%20database%20computer%20work%20professional%20office%20clean%20minimal%20modern%20workspace%20organized%20efficient%20business&width=400&height=300&seq=cat-data-001&orientation=landscape',
    color: 'from-[#e94560]/70',
  },
];
export default function CategoriesSection() {
  return (
    <section id="categories" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#e94560] mb-3 block">Explore Categories</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Find Helpers in Every Field
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Browse through our diverse range of service categories and find the perfect match.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="/helpers"
              className="group relative rounded-xl overflow-hidden cursor-pointer block"
              style={{ height: i % 3 === 1 ? '220px' : '180px' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent group-hover:opacity-90 transition-opacity`}></div>
              <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                <span className="text-white text-xs font-medium">{cat.count}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 flex items-center justify-center">
                    <i className={`${cat.icon} text-white text-base`}></i>
                  </div>
                  <span className="text-white font-semibold text-sm">{cat.name}</span>
                </div>
              </div>
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-7 h-7 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                  <i className="ri-arrow-right-up-line text-white text-sm"></i>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/helpers"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#e94560] text-[#e94560] rounded-lg font-semibold text-sm hover:bg-[#e94560] hover:text-white transition-colors whitespace-nowrap"
          >
            View All Categories
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}