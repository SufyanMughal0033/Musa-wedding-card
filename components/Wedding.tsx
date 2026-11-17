"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";
import { assets, events, type EventItem } from "@/config/site";
import { Bloom, Spray, Flourish } from "./Art";
import Curtain from "./Curtain";

const reveal = (i = 0) => ({ initial:{opacity:0,y:22}, whileInView:{opacity:1,y:0}, viewport:{once:true,margin:"-8%"}, transition:{duration:1.2,delay:i*0.2,ease:[0.22,1,0.36,1] as const} });

function Petals({ n = 14 }: { n?: number }) {
  const [p, setP] = useState<{l:number;d:number;t:number}[]>([]);
  useEffect(() => setP(Array.from({length:n},(_,i)=>({l:(i*97)%100,d:-(i*1.7),t:9+(i%5)*2}))),[n]);
  return <>{p.map((x,i)=><span key={i} aria-hidden className="petal" style={{left:`${x.l}%`,animationDelay:`${x.d}s`,animationDuration:`${x.t}s`}}/>)}</>;
}

function Music({ started }: { started: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false); const [missing, setMissing] = useState(false);
  useEffect(() => { if (!started || sessionStorage.getItem("music")==="off") return; ref.current?.play().then(()=>setOn(true)).catch(()=>{}); }, [started]);
  const toggle = () => { const a = ref.current; if (!a) return; if (on) { a.pause(); setOn(false); sessionStorage.setItem("music","off"); } else { a.play().then(()=>setOn(true)).catch(()=>setMissing(true)); sessionStorage.setItem("music","on"); } };
  return (<>
    <audio ref={ref} src={assets.music} loop preload="none" onError={()=>setMissing(true)}/>
    <button onClick={toggle} aria-pressed={on} aria-label={on?"Turn music off":"Turn music on"} title={missing?"Add an audio file to /public/audio":undefined}
      className="fixed bottom-5 right-5 z-[70] grid h-12 w-12 place-items-center rounded-full border border-gold/80 bg-warm/90 text-burgundy backdrop-blur"><span className="absolute inset-1 rounded-full border border-gold/40"/>
      {on ? <Volume2 size={18}/> : <VolumeX size={18}/>}
    </button></>);
}

function Backdrop({ src, fallback, kenburns, vertical = false }: { src: string; fallback: string; kenburns?: boolean; vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null); const reduce = useReducedMotion(); const [bad, setBad] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end","end start"] });
  const scale = useTransform(scrollYProgress,[0,1],[kenburns?1.2:1.12,1]);
  return (<div ref={ref} className="absolute inset-0 overflow-hidden" style={{background:fallback}}>
    <motion.div className={`flex h-full w-full ${vertical ? "justify-center" : ""}`} style={{scale:reduce?1:scale}}>
      {!bad && <video className={vertical ? "h-full w-auto max-w-none aspect-[9/16] object-cover object-center" : "h-full w-full object-cover object-center"} src={src} muted loop playsInline preload="auto" autoPlay onError={()=>setBad(true)}/>}
    </motion.div></div>);
}

function Location({ e, variant, dark }: { e: EventItem; variant: "arch"|"ruled"; dark?: boolean }) {
  const ready = !!e.mapLink;
  const body = (<>
    <p className="font-script text-4xl">{e.venue}</p>
    {e.mapEmbed ? <iframe title={`${e.venue} map`} src={e.mapEmbed} loading="lazy" className="mt-3 h-40 w-full border-0"/> : <p className="mt-2 text-lg italic opacity-80"></p>}
    <a href={e.mapLink||undefined} target="_blank" rel="noreferrer" aria-disabled={!ready} className={`mt-5 inline-block border-b border-gold pb-1 font-display text-xs tracking-[.35em] ${ready?"hover:text-gold":"pointer-events-none opacity-50"}`}></a></>);
  const ink = dark ? "text-ivory" : "text-burgundy";
  return variant==="arch"
    ? <div className={`mx-auto w-full max-w-sm rounded-t-full border border-gold/70 p-2 ${ink}`}><div className="rounded-t-full border border-gold/40 px-8 pb-10 pt-24 text-center">{body}</div></div>
    : <div className={`w-full max-w-md border-y border-gold/70 py-7 text-center ${ink}`}>{body}</div>;
}

