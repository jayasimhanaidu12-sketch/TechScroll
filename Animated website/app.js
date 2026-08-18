const API_BASE = 'http://127.0.0.1:8000/api';

const state = {
  profile: {
    confidence: 0.91,
    interests: [
      { name: 'Software Engineering', score: 0.86 },
      { name: 'AI & Machine Learning', score: 0.62 },
      { name: 'Data & Analytics', score: 0.38 },
      { name: 'Product Design', score: 0.22 },
    ],
    insight: "You are not just curious about Java — you are following the systems that make software scale.",
    evidence: [
      { source: "Spring Boot APIs That Don't Break at Scale", signals: ['java', 'backend', 'api'] },
      { source: 'The Laptop Setup That Survives a Launch', signals: ['developer', 'workflow'] },
      { source: 'Building a Real-Time Event Pipeline with Kafka', signals: ['java', 'kafka', 'event-driven'] },
    ],
  },
  recommendation: {
    id: 'reel-01', title: 'Building a Real-Time Event Pipeline with Kafka', creator: 'Mina Patel', category: 'Software Engineering', difficulty: 'Advanced', duration: '08:42', score: 8.72, color: 'mint', description: 'Move from a Java event to a production-ready stream that can keep up with your product.', tags: ['java', 'backend', 'kafka', 'event-driven'], reason: 'Semantic match to your software-building signals, with a practical next step for your current level.', formula: { interest: 0.86, career: 0.90, engagement: 0.91, diversity: 0.84, difficulty: 0.88, hype_penalty: 0.04, repetition_penalty: 0 }
  },
  alternatives: [
    { id: 'reel-03', title: "Spring Boot APIs That Don't Break at Scale", creator: 'Arjun Rao', category: 'Software Engineering', difficulty: 'Intermediate', duration: '11:26', score: 8.44, color: 'blue' },
    { id: 'reel-07', title: 'Threat Modeling Your First API', creator: 'Sana Ali', category: 'Cybersecurity', difficulty: 'Intermediate', duration: '07:31', score: 6.92, color: 'red' },
    { id: 'reel-04', title: 'How I Think About ML Systems', creator: 'Nora Chen', category: 'AI & Machine Learning', difficulty: 'Advanced', duration: '09:04', score: 6.71, color: 'violet' },
  ],
  library: [
    { id: 'reel-01', title: 'Building a Real-Time Event Pipeline with Kafka', creator: 'Mina Patel', category: 'Software Engineering', difficulty: 'Advanced', duration: '08:42', color: 'mint', tags: ['java', 'backend', 'kafka'] },
    { id: 'reel-02', title: '10 AI Tools Every Developer Needs', creator: 'The Stack Daily', category: 'AI & Machine Learning', difficulty: 'Beginner', duration: '05:18', color: 'pink', tags: ['ai tools', 'developer'] },
    { id: 'reel-03', title: "Spring Boot APIs That Don't Break at Scale", creator: 'Arjun Rao', category: 'Software Engineering', difficulty: 'Intermediate', duration: '11:26', color: 'blue', tags: ['java', 'spring boot', 'api'] },
    { id: 'reel-04', title: 'How I Think About ML Systems', creator: 'Nora Chen', category: 'AI & Machine Learning', difficulty: 'Advanced', duration: '09:04', color: 'violet', tags: ['python', 'machine learning'] },
    { id: 'reel-05', title: "A Designer's Guide to Developer Tools", creator: 'Lena Okafor', category: 'Product Design', difficulty: 'Intermediate', duration: '06:52', color: 'amber', tags: ['figma', 'product'] },
    { id: 'reel-06', title: 'Reading a Dashboard Like an Engineer', creator: 'Data With Dan', category: 'Data & Analytics', difficulty: 'Beginner', duration: '04:36', color: 'cyan', tags: ['dashboard', 'metrics'] },
    { id: 'reel-07', title: 'Threat Modeling Your First API', creator: 'Sana Ali', category: 'Cybersecurity', difficulty: 'Intermediate', duration: '07:31', color: 'red', tags: ['security', 'api'] },
    { id: 'reel-08', title: 'The Laptop Setup That Survives a Launch', creator: 'Build Mode', category: 'Software Engineering', difficulty: 'Beginner', duration: '03:58', color: 'lime', tags: ['laptop', 'workflow'] },
    { id: 'reel-09', title: 'What Actually Happens When You Type a URL', creator: 'Packet Walk', category: 'Networking', difficulty: 'Beginner', duration: '05:44', color: 'cyan', tags: ['dns', 'http', 'web'] },
    { id: 'reel-10', title: 'Docker in 60 Seconds: Images, Containers, Ports', creator: 'Ship It', category: 'DevOps & Cloud', difficulty: 'Beginner', duration: '04:12', color: 'blue', tags: ['docker', 'containers', 'cloud'] },
    { id: 'reel-11', title: 'Build a RAG App Without the Buzzwords', creator: 'Nora Chen', category: 'AI & Machine Learning', difficulty: 'Intermediate', duration: '10:18', color: 'violet', tags: ['rag', 'embeddings', 'llm'] },
    { id: 'reel-12', title: 'Git Branches Without the Confusion', creator: 'Commit Club', category: 'Software Engineering', difficulty: 'Beginner', duration: '03:27', color: 'mint', tags: ['git', 'github', 'collaboration'] },
    { id: 'reel-13', title: 'SQL Joins Explained with One Coffee Shop', creator: 'Data With Dan', category: 'Data & Analytics', difficulty: 'Beginner', duration: '06:06', color: 'amber', tags: ['sql', 'database', 'data'] },
    { id: 'reel-14', title: 'React State: The Part Beginners Miss', creator: 'Frontend Fieldnotes', category: 'Frontend Engineering', difficulty: 'Intermediate', duration: '08:11', color: 'pink', tags: ['react', 'javascript', 'frontend'] },
    { id: 'reel-15', title: 'How Public-Key Cryptography Works', creator: 'Secure By Design', category: 'Cybersecurity', difficulty: 'Intermediate', duration: '07:02', color: 'red', tags: ['cryptography', 'https', 'encryption'] },
    { id: 'reel-16', title: 'The 5-Minute System Design Interview', creator: 'Mina Patel', category: 'Software Engineering', difficulty: 'Advanced', duration: '09:40', color: 'lime', tags: ['system design', 'architecture', 'scale'] },
    { id: 'reel-17', title: 'Edge Computing: Why the Server Moved Closer', creator: 'Cloud Atlas', category: 'DevOps & Cloud', difficulty: 'Intermediate', duration: '05:51', color: 'blue', tags: ['edge', 'cloud', 'latency'] },
    { id: 'reel-18', title: 'Computer Vision Is More Than Image Labels', creator: 'Model Room', category: 'AI & Machine Learning', difficulty: 'Advanced', duration: '08:35', color: 'violet', tags: ['computer vision', 'python'] },
    { id: 'reel-19', title: 'Design Tokens: The Secret Behind Consistent UIs', creator: 'Lena Okafor', category: 'Product Design', difficulty: 'Intermediate', duration: '06:28', color: 'amber', tags: ['design systems', 'tokens', 'figma'] },
    { id: 'reel-20', title: 'The Internet of Things, Without the Hype', creator: 'Signal Lab', category: 'Emerging Tech', difficulty: 'Intermediate', duration: '07:48', color: 'cyan', tags: ['iot', 'sensors', 'hardware'] },
  ],
  reelFilter: 'All topics',
  apiOnline: false,
  trapMode: 'semantic',
  feedback: null,
};

