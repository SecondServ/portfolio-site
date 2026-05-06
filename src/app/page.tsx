'use client';

import { useState, useEffect, useRef } from 'react';
import PROFILE from '@/data/profile';
import type { WorkExperience, Project } from '@/types';
import {
  Mail, MapPin, Link as LinkIcon, GitFork,
  ExternalLink, X, Eye, Star, BarChart2, ChevronDown,
} from 'lucide-react';

// ── Tableau types ─────────────────────────────────────────────────────────────
interface TableauViz {
  workbookRepoUrl: string;
  title: string;
  defaultViewName: string;
  viewCount: number;
  numberOfFavorites: number;
  defaultViewRepoUrl: string;
}

function viewSlug(viz: TableauViz) {
  return viz.defaultViewRepoUrl.split('/sheets/')[1] ?? viz.defaultViewName.replace(/\s+/g, '');
}
function embedUrl(viz: TableauViz) {
  return `https://public.tableau.com/views/${viz.workbookRepoUrl}/${viewSlug(viz)}?:embed=y&:showVizHome=no&:toolbar=yes&:language=en-US&:display_count=n`;
}
function thumbnailUrl(viz: TableauViz) {
  const prefix = viz.workbookRepoUrl.slice(0, 2);
  return `https://public.tableau.com/static/images/${prefix}/${viz.workbookRepoUrl}/${viewSlug(viz)}/1_rss.png`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(d: string) {
  if (!d) return '';
  if (/present/i.test(d)) return 'present';
  const p = new Date(d);
  if (!isNaN(p.getTime())) return p.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return d;
}

function calcMonths(start: string, end: string) {
  const s = new Date(start);
  const e = /present/i.test(end) ? new Date() : new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 0;
  return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
}

function fmtDuration(months: number) {
  if (months <= 0) return '';
  const y = Math.floor(months / 12), m = months % 12;
  return m > 0 ? `${y}y ${m}m` : `${y}y`;
}

function linkIcon(label: string) {
  if (label.toLowerCase().includes('github')) return <GitFork className="w-3.5 h-3.5" />;
  return <LinkIcon className="w-3.5 h-3.5" />;
}

// ── Cyberpunk avatar ──────────────────────────────────────────────────────────
const GLITCH_CSS = `
  @keyframes glitch-main {
    0%,88%,100% { clip-path:inset(0 0 0 0); transform:translate(0); }
    89%         { clip-path:inset(18% 0 55% 0); transform:translate(-5px,0); }
    90%         { clip-path:inset(52% 0 18% 0); transform:translate( 5px,0); }
    91%         { clip-path:inset(32% 0 48% 0); transform:translate(-3px,0); }
    92%         { clip-path:inset(0 0 0 0);     transform:translate(0); }
  }
  @keyframes glitch-red {
    0%,88%,100% { opacity:0; }
    89%         { opacity:0.55; clip-path:inset(40% 0 35% 0); transform:translate(6px,0); }
    90%         { opacity:0.55; clip-path:inset(10% 0 70% 0); transform:translate(-4px,0); }
    91%         { opacity:0; }
  }
  @keyframes glitch-cyan {
    0%,89%,100% { opacity:0; }
    90%          { opacity:0.4; clip-path:inset(60% 0 15% 0); transform:translate(-5px,0); }
    91%          { opacity:0; }
  }
  .glitch-main { animation: glitch-main 7s steps(1) infinite; }
  .glitch-red  { animation: glitch-red  7s steps(1) infinite; }
  .glitch-cyan { animation: glitch-cyan 7s steps(1) infinite; }
`;

function CyberpunkAvatar({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const lg = size === 'lg';
  return (
    <>
      {lg && <style>{GLITCH_CSS}</style>}
      <div className={`relative shrink-0 ${lg ? 'w-24 h-24' : 'w-9 h-9'}`} style={{ isolation: 'isolate' }}>
        <div
          className={`relative overflow-hidden w-full h-full ${lg ? 'rounded-2xl' : 'rounded-xl'} border border-cyan-500/30`}
          style={lg ? { boxShadow: '0 0 28px rgba(6,182,212,0.18), inset 0 0 0 1px rgba(6,182,212,0.08)' } : undefined}
        >
          <img src="/avatar.jpg" alt=""
            className={`${lg ? 'glitch-main' : ''} w-full h-full object-cover object-top`}
            style={{ filter: 'grayscale(1) contrast(1.3) brightness(0.78)' }}
          />
          {lg && (
            <img src="/avatar.jpg" alt="" aria-hidden
              className="glitch-red absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(1) contrast(1.4) sepia(1) hue-rotate(290deg) saturate(3)', mixBlendMode: 'screen', opacity: 0 }}
            />
          )}
          {lg && (
            <img src="/avatar.jpg" alt="" aria-hidden
              className="glitch-cyan absolute inset-0 w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(1) contrast(1.4) sepia(1) hue-rotate(160deg) saturate(4)', mixBlendMode: 'screen', opacity: 0 }}
            />
          )}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(6,182,212,0.38)', mixBlendMode: 'color' }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.13) 2px,rgba(0,0,0,0.13) 4px)' }} />
          <div className="absolute inset-x-0 bottom-0 h-6 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,12,20,0.55))' }} />
        </div>
        {lg && (
          <>
            <span className="absolute top-0 left-0  w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/70 rounded-tl-sm" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/70 rounded-tr-sm" />
            <span className="absolute bottom-0 left-0  w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/70 rounded-bl-sm" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/70 rounded-br-sm" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080c14]" />
          </>
        )}
      </div>
    </>
  );
}

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  bg:     'bg-[#080c14]',
  card:   'bg-[#0e1420]',
  border: 'border-[#1e2836]',
  text:   'text-[#cdd6e0]',
  muted:  'text-[#546278]',
  cyan:   'text-cyan-400',
};