function Garland() {
  return (<div aria-hidden className="absolute inset-x-0 top-0 z-[5] h-72">
    {Array.from({length:10},(_,i)=>(<div key={i} className={`sway absolute top-0 ${i%2?"hidden sm:block":""}`} style={{left:`${i*10.5+2}%`,animationDelay:`${-i*.7}s`}}>
      <div className="mx-auto h-4 w-px bg-gold/70"/>
      {Array.from({length:3+(i%4)},(_,k)=>(<div key={k} className="mx-auto -mt-1 h-7 w-7"><Bloom tone="marigold" petals={14}/></div>))}
    </div>))}</div>);
}
function FairyLights() {
  const seg = 8, W = 1000, pts: {x:number;y:number}[] = []; let d = "M0 10";
  for (let s=0; s<seg; s++) { const x0=s*W/seg, x1=(s+1)*W/seg; d += ` Q${(x0+x1)/2} 62 ${x1} 10`; for (const t of [0,.25,.5,.75]) pts.push({x:x0+(x1-x0)*t, y:10*(1-t)**2+124*(1-t)*t+10*t*t}); }
  return (<svg aria-hidden viewBox="0 0 1000 80" preserveAspectRatio="none" className="absolute inset-x-0 top-0 z-[5] h-24 w-full"><path d={d} stroke="#B69A59" strokeOpacity=".7" fill="none"/>
    {pts.map((p,i)=><circle key={i} className="twinkle" style={{animationDelay:`${(i%7)*.45}s`}} cx={p.x} cy={p.y+3} r="3.2" fill="#fff3c4"/>)}</svg>);
}

