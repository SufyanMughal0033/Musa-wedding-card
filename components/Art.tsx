"use client";
import { useId } from "react";
import { motion } from "framer-motion";
export type Tone = "blush"|"burgundy"|"white"|"marigold";
const tones: Record<Tone,string[]> = { blush:["#fbe6e8","#D5A1AA","#b97582"], burgundy:["#b5566f","#76283F","#4a1527"], white:["#fffefc","#f3e4e1","#d9bfbd"], marigold:["#ffd45e","#f2a41c","#c06a08"] };

/** Layered botanical bloom (rose/peony) drawn procedurally from golden-angle petals. */
export function Bloom({ tone="blush", petals=16 }: { tone?: Tone; petals?: number }) {
  const id = useId().replace(/:/g,""); const [a,b,c] = tones[tone];
  return (<svg viewBox="-60 -60 120 120" width="100%" height="100%" aria-hidden>
    <defs><radialGradient id={id}><stop offset="0" stopColor={c}/><stop offset=".5" stopColor={b}/><stop offset="1" stopColor={a}/></radialGradient></defs>
    {Array.from({length:petals},(_,i)=>{ const r = 58*(1-(i/petals)*.85); return <ellipse key={i} cy={-r*.5} rx={r*.46} ry={r*.56} transform={`rotate(${i*137.5})`} fill={`url(#${id})`} stroke="#B69A59" strokeOpacity=".4" strokeWidth=".4"/>; })}
    <circle r="5" fill={c} opacity=".85"/></svg>);
}
const leaves = [{l:4,t:34,r:-62,w:13},{l:18,t:4,r:-24,w:12},{l:46,t:0,r:18,w:11},{l:62,t:32,r:58,w:11},{l:0,t:60,r:-105,w:11}];
const blooms = [{l:0,t:0,s:62,i:0,p:18},{l:40,t:16,s:48,i:1,p:15},{l:6,t:46,s:44,i:2,p:13},{l:54,t:50,s:30,i:0,p:10}];
export function Spray({ className="", tones: t=["burgundy","blush","white"] }: { className?: string; tones?: Tone[] }) {
  return (<div aria-hidden className={`pointer-events-none relative aspect-square ${className}`}>
    {leaves.map((x,i)=><svg key={i} viewBox="0 0 40 100" className="absolute" style={{left:`${x.l}%`,top:`${x.t}%`,width:`${x.w}%`,transform:`rotate(${x.r}deg)`}}><path d="M20 0C40 30 38 70 20 100C2 70 0 30 20 0Z" fill="#6f7a5c"/><path d="M20 8V95" stroke="#B69A59" strokeOpacity=".5" strokeWidth=".8"/></svg>)}
    {blooms.map((x,i)=><div key={i} className="absolute" style={{left:`${x.l}%`,top:`${x.t}%`,width:`${x.s}%`,height:`${x.s}%`}}><Bloom tone={t[x.i]} petals={x.p}/></div>)}
  </div>);
}

export function Flourish({ className="" }: { className?: string }) {
  const draw = { initial:{pathLength:0}, whileInView:{pathLength:1}, viewport:{once:true}, transition:{duration:1.8,ease:"easeInOut" as const} };
  return (<svg viewBox="0 0 240 20" className={`mx-auto ${className}`} aria-hidden>
    <motion.path d="M4 10H104" stroke="#B69A59" strokeWidth=".9" fill="none" {...draw}/><motion.path d="M136 10H236" stroke="#B69A59" strokeWidth=".9" fill="none" {...draw}/>
    <path d="M120 3L127 10L120 17L113 10Z" fill="#B69A59"/><circle cx="106" cy="10" r="1.6" fill="#B69A59"/><circle cx="134" cy="10" r="1.6" fill="#B69A59"/></svg>);
}
