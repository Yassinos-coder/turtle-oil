import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CONTRACT_ADDRESS = '5yFLXHSM2MX7w8HdyirwJX6BRqSJdJjQ1Chvs8Ndjhs9'

const URLS = {
  dexscreener: 'https://dexscreener.com/solana/bvp2nlexhu92mnfyrrgqkxdc2m3axvzun5bsjfwihzrq',
  raydium: 'https://raydium.io/swap/?inputMint=sol&outputMint=5yFLXHSM2MX7w8HdyirwJX6BRqSJdJjQ1Chvs8Ndjhs9',
  telegram: 'https://t.me/turletoil',
  twitter: 'https://twitter.com',
}

// ─── Toast ───────────────────────────────────────────────────────────────────

function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-7 py-3 rounded-full font-bold shadow-2xl shadow-yellow-500/40 text-sm whitespace-nowrap"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/75 backdrop-blur-xl border-b border-yellow-500/15 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">🐢</span>
          <span className="font-black text-xl gold-text tracking-tight">$TOIL</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {['About', 'Tokenomics', 'Links'].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="hover:text-yellow-400 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contract"
            className="bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-500/20 transition-all duration-200"
          >
            Contract
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

// ─── Oil Particle Background ──────────────────────────────────────────────────

function OilBackground() {
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 4 + Math.random() * 5,
      delay: Math.random() * 4,
      color: i % 3 === 0 ? '#d4a017' : i % 3 === 1 ? '#10b981' : '#ffd700',
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#080f09] to-[#050505]" />

      {/* Central gold radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(212,160,23,0.07) 0%, rgba(16,185,129,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Animated wave layers */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 inset-x-0"
          style={{
            height: `${25 + i * 12}%`,
            background: `radial-gradient(ellipse at 50% 100%, ${
              i % 2 === 0 ? 'rgba(212,160,23,0.055)' : 'rgba(16,185,129,0.035)'
            } 0%, transparent 65%)`,
          }}
          animate={{ y: [0, -12, 0], scaleX: [1, 1.015, 1] }}
          transition={{
            duration: 5 + i * 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.1,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.25,
          }}
          animate={{ y: [0, -24, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Scroll Reveal Wrapper ────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase mb-4">
      {children}
    </p>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <OilBackground />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-semibold px-5 py-2.5 rounded-full mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live on Solana Mainnet
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-9xl font-black leading-[0.9] tracking-tight gold-text mb-4"
        >
          Turtle Oil
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400/70 mb-6 tracking-wide"
        >
          $TOIL
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl text-gray-300/90 mb-14 font-light"
        >
          Slow money. Real wealth.&nbsp;&nbsp;🐢🛢️
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={URLS.dexscreener}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(212,160,23,0.55)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black font-bold rounded-full text-base tracking-wide transition-all shadow-lg shadow-yellow-500/20"
          >
            View on Dexscreener
          </motion.a>
          <motion.a
            href={URLS.raydium}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(16,185,129,0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-9 py-4 bg-transparent border-2 border-emerald-500 text-emerald-400 font-bold rounded-full text-base tracking-wide hover:bg-emerald-500/10 transition-all"
          >
            Buy on Raydium
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="mt-20 text-gray-500"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Contract Section ─────────────────────────────────────────────────────────

function ContractSection({ onCopy }) {
  return (
    <section id="contract" className="py-28 px-6">
      <Reveal className="max-w-3xl mx-auto text-center">
        <SectionLabel>Smart Contract</SectionLabel>
        <h2 className="text-4xl font-black text-white mb-3">Contract Address</h2>
        <p className="text-gray-400 mb-10">The official $TOIL token on Solana</p>

        {/* Address box */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <code className="text-yellow-400 font-mono text-xs sm:text-sm break-all leading-relaxed">
              {CONTRACT_ADDRESS}
            </code>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: '0 0 20px rgba(212,160,23,0.35)' }}
              whileTap={{ scale: 0.93 }}
              onClick={onCopy}
              className="flex-shrink-0 flex items-center gap-2 bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/30 text-yellow-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              <span>📋</span> Copy
            </motion.button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'LP Burned 🔥', glow: 'orange' },
            { label: 'Mint Disabled ✅', glow: 'emerald' },
            { label: 'Freeze Disabled ✅', glow: 'emerald' },
          ].map(({ label }) => (
            <span
              key={label}
              className="bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-5 py-2 rounded-full text-sm font-semibold"
            >
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <Reveal>
          <SectionLabel>The Philosophy</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            The Patient Path<br />
            <span className="emerald-gold-text">to Real Wealth</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-5">
            Turtle Oil is a Solana-based meme token built on patience, accumulation, and long-term growth. No rush. No panic. Just steady expansion.
          </p>
          <p className="text-gray-400 text-base leading-relaxed">
            While others ape in and out chasing quick flips, the TOIL holder accumulates quietly — like crude oil forming deep underground, wealth builds slowly, then all at once.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-0.5 w-10 bg-gradient-to-r from-yellow-500 to-transparent rounded" />
            <span className="text-yellow-400/80 text-sm font-medium italic">
              "Slow is smooth. Smooth is rich."
            </span>
          </div>
        </Reveal>

        {/* Floating Turtle Visual */}
        <Reveal delay={0.15} className="flex justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #d4a017, #10b981, #ffd700, #10b981, #d4a017)',
                padding: '1.5px',
                borderRadius: '9999px',
              }}
            >
              <div className="w-full h-full rounded-full bg-[#080f09]" />
            </motion.div>

            {/* Inner glow disc */}
            <div
              className="absolute inset-5 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(212,160,23,0.14) 0%, rgba(16,185,129,0.06) 55%, transparent 80%)',
              }}
            />

            {/* Floating turtle */}
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                filter: 'drop-shadow(0 0 28px rgba(212,160,23,0.6)) drop-shadow(0 0 60px rgba(212,160,23,0.25))',
              }}
            >
              <span className="text-[7rem] select-none leading-none">🐢</span>
            </motion.div>

            {/* Oil barrel floating nearby */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              className="absolute bottom-6 right-4 text-4xl select-none"
              style={{ filter: 'drop-shadow(0 0 12px rgba(212,160,23,0.45))' }}
            >
              🛢️
            </motion.div>

            {/* Orbiting gold dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: i === 1 ? '#10b981' : '#d4a017',
                  top: '50%',
                  left: '50%',
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 1.2,
                }}
                transformTemplate={({ rotate }) =>
                  `rotate(${rotate}) translateX(${120 + i * 14}px) rotate(-${rotate})`
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Tokenomics Section ───────────────────────────────────────────────────────

const TOKENOMICS = [
  { icon: '💰', label: 'Total Supply', value: '1,000,000,000', sub: 'TOIL' },
  { icon: '🔥', label: 'Liquidity Pool', value: 'Burned', sub: 'Forever locked' },
  { icon: '🚫', label: 'Mint Authority', value: 'Disabled', sub: 'No new tokens' },
  { icon: '❄️', label: 'Freeze Authority', value: 'Disabled', sub: 'Full freedom' },
  { icon: '⛓️', label: 'Blockchain', value: 'Solana', sub: 'Lightning fast' },
  { icon: '🐢', label: 'Strategy', value: 'HODL', sub: 'Patience pays' },
]

function TokenomicsCard({ icon, label, value, sub, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.04, borderColor: 'rgba(212,160,23,0.45)' }}
      className="glass-card rounded-2xl p-6 text-center flex flex-col items-center gap-2 cursor-default transition-colors"
    >
      <span className="text-4xl mb-1">{icon}</span>
      <span className="text-yellow-400 font-black text-lg leading-tight">{value}</span>
      <span className="text-white/80 text-sm font-semibold">{label}</span>
      <span className="text-gray-500 text-xs">{sub}</span>
    </motion.div>
  )
}

function TokenomicsSection() {
  return (
    <section id="tokenomics" className="py-24 px-6">
      <Reveal className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Tokenomics</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Built for the{' '}
            <span className="emerald-gold-text">Long Game</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {TOKENOMICS.map((item, i) => (
            <TokenomicsCard key={item.label} {...item} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Mascot Feature Section ───────────────────────────────────────────────────

function MascotSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 65%)',
        }}
      />

      <Reveal className="max-w-4xl mx-auto text-center">
        <SectionLabel>The Legend</SectionLabel>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
          Meet the{' '}
          <span className="gold-text">Oil Baron</span>
        </h2>
        <p className="text-gray-400 text-lg mb-16 max-w-lg mx-auto">
          Patient. Deliberate. Inevitable. The turtle does not rush — and that is exactly why he always arrives first.
        </p>

        {/* Premium mascot card */}
        <div className="relative inline-flex items-center justify-center">
          {/* Outer rotating gradient ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full"
            style={{
              background:
                'conic-gradient(from 0deg, #d4a017 0%, #10b981 25%, #ffd700 50%, #10b981 75%, #d4a017 100%)',
              padding: '2px',
              borderRadius: '9999px',
            }}
          >
            <div className="w-full h-full rounded-full bg-[#08100a]" />
          </motion.div>

          {/* Middle ring (counter-rotating) */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-yellow-500/20"
            style={{
              borderStyle: 'dashed',
            }}
          />

          {/* Card surface */}
          <div
            className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full flex items-center justify-center"
            style={{
              background:
                'radial-gradient(circle, rgba(212,160,23,0.18) 0%, rgba(16,185,129,0.07) 50%, rgba(8,16,10,0.95) 80%)',
            }}
          >
            {/* Floating turtle */}
            <motion.div
              animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                filter:
                  'drop-shadow(0 0 30px rgba(212,160,23,0.7)) drop-shadow(0 0 70px rgba(212,160,23,0.3))',
              }}
            >
              <span className="text-8xl sm:text-9xl select-none leading-none">🐢</span>
            </motion.div>

            {/* Crown */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl select-none"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))' }}
            >
              👑
            </motion.div>
          </div>

          {/* Orbiting icons */}
          {[
            { emoji: '🛢️', angle: 30, r: 155 },
            { emoji: '💎', angle: 150, r: 155 },
            { emoji: '📈', angle: 270, r: 155 },
          ].map(({ emoji, angle, r }) => {
            const rad = (angle * Math.PI) / 180
            return (
              <motion.div
                key={emoji}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute text-2xl select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: '0 0',
                }}
                transformTemplate={({ rotate }) =>
                  `rotate(${rotate}) translateX(${r}px) rotate(-${rotate})`
                }
              >
                <span style={{ filter: 'drop-shadow(0 0 8px rgba(212,160,23,0.5))' }}>
                  {emoji}
                </span>
              </motion.div>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Links Section ────────────────────────────────────────────────────────────

const LINKS = [
  {
    icon: '📈',
    label: 'Dexscreener',
    desc: 'Track price & chart',
    href: URLS.dexscreener,
    from: 'from-yellow-500/15',
    to: 'to-yellow-600/10',
    border: 'border-yellow-500/25',
    text: 'text-yellow-400',
    glow: 'rgba(212,160,23,0.4)',
  },
  {
    icon: '🔄',
    label: 'Buy on Raydium',
    desc: 'Swap SOL → $TOIL',
    href: URLS.raydium,
    from: 'from-emerald-500/15',
    to: 'to-emerald-600/10',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    icon: '🐦',
    label: 'Twitter / X',
    desc: 'Follow the journey',
    href: URLS.twitter,
    from: 'from-sky-500/15',
    to: 'to-sky-600/10',
    border: 'border-sky-500/25',
    text: 'text-sky-400',
    glow: 'rgba(56,189,248,0.35)',
  },
  {
    icon: '✈️',
    label: 'Telegram',
    desc: 'Join the community',
    href: URLS.telegram,
    from: 'from-blue-500/15',
    to: 'to-blue-600/10',
    border: 'border-blue-500/25',
    text: 'text-blue-400',
    glow: 'rgba(96,165,250,0.35)',
  },
]

function LinksSection() {
  return (
    <section id="links" className="py-24 px-6">
      <Reveal className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Community</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black text-white">Join the Journey</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LINKS.map(({ icon, label, desc, href, from, to, border, text, glow }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.06, y: -6, boxShadow: `0 16px 40px ${glow}` }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-br ${from} ${to} backdrop-blur-sm border ${border} ${text} rounded-2xl p-6 font-semibold flex flex-col items-center gap-3 transition-colors group`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-200 select-none">
                {icon}
              </span>
              <span className="text-sm font-bold">{label}</span>
              <span className="text-xs opacity-60 font-normal text-center">{desc}</span>
            </motion.a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────

function StatsBanner() {
  const stats = [
    { label: 'Token Supply', value: '1B TOIL' },
    { label: 'Network', value: 'Solana' },
    { label: 'LP Status', value: 'Burned 🔥' },
    { label: 'Rug Risk', value: 'Zero 🛡️' },
  ]

  return (
    <Reveal className="py-10 border-y border-yellow-500/10 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-yellow-400 font-black text-xl mb-0.5">{value}</p>
            <p className="text-gray-500 text-xs tracking-wide uppercase">{label}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-yellow-500/10 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.04) 0%, transparent 60%)',
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-6 select-none"
          style={{ filter: 'drop-shadow(0 0 20px rgba(212,160,23,0.5))' }}
        >
          🐢
        </motion.div>

        <p className="text-2xl font-black gold-text mb-3">The turtle always wins 🐢</p>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed mb-8">
          This is a meme coin. Do your own research. Cryptocurrency investments carry significant risk. Past performance does not guarantee future results. Never invest more than you can afford to lose.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <span>© 2025 Turtle Oil ($TOIL)</span>
          <span>·</span>
          <span>Built on Solana</span>
          <span>·</span>
          <span>Community Token</span>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [toast, setToast] = useState({ visible: false, message: '' })

  const showToast = (message) => {
    setToast({ visible: true, message })
    setTimeout(() => setToast({ visible: false, message: '' }), 3000)
  }

  const handleCopyContract = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
      showToast('✅ Contract address copied!')
    } catch {
      showToast('❌ Copy failed — please copy manually')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Toast message={toast.message} visible={toast.visible} />
      <HeroSection />
      <StatsBanner />
      <ContractSection onCopy={handleCopyContract} />
      <AboutSection />
      <TokenomicsSection />
      <MascotSection />
      <LinksSection />
      <Footer />
    </div>
  )
}