function Mehndi({ e }: { e: EventItem }) {
  return (<section id={e.id} className="relative min-h-screen overflow-hidden text-ivory">
    <Backdrop src="/videos/mehndi.mp4" fallback="linear-gradient(150deg,#0f3d2e,#1f5b44 45%,#b88a2a)"/>
    <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b21]/85 via-[#0b2b21]/45 to-transparent"/>
    <Garland/>
    <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-end gap-10 px-6 pb-24 pt-64 md:grid-cols-[1.2fr_1fr] md:items-center md:pt-24">
      <div>
        <motion.p {...reveal()} className="font-script text-3xl text-[#f3d98b] sm:text-4xl">Chapter One</motion.p>
        <motion.h2 {...reveal(1)} className="foil font-display text-[22vw] italic leading-[.9] md:text-[10rem]">Mehndi</motion.h2>
        <motion.div {...reveal(2)} className="max-w-md"><Flourish className="mt-4 w-56 !mx-0"/><p className="mt-4 font-display text-2xl tracking-[.25em] sm:text-3xl">30 DECEMBER 2026</p></motion.div>
      </div>
      <motion.div {...reveal(3)}><Location e={e} variant="arch" dark/></motion.div>
    </div></section>);
}
function Baraat({ e }: { e: EventItem }) {
  return (
    <section
      id={e.id}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#10050a] px-5 py-24 text-ivory sm:px-8"
    >
      {/* Portrait Baraat film */}
    <Backdrop
  src="/videos/baraat.mp4"
  fallback="linear-gradient(180deg,#18050b,#3d0f20 55%,#120309)"
  kenburns
/>

      {/* A single soft overlay keeps the film visible while protecting text contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,2,7,.30)_0%,rgba(12,2,7,.42)_42%,rgba(8,1,5,.82)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,1,5,.38),transparent_28%,transparent_72%,rgba(8,1,5,.38))]" />

      {/* Fine champagne frame */}
      <div aria-hidden className="pointer-events-none absolute inset-3 border border-[#d7bd83]/45 sm:inset-6">
        <div className="absolute inset-1.5 border border-[#d7bd83]/20" />
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#d7bd83]/70 bg-[#1a0710]" />
        <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rotate-45 border border-[#d7bd83]/70 bg-[#1a0710]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          {...reveal()}
          className="font-script text-3xl text-[#f0dba5] sm:text-4xl"
        >
          Chapter Two
        </motion.p>

        <motion.h2
          {...reveal(1)}
          className="mt-4 max-w-full font-display text-[clamp(3rem,10vw,7.5rem)] uppercase leading-[.95] tracking-[.10em] text-[#e2c17b] drop-shadow-[0_3px_18px_rgba(0,0,0,.55)]"
        >
          The Baraat
        </motion.h2>

        <motion.div {...reveal(2)} className="mt-8 flex w-full max-w-xs items-center justify-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a968]/80" />
          <span className="h-2 w-2 rotate-45 bg-[#d8bb7b]" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a968]/80" />
        </motion.div>

        <motion.p
          {...reveal(3)}
          className="mt-6 font-display text-lg tracking-[.28em] text-white sm:text-2xl sm:tracking-[.38em]"
        >
          31 December 2026
        </motion.p>

        <motion.div
          {...reveal(4)}
          className="mt-12 w-full max-w-md border-y border-[#d7bd83]/50 bg-[#170710]/35 px-6 py-7 backdrop-blur-[3px] sm:px-10"
        >
          <p className="font-script text-3xl text-[#f0dba5] sm:text-4xl">{e.venue}</p>
          {e.mapEmbed ? (
            <iframe
              title={`${e.venue} map`}
              src={e.mapEmbed}
              loading="lazy"
              className="mt-5 h-40 w-full border-0"
            />
          ) : (
            <p className="mt-2 text-sm italic tracking-wide text-white/75">
            </p>
          )}
          <a
            href={e.mapLink || undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!e.mapLink}
            className={`mt-6 inline-block border-b border-[#d7bd83]/70 pb-1 font-display text-[.68rem] tracking-[.32em] text-[#f0dba5] transition-colors ${
              e.mapLink ? "hover:text-white" : "pointer-events-none opacity-45"
            }`}
          >
            VIEW LOCATION
          </a>
        </motion.div>
      </div>
    </section>
  );
}
function Walima({ e }: { e: EventItem }) {
  return (<section id={e.id} className="relative min-h-screen overflow-hidden text-burgundy">
    <Backdrop src="/videos/walima.mp4" fallback="linear-gradient(180deg,#FFF9F4,#F4DCE0 65%,#D5A1AA)"/>
    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,249,244,.24),rgba(255,249,244,.62))]"/>
    <FairyLights/>
    <Spray className="absolute -bottom-16 -left-14 w-[62vw] max-w-[30rem]" tones={["white","blush","white"]}/>
    <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-end justify-center px-6 py-40 text-right">
      <motion.p {...reveal()} className="font-script text-3xl text-gold sm:text-4xl">Chapter Three</motion.p>
      <motion.h2 {...reveal(1)} className="font-script text-[24vw] leading-[.9] md:text-[11rem]">The Walima</motion.h2>
      <motion.div {...reveal(2)}><p className="font-display text-2xl tracking-[.25em] sm:text-3xl">02 JANUARY 2027</p><Flourish className="mt-4 w-56 !mr-0"/></motion.div>
      <motion.div {...reveal(3)} className="mt-12 w-full max-w-sm"><Location e={e} variant="arch"/></motion.div>
    </div></section>);
}