const icon = (name, size = 18) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp: '<path d="m5 12 7-7 7 7M12 5v14"/>',
    spark: '<path d="m12 3-1.7 5.3L5 10l5.3 1.7L12 17l1.7-5.3L19 10l-5.3-1.7L12 3Z"/><path d="m5 17-.7 2.3L2 20l2.3.7L5 23l.7-2.3L8 20l-2.3-.7L5 17Z"/>',
    play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l2.5 2"/>',
    eye: '<path d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"/><circle cx="12" cy="12" r="2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    route: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h4a4 4 0 0 0 4-4V10a4 4 0 0 1 4-4"/>',
    arrowLine: '<path d="m12 19 7-7-7-7M19 12H5"/>',
    thumb: '<path d="M7 10v10H4V10h3ZM7 20h9.2a2 2 0 0 0 1.9-1.4l1.3-4.1A2 2 0 0 0 17.5 12H14l.5-4.1A2.4 2.4 0 0 0 12.1 5L7 10"/>',
    save: '<path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-4-6 4V4Z"/>',
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
};

const route = () => (window.location.hash.replace(/^#\/?/, '') || 'home').split('/')[0];
const scorePct = (score) => `${Math.round(Number(score || 0) * 100)}%`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

async function api(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1400);
  try {
    const response = await fetch(`${API_BASE}${path}`, { ...options, signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
    if (!response.ok) throw new Error(`API ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function setApiStatus(online) {
  state.apiOnline = online;
  const el = document.getElementById('api-status');
  if (el) el.innerHTML = `<span></span> ${online ? 'api connected' : 'demo mode'}`;
  if (el) el.classList.toggle('is-online', online);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

function shellHeader(eyebrow, title, copy) {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div><p class="heading-copy">${copy}</p></div>`;
}

function interestBars(compact = false) {
  return `<div class="interest-bars ${compact ? 'compact' : ''}">${state.profile.interests.map((item, index) => `<div class="interest-row"><div class="interest-meta"><span>${escapeHtml(item.name)}</span><strong>${scorePct(item.score)}</strong></div><div class="meter"><span style="width:${scorePct(item.score)};animation-delay:${index * 90}ms"></span></div></div>`).join('')}</div>`;
}

function statCard(label, value, note, tone = '') {
  return `<div class="stat-card ${tone}"><span class="stat-label">${label}</span><strong>${value}</strong><span class="stat-note">${note}</span></div>`;
}

function reelPoster(reel, large = false) {
  return `<div class="reel-poster poster-${reel.color || 'mint'} ${large ? 'poster-large' : ''}"><div class="poster-grid"></div><span class="poster-index">${reel.id ? reel.id.replace('reel-', '#') : '#01'}</span><span class="poster-orbit"></span><div class="poster-word">${(reel.category || 'TECH').split(' ')[0]}<br><em>signal</em></div><button class="play-button" aria-label="Play reel">${icon('play', 16)}</button></div>`;
}

function button(label, routeName, extra = '') { return `<a class="button ${extra}" href="#/${routeName}">${label} ${icon('arrow', 16)}</a>`; }

function renderHome() {
  return `<section class="home-page">
    <div class="home-hero"><div class="hero-orb orb-one"></div><div class="hero-orb orb-two"></div><div class="hero-copy-block"><p class="eyebrow reveal-in">A semantic content engine</p><h1 class="hero-title reveal-in">Don't stop<br><span>scrolling.</span><br><em>Start discovering.</em></h1><p class="hero-description reveal-in delay-1">TechScroll AI reads the intent behind what you watch — and turns scattered curiosity into the next thing worth your time.</p><div class="hero-actions reveal-in delay-2">${button('See your signal map', 'dashboard', 'button-primary')}<a class="text-link" href="#/demo">Explore the trap scenario ${icon('arrow', 15)}</a></div></div><div class="hero-signal-card reveal-in delay-2"><div class="signal-card-top"><span class="signal-pulse"></span><span>LIVE INTEREST GRAPH</span><span class="signal-percent">91%</span></div><div class="signal-graph"><span class="graph-line"></span><span class="graph-line line-2"></span><span class="graph-node node-a">Java</span><span class="graph-node node-b">APIs</span><span class="graph-node node-c">Scale</span><span class="graph-node node-d">You</span></div><div class="signal-card-bottom"><span>3 surface signals</span><span>1 underlying intent</span></div></div></div>
    <div class="home-proof"><div><span class="proof-number">01</span><p>Observe the full context</p></div><div><span class="proof-number">02</span><p>Infer what you actually mean</p></div><div><span class="proof-number">03</span><p>Recommend the right next step</p></div><div class="proof-cta">${button('Open Alex’s workspace', 'dashboard', 'button-small')}</div></div>
    <div class="home-feature"><div><p class="eyebrow">The problem with keyword feeds</p><h2>Java is a word.<br><span>Your intent is a system.</span></h2></div><div class="feature-right"><p>Most feeds see the keyword and stop there. TechScroll connects the role, the device, the watch behavior, and the adjacent concepts to understand the interest underneath.</p><a class="text-link" href="#/explain">See how the signal is built ${icon('arrow', 15)}</a></div></div>
  </section>`;
}

function renderDashboard() {
  return `<section class="dashboard-page page-enter">${shellHeader('Workspace / Alex Morgan', 'Your feed learned the difference.', 'A calm view of what your scroll is becoming. No labels. Just the signal underneath.')}
    <div class="dashboard-stats">${statCard('Signal confidence', '91%', '↑ 14% this week', 'stat-mint')}${statCard('Learning streak', '07', 'days in a row', 'stat-blue')}${statCard('Signals captured', '24', 'across 8 reels', 'stat-purple')}${statCard('Next up', '08:42', 'recommended for you', 'stat-dark')}</div>
    <div class="dashboard-grid"><div class="panel profile-panel"><div class="panel-heading"><div><p class="eyebrow">01 / Interest profile</p><h2>What pulls you in</h2></div><span class="panel-icon">${icon('spark', 19)}</span></div><p class="panel-intro">Your profile is built from patterns, not single-word labels. The more you explore, the sharper it gets.</p>${interestBars()}<div class="profile-insight"><span class="insight-icon">${icon('spark', 16)}</span><div><span class="mini-label">AI INSIGHT</span><p>${state.profile.insight}</p></div></div></div>
      <div class="panel pulse-panel"><div class="panel-heading"><div><p class="eyebrow">02 / Signal pulse</p><h2>Right now</h2></div><span class="live-chip"><span></span> active</span></div><div class="pulse-visual"><div class="pulse-ring ring-1"></div><div class="pulse-ring ring-2"></div><div class="pulse-ring ring-3"></div><div class="pulse-core">${icon('spark', 24)}</div><span class="pulse-label label-top">software<br><b>systems</b></span><span class="pulse-label label-left">career<br><b>growth</b></span><span class="pulse-label label-right">builder<br><b>mindset</b></span></div><div class="pulse-footer"><span>Strongest signal</span><strong>Software Engineering</strong><span class="pulse-arrow">↗</span></div></div></div>
    <div class="lower-grid"><div class="panel watched-panel"><div class="panel-heading"><div><p class="eyebrow">03 / Recent watch history</p><h2>Signals in motion</h2></div><a class="text-link" href="#/explain">View map ${icon('arrow', 15)}</a></div><div class="watch-list">${state.profile.evidence.map((item, i) => `<div class="watch-item"><div class="watch-number">0${i + 1}</div><div class="watch-icon tone-${['mint','blue','purple'][i]}">${icon(i === 0 ? 'layers' : i === 1 ? 'route' : 'spark', 18)}</div><div class="watch-copy"><strong>${escapeHtml(item.source)}</strong><span>${item.signals.map((signal) => `<b>${escapeHtml(signal)}</b>`).join(' ')}</span></div><span class="watch-time">${['2m ago','18m ago','yesterday'][i]}</span></div>`).join('')}</div></div><div class="panel next-panel"><p class="eyebrow">Your next unlock</p><div class="next-icon">${icon('arrowUp', 22)}</div><h3>Go one layer deeper</h3><p>You have the pattern. Now meet the practical system behind it.</p>${button('View recommendation', 'recommendation', 'button-small button-primary')}</div></div>
  </section>`;
}

function formulaRow(label, value, negative = false) { return `<div class="formula-row"><span>${label}</span><div class="formula-meter"><span class="${negative ? 'negative' : ''}" style="width:${Math.min(100, Math.max(4, Number(value) * 100))}%"></span></div><strong>${negative ? '−' : '+'}${Number(value).toFixed(2)}</strong></div>`; }

function renderReelLibrary() {
  const topics = ['All topics', ...new Set(state.library.map((item) => item.category))];
  const filtered = state.reelFilter === 'All topics' ? state.library : state.library.filter((item) => item.category === state.reelFilter);
  return `<section class="reel-library"><div class="library-heading"><div><p class="eyebrow">Technology reel library / ${state.library.length} reels</p><h2>Keep the signal moving.</h2><p>Short, useful explainers across the stack — from browser requests to system design.</p></div><span class="library-count">${filtered.length.toString().padStart(2, '0')} <small>shown</small></span></div><div class="library-filters">${topics.map((topic) => `<button class="library-filter ${topic === state.reelFilter ? 'active' : ''}" data-reel-filter="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join('')}</div><div class="reel-library-grid">${filtered.map((item, index) => `<a class="library-card" href="#/explain"><div class="library-card-top"><span class="library-index">${String(index + 1).padStart(2, '0')}</span>${reelPoster(item)}<span class="library-duration">${item.duration}</span></div><div class="library-card-copy"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.creator)} · ${escapeHtml(item.difficulty)}</p><div>${(item.tags || []).slice(0, 3).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join('')}</div></div></a>`).join('')}</div></section>`;
}

function renderRecommendation() {
  const reel = state.recommendation;
  return `<section class="recommendation-page page-enter">${shellHeader('Recommendation / 01', 'The right next thing.', 'A recommendation that respects where you are, then gives you somewhere better to go.')}
    <div class="recommendation-feature"><div class="featured-video">${reelPoster(reel, true)}<div class="video-overlay"><span>RECOMMENDED REEL</span><strong>${reel.duration}</strong></div></div><div class="recommendation-copy"><div class="recommendation-kicker"><span class="match-badge">${Math.round(reel.score * 10)}% match</span><span class="muted">ranked just now</span></div><h2>${escapeHtml(reel.title)}</h2><p class="creator">with <strong>${escapeHtml(reel.creator)}</strong> <span class="verified">✓</span></p><p class="rec-description">${escapeHtml(reel.description)}</p><div class="tag-list">${reel.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join('')}</div><div class="why-box"><span class="why-icon">${icon('spark', 17)}</span><div><span class="mini-label">WHY THIS, WHY NOW</span><p>${escapeHtml(reel.reason)}</p></div></div><div class="feedback-row"><span>Does this feel right?</span><button class="feedback-button ${state.feedback === 'up' ? 'selected' : ''}" data-feedback="up" data-reel="${reel.id}">${icon('thumb', 17)} Yes</button><button class="feedback-button ${state.feedback === 'down' ? 'selected down' : ''}" data-feedback="down" data-reel="${reel.id}">${icon('thumb', 17)} Not quite</button><button class="save-button ${state.feedback === 'save' ? 'selected' : ''}" data-feedback="save" data-reel="${reel.id}">${icon('save', 17)}</button></div></div></div>
    <div class="recommendation-bottom"><div class="panel formula-panel"><div class="panel-heading"><div><p class="eyebrow">The scoring layer</p><h3>Why it ranked #1</h3></div><span class="score-number">${reel.score}<small>/ 10</small></span></div><p class="panel-intro">Every recommendation balances relevance with usefulness. Hype is a penalty, not a shortcut.</p>${formulaRow('Interest match', reel.formula.interest)}${formulaRow('Career adjacency', reel.formula.career)}${formulaRow('Engagement quality', reel.formula.engagement)}${formulaRow('Difficulty fit', reel.formula.difficulty)}${formulaRow('Hype penalty', reel.formula.hype_penalty, true)}<div class="formula-equation">Interest + Career + Engagement + Diversity + Difficulty <span>− Hype</span></div></div><div class="panel alternatives-panel"><div class="panel-heading"><div><p class="eyebrow">The short list</p><h3>Also worth your time</h3></div><span class="panel-icon">${icon('layers', 18)}</span></div><div class="alternative-list">${state.alternatives.map((item, i) => `<a class="alternative" href="#/explain"><span class="alt-index">0${i + 2}</span>${reelPoster(item)}<span class="alt-copy"><strong>${escapeHtml(item.title)}</strong><small>${item.category} · ${item.duration}</small></span><span class="alt-score">${item.score}</span></a>`).join('')}</div></div></div>${renderReelLibrary()}
  </section>`;
}

function renderExplain() {
  return `<section class="explain-page page-enter">${shellHeader('Explainability / Signal map', 'Show your work, AI.', 'Trust comes from seeing the path between a tiny interaction and a meaningful recommendation.')}
    <div class="explain-flow"><div class="flow-step"><span class="step-index">01</span><div class="flow-icon tone-mint">${icon('eye', 22)}</div><p class="eyebrow">Observed</p><h3>Surface signals</h3><p>Three reels, one laptop, a high completion rate, and a repeat return to backend content.</p><div class="signal-pills"><span>Java</span><span>software engineer</span><span>laptop</span><span>API</span></div></div><div class="flow-connector">${icon('arrow', 20)}</div><div class="flow-step active-step"><span class="step-index">02</span><div class="flow-icon tone-blue">${icon('spark', 22)}</div><p class="eyebrow">Interpreted</p><h3>Underlying intent</h3><p>Java is treated as evidence inside a larger context — not as the answer by itself.</p><div class="interpretation"><span class="mini-label">SEMANTIC READ</span><strong>Building software systems that scale</strong><span>confidence 0.91</span></div></div><div class="flow-connector">${icon('arrow', 20)}</div><div class="flow-step"><span class="step-index">03</span><div class="flow-icon tone-purple">${icon('route', 22)}</div><p class="eyebrow">Delivered</p><h3>Next best step</h3><p>The system picks a practical, adjacent challenge instead of another noisy listicle.</p><div class="delivered-mini"><span class="mini-poster">01</span><span><strong>Kafka event pipeline</strong><small>8.72 ranking score</small></span></div></div></div>
    <div class="evidence-grid"><div class="panel evidence-panel"><div class="panel-heading"><div><p class="eyebrow">Evidence ledger</p><h2>Small clues.<br><span>Clearer signal.</span></h2></div></div>${state.profile.evidence.map((item, index) => `<div class="evidence-row"><span class="evidence-num">0${index + 1}</span><div><strong>${escapeHtml(item.source)}</strong><p>Added <b>${item.signals.join(' · ')}</b> to the software systems cluster.</p></div><span class="evidence-confidence">+${[34, 22, 19][index]}%</span></div>`).join('')}</div><div class="panel principles-panel"><p class="eyebrow">Design principles</p><div class="principle"><span>01</span><strong>Context over keywords</strong><p>Single terms are clues. Intent lives in the relationships between them.</p></div><div class="principle"><span>02</span><strong>Useful over viral</strong><p>Hype gets a measurable penalty when it is not backed by signal quality.</p></div><div class="principle"><span>03</span><strong>Explain every jump</strong><p>Every recommended reel can show its route back to your behavior.</p></div></div></div>
  </section>`;
}

function renderDemo() {
  const semantic = state.trapMode === 'semantic';
  return `<section class="demo-page page-enter">${shellHeader('Demo / The trap scenario', 'A keyword can be right<br>and still be wrong.', 'The moment that makes the value obvious: both systems see Java. Only one understands Alex.')}
    <div class="demo-switcher"><button class="demo-toggle ${!semantic ? 'active' : ''}" data-trap-mode="keyword">Keyword matching</button><button class="demo-toggle ${semantic ? 'active' : ''}" data-trap-mode="semantic">TechScroll AI</button><span class="switcher-label">Compare the read <span>↔</span></span></div>
    <div class="trap-stage"><div class="trap-context"><div class="context-header"><span class="step-index">INPUT</span><span class="live-chip"><span></span> Alex's session</span></div><h3>What the feed sees</h3><div class="context-card"><div class="context-avatar">AM</div><div><strong>Alex Morgan</strong><span>Software Engineer · 7 day streak</span></div></div><div class="context-signals"><span class="eyebrow">Interaction context</span><div class="context-signal primary">${icon('spark', 15)} Java <small>watched 96%</small></div><div class="context-signal">${icon('route', 15)} Software engineer <small>profile context</small></div><div class="context-signal">${icon('layers', 15)} Laptop + API + backend <small>adjacent signals</small></div></div><div class="context-foot"><span>3 signals</span><span>→</span><span>1 intent</span></div></div><div class="trap-result ${semantic ? 'semantic-result' : 'keyword-result'}"><div class="result-top"><div><span class="eyebrow">${semantic ? 'TECHSCROLL AI / SEMANTIC READ' : 'KEYWORD MATCHING / LITERAL READ'}</span><h2>${semantic ? 'Software Engineering' : 'Java content'}</h2></div><span class="result-score">${semantic ? '0.91' : '0.38'}<small>confidence</small></span></div><div class="result-divider"></div><div class="result-reel-label"><span class="eyebrow">Recommended next</span><span class="trap-verdict ${semantic ? 'good' : 'bad'}">${semantic ? 'signal aligned' : 'trap triggered'}</span></div><div class="result-reel">${reelPoster(semantic ? state.recommendation : { id: 'reel-02', color: 'pink', category: 'AI Tools' })}<div><h3>${semantic ? state.recommendation.title : '10 AI Tools Every Developer Needs'}</h3><p>${semantic ? 'Build the system behind the interest.' : 'A viral listicle with a 0.95 hype score.'}</p></div></div><div class="result-explanation"><span class="explanation-mark">${icon(semantic ? 'check' : 'spark', 17)}</span><p>${semantic ? 'The model connected Java + role + behavior + adjacent systems into a practical software engineering path.' : 'Java appeared. Context disappeared. The feed optimized for clicks, not Alex’s direction.'}</p></div></div></div>
    <div class="demo-takeaway"><span class="eyebrow">The takeaway</span><h2>From “what did they tap?”<br>to <span>“what are they becoming?”</span></h2><div>${button('See the signal map', 'explain', 'button-primary')}</div></div>
  </section>`;
}

function renderHomeLoading() { return `<div class="loading-page"><div class="loading-mark"><span></span><span></span><span></span></div><p>Reading the signal...</p></div>`; }

function render() {
  const currentRoute = route();
  const views = { home: renderHome, dashboard: renderDashboard, recommendation: renderRecommendation, explain: renderExplain, demo: renderDemo };
  document.querySelectorAll('[data-nav]').forEach((link) => link.classList.toggle('active', link.dataset.nav === currentRoute));
  document.getElementById('app').innerHTML = (views[currentRoute] || renderHome)();
  requestAnimationFrame(() => document.querySelectorAll('.reveal-in').forEach((el) => el.classList.add('visible')));
}

async function loadLiveData() {
  try {
    const [health, dashboard, catalog] = await Promise.all([api('/health'), api('/dashboard?student_id=alex'), api('/reels?limit=20')]);
    setApiStatus(Boolean(health && health.status === 'ok'));
    if (dashboard.profile) state.profile = dashboard.profile;
    if (catalog.reels && catalog.reels.length) state.library = catalog.reels;
    const rec = await api('/recommend', { method: 'POST', body: JSON.stringify({ student_id: 'alex', profile: state.profile }) });
    if (rec.recommendation) {
      state.recommendation = { ...state.recommendation, ...rec.recommendation, formula: rec.recommendation.formula || state.recommendation.formula };
      state.alternatives = (rec.alternatives || state.alternatives).map((item) => ({ ...item, tags: item.tags || [] }));
    }
  } catch (error) {
    setApiStatus(false);
  }
  if (route() !== 'home') render();
}

async function handleFeedback(buttonEl) {
  const feedback = buttonEl.dataset.feedback;
  state.feedback = feedback;
  document.querySelectorAll('.feedback-button, .save-button').forEach((button) => button.classList.remove('selected', 'down'));
  buttonEl.classList.add('selected');
  if (feedback === 'down') buttonEl.classList.add('down');
  showToast(feedback === 'up' ? 'Signal confirmed. We’ll find more like this.' : feedback === 'save' ? 'Saved to your learning path.' : 'Noted. Your next recommendation will adapt.');
  try { await api('/feedback', { method: 'POST', body: JSON.stringify({ student_id: 'alex', reel_id: state.recommendation.id, feedback }) }); } catch (error) { /* demo fallback stays local */ }
}

document.addEventListener('click', (event) => {
  const feedbackButton = event.target.closest('[data-feedback]');
  if (feedbackButton) handleFeedback(feedbackButton);
  const trapButton = event.target.closest('[data-trap-mode]');
  if (trapButton) { state.trapMode = trapButton.dataset.trapMode; render(); }
  const filterButton = event.target.closest('[data-reel-filter]');
  if (filterButton) { state.reelFilter = filterButton.dataset.reelFilter; render(); }
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => { render(); loadLiveData(); });