const SECTION_IDS = ['tableau', 'experience', 'skills', 'projects', 'education'] as const;
const SECTION_LABELS: Record<string, string> = {
  tableau:    '// dashboards',
  experience: '// experience',
  skills:     '// skills',
  projects:   '// projects',
  education:  '// education',
};

// ── Tableau card ──────────────────────────────────────────────────────────────
function TableauCard({ viz, onClick }: { viz: TableauViz; onClick: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <button onClick={onClick}
      className={`group text-left ${C.card} border ${C.border} rounded-xl overflow-hidden hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 transition-all flex flex-col`}>
      <div className="relative w-full h-40 bg-[#060a10] overflow-hidden shrink-0">
        {!imgErr ? (
          <img src={thumbnailUrl(viz)} alt={viz.title}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BarChart2 className="w-12 h-12 text-cyan-900" />
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />
        <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/8 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono text-cyan-300 bg-[#080c14]/80 px-3 py-1.5 rounded border border-cyan-500/30">
            OPEN →
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className={`text-sm font-semibold ${C.text} leading-snug line-clamp-2`}>{viz.title}</h3>
        <div className="flex items-center gap-3 mt-1">
          <span className={`flex items-center gap-1 text-xs font-mono ${C.muted}`}>
            <Eye className="w-3 h-3" />{viz.viewCount.toLocaleString()}
          </span>
          {viz.numberOfFavorites > 0 && (
            <span className={`flex items-center gap-1 text-xs font-mono ${C.muted}`}>
              <Star className="w-3 h-3" />{viz.numberOfFavorites}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

// ── Experience row ────────────────────────────────────────────────────────────
function ExperienceRow({ job }: { job: WorkExperience }) {
  const [open, setOpen] = useState(true);
  const months = calcMonths(job.startDate, job.endDate);
  const dur = fmtDuration(months);

  return (
    <div className="border-l-2 border-[#1e2836] hover:border-cyan-500/50 pl-5 pb-8 transition-colors">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left group">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <span className={`text-sm font-semibold ${C.text}`}>{job.title}</span>
            <span className={`ml-2 text-xs font-mono ${C.cyan} opacity-80`}>{job.company}</span>
            {job.location && (
              <span className={`ml-2 text-xs font-mono ${C.muted}`}>
                <MapPin className="w-2.5 h-2.5 inline mr-0.5" />{job.location}
              </span>
            )}
          </div>
          <div className={`flex items-center gap-2 font-mono text-xs ${C.muted} shrink-0`}>
            <span>{formatDate(job.startDate)} → {formatDate(job.endDate)}</span>
            {dur && <span className="text-emerald-400 opacity-80">[{dur}]</span>}
            {job.bullets.length > 0 && (
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            )}
          </div>
        </div>
      </button>
      {open && job.bullets.length > 0 && (
        <ul className="mt-3 space-y-2">
          {job.bullets.map((b, i) => (
            <li key={i} className={`flex gap-2.5 text-sm ${C.muted} leading-relaxed`}>
              <span className={`mt-1.5 shrink-0 font-mono text-xs ${C.cyan}`}>›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  return (
    <div className={`${C.card} border ${C.border} rounded-xl p-5 hover:border-violet-500/30 transition-all`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={`text-sm font-semibold ${C.text}`}>{project.name}</h3>
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer"
            className={`${C.muted} hover:text-cyan-400 transition-colors shrink-0`}>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
      <p className={`text-xs ${C.muted} leading-relaxed mb-3`}>{project.description}</p>
      {project.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Contact section ───────────────────────────────────────────────────────────
function ContactSection() {
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errMsg, setErrMsg]   = useState('');

  const handleSend = async () => {
    if (!message.trim()) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() || undefined, message: message.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Send failed');
      setStatus('sent');
      setName(''); setMessage('');
    } catch (e) {
      setErrMsg(String(e));
      setStatus('error');
    }
  };

  return (
    <section>
      <div className="mb-8">
        <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Leave a message</span>
      </div>
      <div className={`${C.card} border ${C.border} rounded-xl p-6 max-w-xl`}>
        {status === 'sent' ? (
          <div className="py-6 text-center">
            <p className="text-emerald-400 font-mono text-sm mb-1">{'>'} message_sent.ok</p>
            <p className={`text-xs ${C.muted}`}>I'll get back to you soon.</p>
            <button onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-mono text-cyan-400 hover:underline">→ send another</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className={`block text-[10px] font-mono uppercase tracking-widest ${C.muted} mb-1.5`}>
                your name <span className="opacity-50">(optional)</span>
              </label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="anonymous"
                className={`w-full bg-[#080c14] border ${C.border} rounded-lg px-3 py-2 text-sm font-mono ${C.text} placeholder:text-[#2a3545] focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors`}
              />
            </div>
            <div>
              <label className={`block text-[10px] font-mono uppercase tracking-widest ${C.muted} mb-1.5`}>
                message <span className="text-red-400">*</span>
              </label>
              <textarea value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend(); }}
                placeholder={`Hi ${PROFILE.name.split(' ')[0]}, …`} rows={5}
                className={`w-full bg-[#080c14] border ${C.border} rounded-lg px-3 py-2 text-sm font-mono ${C.text} placeholder:text-[#2a3545] focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors resize-none`}
              />
              <p className={`text-[10px] font-mono ${C.muted} mt-1`}>⌘ + Enter to send</p>
            </div>
            {status === 'error' && (
              <p className="text-xs font-mono text-red-400">{'>'} error: {errMsg}</p>
            )}
            <button onClick={handleSend} disabled={!message.trim() || status === 'sending'}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              {status === 'sending' ? (
                <><span className="w-3 h-3 border border-cyan-400/50 border-t-cyan-400 rounded-full animate-spin" />sending…</>
              ) : '→ send'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const profile = PROFILE;

  const [activeSection, setActiveSection] = useState('tableau');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [tableauVizzes, setTableauVizzes] = useState<TableauViz[]>([]);
  const [tableauLoading, setTableauLoading] = useState(false);
  const [selectedViz, setSelectedViz] = useState<TableauViz | null>(null);

  useEffect(() => {
    const tableauLink = profile.links.find(l => l.url.includes('public.tableau.com'));
    const username    = tableauLink?.url.match(/profile\/([^/?#]+)/)?.[1] ?? 'zzh520';
    setTableauLoading(true);
    fetch(`/api/tableau-vizzes?username=${encodeURIComponent(username)}`)
      .then(r => r.json())
      .then(data => Array.isArray(data) && setTableauVizzes(data))
      .catch(() => {})
      .finally(() => setTableauLoading(false));
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = sectionRefs.current[id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -55% 0px' },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [tableauVizzes]);

  const yrsExp      = new Date().getFullYear() - 2020;
  const skillsCount = profile.skills.reduce((n, g) => n + g.items.length, 0);

  const hasSection: Record<string, boolean> = {
    tableau:    tableauLoading || tableauVizzes.length > 0,
    experience: profile.experience.length > 0,
    skills:     profile.skills.length > 0,
    projects:   profile.projects.length > 0,
    education:  profile.education.length > 0,
  };
  const visibleSections = SECTION_IDS.filter(id => hasSection[id]);

  const dotBg = {
    backgroundImage: 'radial-gradient(circle, rgba(34,211,238,0.07) 1px, transparent 1px)',
    backgroundSize:  '28px 28px',
  };

  return (
    <div className={`min-h-screen ${C.bg} ${C.text}`} style={dotBg}>

      {/* ── Hero ── */}
      <div className={`border-b ${C.border} bg-[#080c14]/95`}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <CyberpunkAvatar size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className={`text-3xl font-bold ${C.text} tracking-tight`}>{profile.name}</h1>
                {profile.title && (
                  <span className="text-sm font-mono text-cyan-400/80">{profile.title}</span>
                )}
              </div>
              <div className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs font-mono ${C.muted}`}>
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Mail className="w-3 h-3" />{profile.email}
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />{profile.location}
                </span>
                {profile.links.map(link => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    {linkIcon(link.label)}{link.label}
                  </a>
                ))}
              </div>
              {profile.summary && (
                <p className={`mt-4 text-sm ${C.muted} leading-relaxed max-w-2xl border-l-2 border-cyan-500/20 pl-3`}>
                  {profile.summary}
                </p>
              )}
            </div>
          </div>

          {/* Stats bar */}
          <div className={`mt-8 pt-6 border-t ${C.border} grid grid-cols-2 sm:grid-cols-4 gap-4`}>
            {[
              { label: 'yrs_experience', value: yrsExp },
              { label: 'roles',          value: profile.experience.length },
              { label: 'skills',         value: skillsCount },
              { label: 'dashboards',     value: tableauLoading ? '…' : tableauVizzes.length },
            ].map(({ label, value }) => (
              <div key={label} className={`${C.card} border ${C.border} rounded-lg p-3`}>
                <div className={`text-2xl font-bold font-mono ${C.cyan}`}>{value}</div>
                <div className={`text-[10px] font-mono mt-0.5 ${C.muted}`}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky nav ── */}
      <div className={`sticky top-0 z-40 border-b ${C.border} bg-[#080c14]/95 backdrop-blur`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-0 overflow-x-auto">
            {visibleSections.map(id => (
              <button key={id}
                onClick={() => sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className={`px-4 py-3 text-xs font-mono whitespace-nowrap border-b-2 transition-colors ${
                  activeSection === id
                    ? 'border-cyan-400 text-cyan-400'
                    : `border-transparent ${C.muted} hover:text-cyan-400/70`
                }`}>
                {SECTION_LABELS[id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-6 pb-32 pt-14 space-y-24">

        {/* Tableau gallery */}
        {hasSection.tableau && (
          <section id="tableau" ref={el => { sectionRefs.current['tableau'] = el; }}>
            <div className="flex items-center gap-3 mb-8">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">Tableau Gallery</span>
              {!tableauLoading && (
                <span className={`text-xs font-mono ${C.muted}`}>— {tableauVizzes.length} published</span>
              )}
            </div>
            {tableauLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(n => (
                  <div key={n} className={`${C.card} border ${C.border} rounded-xl h-52 animate-pulse`} />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tableauVizzes.map(viz => (
                  <TableauCard key={viz.workbookRepoUrl} viz={viz} onClick={() => setSelectedViz(viz)} />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Experience */}
        {hasSection.experience && (
          <section id="experience" ref={el => { sectionRefs.current['experience'] = el; }}>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs font-mono text-violet-400 tracking-widest uppercase">Experience</span>
              <span className={`text-xs font-mono ${C.muted}`}>— {yrsExp}y total</span>
            </div>
            <div className="space-y-0">
              {profile.experience.map((job, i) => <ExperienceRow key={i} job={job} />)}
            </div>
          </section>
        )}

        {/* Skills */}
        {hasSection.skills && (
          <section id="skills" ref={el => { sectionRefs.current['skills'] = el; }}>
            <div className="mb-8">
              <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">Skills</span>
            </div>
            <div className={`${C.card} border ${C.border} rounded-xl p-6 space-y-4`}>
              {profile.skills.map((group, gi) => {
                const colors = [
                  'text-cyan-400 border-cyan-500/20 bg-cyan-500/8',
                  'text-violet-400 border-violet-500/20 bg-violet-500/8',
                  'text-emerald-400 border-emerald-500/20 bg-emerald-500/8',
                  'text-amber-400 border-amber-500/20 bg-amber-500/8',
                  'text-rose-400 border-rose-500/20 bg-rose-500/8',
                  'text-sky-400 border-sky-500/20 bg-sky-500/8',
                ];
                return (
                  <div key={gi} className={`flex items-baseline gap-4 border-t pt-4 first:border-0 first:pt-0 ${C.border}`}>
                    <span className={`text-[10px] font-mono ${C.muted} w-32 shrink-0 pt-0.5 uppercase tracking-wide`}>
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map(item => (
                        <span key={item} className={`text-[11px] font-mono px-2 py-0.5 rounded border ${colors[gi % colors.length]}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Projects */}
        {hasSection.projects && (
          <section id="projects" ref={el => { sectionRefs.current['projects'] = el; }}>
            <div className="mb-8">
              <span className="text-xs font-mono text-amber-400 tracking-widest uppercase">Projects</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.projects.map((project, i) => <ProjectCard key={i} project={project} />)}
            </div>
          </section>
        )}

        {/* Education */}
        {hasSection.education && (
          <section id="education" ref={el => { sectionRefs.current['education'] = el; }}>
            <div className="mb-8">
              <span className="text-xs font-mono text-rose-400 tracking-widest uppercase">Education</span>
            </div>
            <div className="space-y-3">
              {profile.education.map((edu, i) => (
                <div key={i} className={`${C.card} border ${C.border} rounded-xl p-5 flex flex-wrap items-baseline justify-between gap-3`}>
                  <div>
                    <span className={`text-sm font-semibold ${C.text}`}>{edu.institution}</span>
                    <p className="text-xs font-mono text-cyan-400/80 mt-0.5">
                      {[edu.degree, edu.field].filter(Boolean).join(' / ')}
                    </p>
                    <div className={`flex gap-3 mt-1 text-xs font-mono ${C.muted}`}>
                      {edu.gpa && <span>GPA {edu.gpa}</span>}
                      {edu.honors && <span>{edu.honors}</span>}
                    </div>
                  </div>
                  {edu.graduationDate && (
                    <span className={`text-xs font-mono ${C.muted}`}>{formatDate(edu.graduationDate)}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <section>
            <div className="mb-6">
              <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">Certifications</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.certifications.map((cert, i) => (
                <div key={i} className={`${C.card} border ${C.border} rounded-lg px-4 py-3`}>
                  <p className={`text-xs font-semibold ${C.text}`}>{cert.name}</p>
                  <p className={`text-[10px] font-mono mt-0.5 ${C.muted}`}>
                    {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <ContactSection />
      </div>

      {/* Footer */}
      <div className={`border-t ${C.border}`}>
        <div className={`max-w-5xl mx-auto px-6 py-5 flex items-center justify-between font-mono text-xs ${C.muted}`}>
          <CyberpunkAvatar size="sm" />
          <span className="text-cyan-500/40">{'{ data · analysis · insight }'}</span>
          <a href={`mailto:${profile.email}`} className="hover:text-cyan-400 transition-colors">
            {profile.email}
          </a>
        </div>
      </div>

      {/* Tableau embed modal */}
      {selectedViz && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setSelectedViz(null)}>
          <div className={`${C.card} border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col`}
            style={{ width: '92vw', height: '88vh', maxWidth: 1280 }}>
            <div className={`flex items-center justify-between px-5 py-3 border-b ${C.border} shrink-0`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <BarChart2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className={`text-sm font-mono ${C.text} truncate`}>{selectedViz.title}</span>
                <a href={`https://public.tableau.com/app/profile/zzh520/viz/${selectedViz.workbookRepoUrl}`}
                  target="_blank" rel="noopener noreferrer"
                  className={`${C.muted} hover:text-cyan-400 transition-colors shrink-0`}
                  onClick={e => e.stopPropagation()}>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <button onClick={() => setSelectedViz(null)}
                className={`${C.muted} hover:text-cyan-400 hover:bg-cyan-500/10 p-1.5 rounded-lg transition-colors shrink-0`}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <iframe src={embedUrl(selectedViz)} className="flex-1 w-full border-0 bg-white"
              title={selectedViz.title} allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