function Invitation() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const floatTop = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : -18, reduce ? 0 : 22]
  );

  const floatBottom = useTransform(
    scrollYProgress,
    [0, 1],
    [reduce ? 0 : 18, reduce ? 0 : -22]
  );

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[radial-gradient(ellipse_at_center,#fffaf7_0%,#f8e9e9_58%,#efdadd_100%)]"
    >
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-12 h-96 w-96 rounded-full bg-[#e7bfc5]/30 blur-3xl" />
        <div className="absolute -right-24 bottom-8 h-96 w-96 rounded-full bg-[#cda9ad]/25 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[.12]"
          style={{
            backgroundImage: "radial-gradient(#a97932 .7px, transparent .7px)",
            backgroundSize: "15px 15px",
          }}
        />
      </div>

      {/* Full screen invitation */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: .975 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 min-h-[100svh] w-full"
      >
        <div
          className="relative grid min-h-[100svh] w-full grid-cols-[16%_68%_16%] overflow-hidden sm:grid-cols-[26%_48%_26%]"
          style={{
            filter: "drop-shadow(0 18px 35px rgba(104,45,59,.14))",
          }}
        >

          {/* LEFT DECORATIVE PANEL */}
          <div className="relative overflow-hidden border-y border-l border-[#b69a59]/70 bg-[radial-gradient(ellipse_at_50%_50%,#fff8f5_0%,#f5e1e3_48%,#e9cbd0_100%)]">

            <div className="absolute inset-1 border border-[#b69a59]/45 sm:inset-3" />
            <div className="absolute inset-3 border border-[#b69a59]/25 sm:inset-6" />

            {/* Geometric ornaments */}
            <div className="absolute left-1/2 top-[18%] h-12 w-12 -translate-x-1/2 rotate-45 border border-[#b69a59]/65 sm:h-24 sm:w-24" />
            <div className="absolute left-1/2 top-[18%] h-8 w-8 -translate-x-1/2 rotate-45 border border-[#b69a59]/45 sm:h-16 sm:w-16" />

            <div className="absolute left-1/2 top-[43%] h-16 w-16 -translate-x-1/2 rounded-full border border-[#b69a59]/25 sm:h-36 sm:w-36" />
            <div className="absolute left-1/2 top-[43%] h-12 w-12 -translate-x-1/2 rounded-full border border-[#b69a59]/30 sm:h-28 sm:w-28" />

            {/* Top flowers */}
            <motion.div
              style={{ y: floatTop }}
              className="absolute -left-[65%] -top-[2%] w-[220%]"
            >
              <Spray tones={["burgundy", "blush", "white"]} />
            </motion.div>

            {/* Bottom flowers */}
            <motion.div
              style={{ y: floatBottom }}
              className="absolute -bottom-[2%] -left-[65%] w-[220%] rotate-180"
            >
              <Spray tones={["white", "blush", "burgundy"]} />
            </motion.div>

            {/* Vertical lettering */}
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
              <span className="h-8 w-px bg-[#a97932]/70 sm:h-16" />
              <span className="[writing-mode:vertical-rl] rotate-180 font-display text-[.38rem] tracking-[.20em] text-[#8b5260] sm:text-[.65rem] sm:tracking-[.28em]">
                A BEAUTIFUL BEGINNING
              </span>
              <span className="h-8 w-px bg-[#a97932]/70 sm:h-16" />
            </div>
          </div>

          {/* CENTRE IVORY INVITATION */}
          <div className="paper relative flex min-w-0 min-h-full flex-col items-center justify-center overflow-hidden border-y border-[#b69a59]/80 px-2 py-10 text-center sm:px-8 sm:py-12 lg:px-12">

            {/* Double gold frame */}
            <div className="pointer-events-none absolute inset-1.5 border border-[#b69a59]/75 sm:inset-3" />
            <div className="pointer-events-none absolute inset-3 border border-[#b69a59]/35 sm:inset-6" />
            <div className="pointer-events-none absolute inset-5 border border-[#b69a59]/15 sm:inset-9" />

            {/* Art Deco fan */}
            <svg
              aria-hidden
              viewBox="0 0 300 82"
              className="absolute left-1/2 top-3 w-[82%] -translate-x-1/2 sm:top-5"
            >
              <g fill="none" stroke="#B69A59" strokeWidth="1">
                <path d="M150 3 L150 48 M150 3 L112 48 M150 3 L188 48 M150 3 L78 48 M150 3 L222 48 M150 3 L45 48 M150 3 L255 48" />
                <path d="M35 51 H265 M60 58 H240" opacity=".7" />
                <path d="M145 48 L150 53 L155 48 L150 43 Z" fill="#B69A59" />
              </g>
            </svg>

            <div className="relative z-10 mt-8 flex w-full flex-col items-center sm:mt-12">

              {/* Arabic Bismillah */}
              <motion.p
                {...reveal()}
                lang="ar"
                dir="rtl"
                className="font-arabic text-[clamp(1rem,3.6vw,2rem)] text-burgundy"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>

              <Flourish className="mt-3 w-28 sm:mt-5 sm:w-40" />

              <motion.p
                {...reveal(1)}
                className="mt-5 font-display text-[.48rem] tracking-[.20em] text-[#895965] sm:mt-7 sm:text-[.7rem] sm:tracking-[.38em]"
              >
                TOGETHER WITH THEIR FAMILIES
              </motion.p>

              <motion.p
                {...reveal(2)}
                className="mt-6 font-display text-[.45rem] tracking-[.16em] text-[#a08049] sm:mt-8 sm:text-[.7rem] sm:tracking-[.3em]"
              >
                JOYFULLY INVITE YOU TO CELEBRATE
              </motion.p>

              {/* Bride */}
              <motion.h2
                {...reveal(3)}
                className="foil mt-4 font-script text-[clamp(2rem,8.2vw,6rem)] leading-tight"
              >
                Ansharah
              </motion.h2>

              {/* Elegant separator */}
              <motion.div
                {...reveal(4)}
                className="my-2 flex items-center gap-3 sm:gap-5"
              >
                <span className="h-px w-6 bg-[#b69a59] sm:w-14" />
                <span className="font-script text-3xl text-gold sm:text-5xl">&</span>
                <span className="h-px w-6 bg-[#b69a59] sm:w-14" />
              </motion.div>

              {/* Groom */}
              <motion.h2
                {...reveal(5)}
                className="foil font-script text-[clamp(2rem,8.2vw,6rem)] leading-tight"
              >
                Azhar
              </motion.h2>

              <div className="my-5 flex items-center gap-3 sm:my-7">
                <span className="h-px w-8 bg-[#b69a59]/70 sm:w-14" />
                <span className="text-xs text-[#b69a59]">✦</span>
                <span className="h-px w-8 bg-[#b69a59]/70 sm:w-14" />
              </div>

              <motion.p
                {...reveal(6)}
                className="max-w-[17rem] font-display text-[.46rem] leading-[2] tracking-[.15em] text-[#76505a] sm:text-[.7rem] sm:tracking-[.25em]"
              >
                REQUEST THE PLEASURE OF YOUR COMPANY
                <br />
                AS THEY CELEBRATE THEIR WEDDING
              </motion.p>

              <motion.p
                {...reveal(7)}
                className="mt-6 font-script text-lg text-[#a08049] sm:mt-8 sm:text-3xl"
              >
                With Love &amp; Blessings
              </motion.p>

              <Flourish className="mt-4 w-28 sm:mt-6 sm:w-40" />
            </div>

            {/* Corner flowers */}
            <motion.div
              style={{ y: floatTop }}
              className="pointer-events-none absolute -left-[13%] -top-[4%] w-[38%]"
            >
              <Spray tones={["burgundy", "blush", "white"]} />
            </motion.div>

            <motion.div
              style={{ y: floatTop }}
              className="pointer-events-none absolute -right-[13%] -top-[4%] w-[38%] scale-x-[-1]"
            >
              <Spray tones={["white", "blush", "burgundy"]} />
            </motion.div>

            <motion.div
              style={{ y: floatBottom }}
              className="pointer-events-none absolute -bottom-[4%] -left-[13%] w-[38%] scale-y-[-1]"
            >
              <Spray tones={["white", "blush", "burgundy"]} />
            </motion.div>

            <motion.div
              style={{ y: floatBottom }}
              className="pointer-events-none absolute -bottom-[4%] -right-[13%] w-[38%] scale-[-1]"
            >
              <Spray tones={["burgundy", "blush", "white"]} />
            </motion.div>
          </div>

          {/* RIGHT DECORATIVE PANEL */}
          <div className="relative overflow-hidden border-y border-r border-[#b69a59]/70 bg-[radial-gradient(ellipse_at_50%_50%,#fff8f5_0%,#f5e1e3_48%,#e9cbd0_100%)]">

            <div className="absolute inset-1 border border-[#b69a59]/45 sm:inset-3" />
            <div className="absolute inset-3 border border-[#b69a59]/25 sm:inset-6" />

            <div className="absolute left-1/2 top-[18%] h-12 w-12 -translate-x-1/2 rotate-45 border border-[#b69a59]/65 sm:h-24 sm:w-24" />
            <div className="absolute left-1/2 top-[18%] h-8 w-8 -translate-x-1/2 rotate-45 border border-[#b69a59]/45 sm:h-16 sm:w-16" />

            <div className="absolute left-1/2 top-[43%] h-16 w-16 -translate-x-1/2 rounded-full border border-[#b69a59]/25 sm:h-36 sm:w-36" />
            <div className="absolute left-1/2 top-[43%] h-12 w-12 -translate-x-1/2 rounded-full border border-[#b69a59]/30 sm:h-28 sm:w-28" />

            <motion.div
              style={{ y: floatTop }}
              className="absolute -right-[65%] -top-[2%] w-[220%] scale-x-[-1]"
            >
              <Spray tones={["white", "blush", "burgundy"]} />
            </motion.div>

            <motion.div
              style={{ y: floatBottom }}
              className="absolute -right-[65%] -bottom-[2%] w-[220%] scale-[-1]"
            >
              <Spray tones={["burgundy", "blush", "white"]} />
            </motion.div>

            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3">
              <span className="h-8 w-px bg-[#a97932]/70 sm:h-16" />
              <span className="[writing-mode:vertical-rl] font-display text-[.38rem] tracking-[.20em] text-[#8b5260] sm:text-[.65rem] sm:tracking-[.28em]">
                FOREVER &amp; ALWAYS
              </span>
              <span className="h-8 w-px bg-[#a97932]/70 sm:h-16" />
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

function Countdown() {
  const target = new Date(2026, 11, 31, 0, 0, 0).getTime(); // visitor's local timezone
  const [now, setNow] = useState<number|null>(null);
  useEffect(()=>{ setNow(Date.now()); const t = setInterval(()=>setNow(Date.now()),1000); return ()=>clearInterval(t); },[]);
  const diff = now===null?0:Math.max(0,target-now);
  const parts = [["Days",Math.floor(diff/864e5)],["Hours",Math.floor(diff/36e5)%24],["Minutes",Math.floor(diff/6e4)%60],["Seconds",Math.floor(diff/1e3)%60]] as const;
  return (<section className="relative bg-ivory px-4 py-28 text-center">
    <motion.h2 {...reveal()} className="font-script text-5xl sm:text-7xl">Until We Celebrate</motion.h2>
    <Flourish className="mt-4 w-56"/>
    {now!==null && diff===0 ? <p className="mt-10 font-display text-2xl italic">The celebrations have begun. Welcome.</p> :
    <div role="timer" className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-1 sm:gap-6">
      {parts.map(([l,v],i)=>(<div key={l} className="flex items-start gap-1 sm:gap-6"><div><div className="font-display text-5xl tabular-nums sm:text-8xl">{String(v).padStart(2,"0")}</div><div className="mt-1 font-script text-2xl text-gold">{l}</div></div>{i<3 && <span aria-hidden className="mt-4 text-gold sm:mt-8">&#9670;</span>}</div>))}
    </div>}
    <nav aria-label="Celebrations" className="mx-auto mt-20 flex max-w-2xl flex-col items-center justify-between gap-6 sm:flex-row">
      {events.map(e=><a key={e.id} href={`#${e.id}`} className="group text-center"><span className="block font-display text-xs tracking-[.3em] text-gold">{e.date.toUpperCase()}</span><span className="font-script text-4xl group-hover:text-gold">{e.title}</span></a>)}
    </nav></section>);
}

function Closing() {
  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,#fffaf7_0%,#f6e5e7_58%,#edcfd4_100%)] px-5 py-28 text-center">
      <Petals n={16} />

      {/* Full-height floral side decorations so the edges never feel empty */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-0 h-full w-[30%] border-r border-[#b69a59]/15 sm:w-[24%]" />
        <div className="absolute -right-16 top-0 h-full w-[30%] border-l border-[#b69a59]/15 sm:w-[24%]" />
        <div className="absolute left-0 top-1/2 h-px w-[17%] bg-gradient-to-r from-transparent to-[#b69a59]/60 sm:w-[25%]" />
        <div className="absolute right-0 top-1/2 h-px w-[17%] bg-gradient-to-l from-transparent to-[#b69a59]/60 sm:w-[25%]" />
      </div>

      {/* Left floral garland */}
      <div aria-hidden className="pointer-events-none absolute -left-[17%] top-[5%] w-[48vw] max-w-[25rem] sm:-left-[8%] sm:top-[8%] sm:w-[34vw]">
        <Spray tones={["burgundy", "blush", "white"]} />
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-[8%] -left-[15%] w-[48vw] max-w-[25rem] rotate-[-18deg] sm:-left-[7%] sm:w-[34vw]">
        <Spray tones={["white", "blush", "burgundy"]} />
      </div>

      {/* Right floral garland */}
      <div aria-hidden className="pointer-events-none absolute -right-[17%] top-[5%] w-[48vw] max-w-[25rem] scale-x-[-1] sm:-right-[8%] sm:top-[8%] sm:w-[34vw]">
        <Spray tones={["white", "blush", "burgundy"]} />
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-[8%] -right-[15%] w-[48vw] max-w-[25rem] scale-[-1] sm:-right-[7%] sm:w-[34vw]">
        <Spray tones={["burgundy", "blush", "white"]} />
      </div>

      {/* Side ornaments */}
      <div aria-hidden className="pointer-events-none absolute left-[5%] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 sm:flex">
        <span className="h-20 w-px bg-[#b69a59]/60" />
        <span className="h-3 w-3 rotate-45 border border-[#b69a59]" />
        <span className="[writing-mode:vertical-rl] rotate-180 font-display text-[.58rem] tracking-[.4em] text-[#956d68]">
          WITH JOY &amp; GRATITUDE
        </span>
        <span className="h-20 w-px bg-[#b69a59]/60" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-[5%] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-5 sm:flex">
        <span className="h-20 w-px bg-[#b69a59]/60" />
        <span className="h-3 w-3 rotate-45 border border-[#b69a59]" />
        <span className="[writing-mode:vertical-rl] font-display text-[.58rem] tracking-[.4em] text-[#956d68]">
          A DAY TO REMEMBER
        </span>
        <span className="h-20 w-px bg-[#b69a59]/60" />
      </div>

      {/* Centre keeps clear space around the message */}
      <div className="relative z-10 mx-auto w-full max-w-3xl border-y border-[#b69a59]/45 bg-[#fffaf4]/65 px-5 py-14 shadow-[0_20px_70px_rgba(118,40,63,.08)] backdrop-blur-[2px] sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-2 border border-[#b69a59]/25 sm:inset-3" />

        <div className="relative">
          <motion.p {...reveal()} className="font-display text-xs tracking-[.35em] text-[#a08049] sm:text-sm">
            THE BEGINNING OF FOREVER
          </motion.p>
          <Flourish className="mt-5 w-44 sm:w-60" />

          <motion.p {...reveal(1)} className="mt-7 font-script text-3xl text-[#87485b] sm:text-4xl">
            Two Hearts, One Beautiful Beginning
          </motion.p>

          <motion.h2
            {...reveal(2)}
            className="foil mt-5 font-script text-5xl leading-tight sm:text-8xl"
          >
            Ansharah &amp; Azhar
          </motion.h2>

          <Flourish className="mt-6 w-44 sm:w-60" />

          <motion.p {...reveal(3)} className="mx-auto mt-7 max-w-lg font-display text-[.65rem] leading-[2.1] tracking-[.18em] text-[#76505a] sm:text-sm sm:tracking-[.23em]">
            YOUR PRESENCE WILL MAKE OUR CELEBRATION
            <br className="hidden sm:block" /> EVEN MORE SPECIAL
          </motion.p>

          <motion.div {...reveal(4)} className="mt-9 flex flex-col items-center">
            <span className="font-script text-2xl text-[#a08049]">With love &amp; gratitude</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 inline-flex items-center gap-2 border-b border-[#b69a59] pb-2 font-display text-[.62rem] tracking-[.35em] text-[#87485b] transition-colors hover:text-[#b69a59]"
            >
              <ArrowUp size={14} />
              BACK TO TOP
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Wedding() {
  const [started, setStarted] = useState(false); const [shown, setShown] = useState(false);
  useEffect(()=>{ document.body.style.overflow = shown ? "" : "hidden"; },[shown]);
  const [m, h, w] = events;
  return (<main>
    <Curtain onOpen={()=>setStarted(true)} onReveal={()=>setShown(true)}/>
    <Music started={started}/>
    {started && <Petals n={shown?10:26}/>}
    {shown && <><Invitation/><Mehndi e={m}/><Baraat e={h}/><Walima e={w}/><Countdown/><Closing/></>}
  </main>);
}
