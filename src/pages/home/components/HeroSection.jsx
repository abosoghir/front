import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '120K+', label: 'Tasks Completed' },
  { value: '4.9★', label: 'Avg. Rating' },
  { value: '98%', label: 'Satisfaction' },
];
const categories = [
  'Web Development', 'UI/UX Design', 'Mobile Apps', 'Writing', 'Marketing', 'Video Editing',
];
function InteractiveBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };
    const draw = (time) => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const CONNECTION_DIST = 130;
      const MOUSE_DIST = 180;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5; }
        }
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.2 + 0.8;
        const alpha = p.opacity * pulse;
        const glowFactor = dist < MOUSE_DIST ? 1 + (1 - dist / MOUSE_DIST) * 1.5 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * glowFactor, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 69, 96, ${alpha * glowFactor})`;
        ctx.fill();
        if (dist < MOUSE_DIST) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * glowFactor * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * glowFactor * 3);
          grad.addColorStop(0, `rgba(233, 69, 96, ${0.15 * (1 - dist / MOUSE_DIST)})`);
          grad.addColorStop(1, 'rgba(233, 69, 96, 0)');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            const aDist = Math.sqrt((a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2);
            const bDist = Math.sqrt((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2);
            const nearMouse = Math.min(aDist, bDist) < MOUSE_DIST;
            const lineAlpha = nearMouse ? alpha * 2.5 : alpha;
            const lineColor = nearMouse ? `rgba(233, 69, 96, ${lineAlpha})` : `rgba(100, 140, 220, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = nearMouse ? 1.2 : 0.6;
            ctx.stroke();
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    resize();
    animFrameRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(135deg, #0d0d1a 0%, #0f1628 40%, #12102a 70%, #0d0d1a 100%)' }}
    />
  );
}
export default function HeroSection() {
  const [search, setSearch] = useState('');
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <InteractiveBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d1a]/75 via-[#0d0d1a]/40 to-transparent pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e94560] animate-pulse"></span>
            <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">Connect · Collaborate · Complete</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Find Your
            <span className="block text-[#e94560]">Perfect Helper</span>
            <span className="block text-white/90 text-4xl md:text-5xl font-semibold mt-1">Or Offer Your Skills</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed">
            Wasla connects service seekers with talented freelancers across multiple categories. Post your need or showcase your expertise — get things done.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 flex items-center bg-white rounded-lg px-4 gap-3">
              <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                <i className="ri-search-line text-lg"></i>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a skill or service..."
                className="flex-1 py-3.5 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400"
              />
            </div>
            <Link
              to="/helpers"
              className="whitespace-nowrap px-6 py-3.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors text-center"
            >
              Find Helpers
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="text-xs text-white/50 self-center mr-1">Popular:</span>
            {categories.map((cat) => (
              <a
                key={cat}
                href="#categories"
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-colors cursor-pointer whitespace-nowrap"
              >
                {cat}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-56 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="flex items-center gap-3">
              <img
                src="https://readdy.ai/api/search-image?query=professional%20young%20man%20avatar%20portrait%20clean%20white%20background%20friendly%20smile%20developer&width=48&height=48&seq=avatar-001&orientation=squarish"
                alt="Helper"
                className="w-10 h-10 rounded-full object-cover object-top"
              />
              <div>
                <div className="text-white text-sm font-semibold">Ahmed K.</div>
                <div className="text-white/60 text-xs">Full-Stack Dev</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1,2,3,4,5].map(i => <i key={i} className="ri-star-fill text-yellow-400 text-xs"></i>)}
              <span className="text-white/60 text-xs ml-1">5.0 (142)</span>
            </div>
            <div className="mt-2 text-[#e94560] text-sm font-bold">$45/hr</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-56" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20">
                <i className="ri-check-line text-green-400 text-sm"></i>
              </div>
              <div>
                <div className="text-white text-xs font-semibold">Task Completed!</div>
                <div className="text-white/50 text-xs">Logo Design · $120</div>
              </div>
            </div>
            <div className="text-white/40 text-xs">2 minutes ago</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-56">
            <div className="text-white/60 text-xs mb-2">New Offer Received</div>
            <div className="text-white text-sm font-semibold">Mobile App Development</div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[#e94560] font-bold text-sm">$850</span>
              <span className="text-xs text-white/50">3 offers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-xs">Scroll to explore</span>
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-arrow-down-line text-white/40"></i>
        </div>
      </div>
    </section>
  );
}