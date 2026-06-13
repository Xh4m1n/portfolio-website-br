"use client";

import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import qa from "@/data/qa.json";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const skills: { label: string; value: string }[] = [
  {
    label: "paradigmas",
    value:
      "Vibe Coding · Prompt / Context / Hardness Engineering · Spec-Driven Development (spec as source) · TDD",
  },
  {
    label: "claude code",
    value: "skills · MCPs · plugins · hooks · CLIs · subagents · agent teams · dynamics Workflows",
  },
  {
    label: "agentes ia",
    value:
      "orquestación multi-agente · LLM apps nivel 3→8 · arneses (Claude Code, OpenCode y Customs)",
  },
  {
    label: "automatización",
    value:
      "n8n (workflows, queue mode, workers, error handling, security webhooks) · Flowise · LangChain · LangGraph · pydantic, y muchas otras librerias para trabajar con IA",
  },
  { label: "datos / rag", value: "Supabase · InsForge · Neon · Postgres · pgvector · hybrid search · RAG" },
  {
    label: "stack",
    value:
      "Next.js · Docker · VPS · Coolify · Cloudflare · Stripe / Polar · Resend · OpenRouter",
  },
  {
    label: "adaptacion dependiendo del proyecto",
    value:
      "capaz de dominar cualquier otro paradigma, me apapto a lo que necesite el proyecto y no el proyecto se adapta a lo que necesite yo ",
  },
];

const projects: { name: string; description: string; tag: string }[] = [
  {
    name: "agentic-os-v2",
    description: "SO personal sobre Claude Desktop con Obsidian como capa de memoria",
    tag: "OS",
  },
  {
    name: "customizacion cowork",
    description: "Sistema multi-procesador (vault, vídeo, posts, documentos)",
    tag: "agents",
  },
  {
    name: "salda",
    description: "SaaS de cobros automatizados vía WhatsApp para profesionales en LatAm",
    tag: "SaaS",
  },
  { name: "hirezia", description: "Software ATS para BPOs impulsado con IA", tag: "ATS" },
  { name: "contentforge", description: "SaaS que genera todo tipo de contenido", tag: "SaaS" },
];

const contacts: { label: string; value: string; href: string }[] = [
  { label: "github", value: "https://github.com/TU-USUARIO - PDTE", href: "mailto:https://github.com/TU-USUARIO" },
  { label: "X(twitter)", value: "https://x.com/TU-USUARIO - PDTE", href: "https://x.com/TU-USUARIO" },
  { label: "website", value: "https://br.xh4m1n.eu", href: "https://br.xh4m1n.eu" },
  { label: "email", value: "xh4m1n@gmail.com", href: "mailto:xh4m1n@gmail.com" },
  { label: "skool", value: "@brais-r-5704", href: "https://www.skool.com/@brais-r-5704" },
];

/** A typed-text fragment; `c` is an optional className for the rendered span. */
type Seg = { t: string; c?: string };

const taglineSegs: Seg[] = [
  { t: "No escribo código: lo dirijo. " },
  { t: "Construyo SaaS / AaaS", c: "text-accent" },
  { t: " flujos agénticos como " },
  { t: "agentes de IA", c: "text-accent" },
  { t: " y divulgo " },
  { t: "Vibe Coding", c: "text-accent" },
  { t: " en español tanto para quien empieza, como para quien ya tiene conocimientos." },
];

const bioSegs: Seg[] = [
  {
    t: "Entusiasta de la tecnología centrado en la IA aplicada. Construye dentro del paradigma del ",
  },
  { t: "Vibe Coding", c: "text-accent" },
  { t: " —o, más fino, " },
  { t: "AI Engineering", c: "text-accent" },
  {
    t: "—: en lugar de escribir código a mano, describe requisitos con precisión y orquesta agentes de IA bajo arneses como ",
  },
  { t: "Claude Code o Codex son un vehiculo, pero no los únicos", c: "text-accent" },
  { t: " para llevar una idea desde la especificación hasta el deploy. Se apoya en " },
  { t: "Prompt Engineering", c: "text-accent" },
  { t: ", " },
  { t: "Context Engineering", c: "text-accent" },
  { t: ", " },
  { t: "Hardness Engineering", c: "text-accent" },
  { t: " y " },
  { t: "Spec-Driven Development", c: "text-accent" },
  {
    t: " para que el resultado sea sólido y no un castillo de naipes. Y hay algo que no negocia: la ",
  },
  { t: "seguridad", c: "text-accent" },
  {
    t: ", entendida como decisión de diseño desde el primer día. La otra mitad de lo que hace es ",
  },
  { t: "divulgar todo esto en español", c: "text-accent" },
  { t: " para comunidades técnicas y para gente con ganas de aprender." },
];

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6 9-6" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5c2.7 2.6 4 6 4 9.5s-1.3 6.9-4 9.5c-2.7-2.6-4-6-4-9.5s1.3-6.9 4-9.5Z" />
    </svg>
  );
}

// Skool no tiene un glifo monocromo oficial en las librerías de iconos, así que
// usamos un birrete (graduación): representa su comunidad de aprendizaje y
// mantiene el mismo estilo de línea que el resto.
function SkoolIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3 1.5 8.5 12 14l10.5-5.5L12 3Z" />
      <path d="M6 10.6V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5.4" />
      <path d="M22.5 8.5V13" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

/* ┌──────────────────────────────────────────────────────────────────┐
   │  ✏️  EDITA AQUÍ TUS ENLACES SOCIALES                               │
   │  Sustituye los placeholders TU-USUARIO por tu usuario real.        │
   │  Para QUITAR una red: borra su línea en SOCIALS y su <a> en        │
   │  socialRow (más abajo).                                            │
   └──────────────────────────────────────────────────────────────────┘ */
const SOCIALS = {
  github: "https://github.com/TU-USUARIO", //  ← pon tu usuario de GitHub
  x: "https://x.com/TU-USUARIO", //            ← pon tu usuario de X (Twitter)
  website: "https://br.xh4m1n.eu", //        ← pon la URL de tu página web
  email: "mailto:xh4m1n@gmail.com",
  skool: "https://www.skool.com/@brais-r-5704",
};

const socialRow = (
  <div className="mt-1 flex items-center gap-4">
    <a
      href={SOCIALS.github}
      aria-label="GitHub"
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim transition-colors hover:text-accent"
    >
      <GitHubIcon />
    </a>
    <a
      href={SOCIALS.x}
      aria-label="X"
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim transition-colors hover:text-accent"
    >
      <XIcon />
    </a>
    <a
      href={SOCIALS.email}
      aria-label="Email"
      className="text-dim transition-colors hover:text-accent"
    >
      <MailIcon />
    </a>
    <a
      href={SOCIALS.website}
      aria-label="Web"
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim transition-colors hover:text-accent"
    >
      <WebsiteIcon />
    </a>
    <a
      href={SOCIALS.skool}
      aria-label="Skool"
      target="_blank"
      rel="noopener noreferrer"
      className="text-dim transition-colors hover:text-accent"
    >
      <SkoolIcon />
    </a>
  </div>
);

/* ------------------------------------------------------------------ */
/* Animation primitives                                                */
/* ------------------------------------------------------------------ */

const SPINNER = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Cursor() {
  return <span className="term-cursor" aria-hidden="true" />;
}

function Spinner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % SPINNER.length), 80);
    return () => clearInterval(id);
  }, []);
  return <span className="text-accent">{SPINNER[i]}</span>;
}

/** Types `text` character by character, then fires onDone once. */
function TypePrompt({ text, onDone }: { text: string; onDone: () => void }) {
  const [n, setN] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (n >= text.length) {
      doneRef.current();
      return;
    }
    const id = setTimeout(() => setN((x) => x + 1), 22);
    return () => clearTimeout(id);
  }, [n, text]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <Cursor />}
    </>
  );
}

/** Runs fake tool actions sequentially, then collapses. Collapsible by click. */
function ToolUseBlock({
  actions,
  done,
  onDone,
}: {
  actions: string[];
  done: boolean;
  onDone: () => void;
}) {
  // current = index of the running action; >= length means all finished.
  const [current, setCurrent] = useState(done ? actions.length : 0);
  const [collapsed, setCollapsed] = useState(done);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // advance through actions
  useEffect(() => {
    if (done || current >= actions.length) return;
    const id = setTimeout(() => setCurrent((c) => c + 1), 180 + Math.random() * 220);
    return () => clearTimeout(id);
  }, [current, done, actions.length]);

  // finished: collapse + notify (once)
  useEffect(() => {
    if (done || current < actions.length) return;
    const id = setTimeout(() => {
      setCollapsed(true);
      doneRef.current();
    }, 260);
    return () => clearTimeout(id);
  }, [current, done, actions.length]);

  return (
    <div className="mb-4 text-sm">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center gap-2 text-dim transition-colors hover:text-foreground"
      >
        <span className="text-accent">●</span>
        {actions.length} tool uses
        <span className="text-muted">{collapsed ? "▸" : "▾"}</span>
      </button>
      {!collapsed && (
        <ul className="mt-2 flex flex-col gap-1 pl-1">
          {actions.map((a, i) => {
            const status =
              done || i < current ? "done" : i === current ? "run" : "wait";
            return (
              <li key={a} className="flex items-center gap-2 text-dim">
                <span className="inline-flex w-4 justify-center">
                  {status === "done" ? (
                    <span className="text-success">✓</span>
                  ) : status === "run" ? (
                    <Spinner />
                  ) : (
                    <span className="text-muted">·</span>
                  )}
                </span>
                {a}
                {status === "run" && <span className="text-muted">…</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Typed-stream engine (used by every section body)                    */
/* ------------------------------------------------------------------ */

type TypedRow = {
  segs: Seg[];
  /** nodes[i] is the typed portion of segs[i] (cursor embedded in the active one). */
  render: (nodes: ReactNode[], rowDone: boolean) => ReactNode;
};

/** Slice each segment to the first `n` chars overall; embed the cursor where typing is. */
function typeSegs(segs: Seg[], n: number, withCursor: boolean): ReactNode[] {
  let pos = 0;
  return segs.map((seg, i) => {
    const take = Math.max(0, Math.min(seg.t.length, n - pos));
    const cursorHere = withCursor && n >= pos && n < pos + seg.t.length;
    const node = (
      <span key={i} className={seg.c}>
        {seg.t.slice(0, take)}
        {cursorHere && <Cursor />}
      </span>
    );
    pos += seg.t.length;
    return node;
  });
}

/** Streams rows char-by-char, one row at a time, then fires onDone once. */
function StreamTyped({
  rows,
  done,
  onDone,
  step = 3,
  interval = 14,
  className = "flex flex-col gap-3",
}: {
  rows: TypedRow[];
  done: boolean;
  onDone: () => void;
  step?: number;
  interval?: number;
  className?: string;
}) {
  const lens = rows.map((r) => r.segs.reduce((a, s) => a + s.t.length, 0));
  const total = lens.reduce((a, b) => a + b, 0);
  const [count, setCount] = useState(done ? total : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    if (done || count >= total) {
      if (!done && count >= total) doneRef.current();
      return;
    }
    const id = setTimeout(() => setCount((c) => Math.min(c + step, total)), interval);
    return () => clearTimeout(id);
  }, [count, done, total, step, interval]);

  const shown = done ? total : count;
  const out: ReactNode[] = [];
  let offset = 0;
  for (let i = 0; i < rows.length; i++) {
    const start = offset;
    offset += lens[i];
    if (!done && shown < start) break;
    const rowDone = done || shown >= start + lens[i];
    const active = !done && !rowDone;
    out.push(
      <div key={i}>
        {rows[i].render(typeSegs(rows[i].segs, shown - start, active), rowDone)}
      </div>
    );
    if (active) break;
  }
  return <div className={className}>{out}</div>;
}

/* ------------------------------------------------------------------ */
/* Section shell                                                       */
/* ------------------------------------------------------------------ */

type BodyState = "hidden" | "play" | "done";
type SectionState = "animate" | "final";

function SectionShell({
  state,
  onComplete,
  promptText,
  actions,
  renderBody,
}: {
  state: SectionState;
  onComplete: () => void;
  promptText: string;
  actions: string[];
  renderBody: (bodyState: BodyState, onBodyDone: () => void) => ReactNode;
}) {
  const final = state === "final";
  const [phase, setPhase] = useState<"prompt" | "tools" | "body" | "done">(
    final ? "done" : "prompt"
  );
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  const showTools = final || phase === "tools" || phase === "body" || phase === "done";
  const bodyState: BodyState =
    final || phase === "done" ? "done" : phase === "body" ? "play" : "hidden";

  return (
    <section className="mt-12 first:mt-0">
      <p className="text-base text-accent md:text-lg">
        <span className="mr-2">&gt;</span>
        {final || phase !== "prompt" ? (
          promptText
        ) : (
          <TypePrompt text={promptText} onDone={() => setPhase("tools")} />
        )}
      </p>
      <div className="mt-5 ml-2 border-l border-border pl-6">
        {showTools && (
          <ToolUseBlock
            actions={actions}
            done={final}
            onDone={() => setPhase("body")}
          />
        )}
        {bodyState !== "hidden" &&
          renderBody(bodyState, () => {
            setPhase("done");
            completeRef.current();
          })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const heroRows: TypedRow[] = [
  {
    segs: [{ t: "Brais R." }],
    render: (nodes) => (
      <h1 className="text-5xl font-bold uppercase tracking-wide md:text-6xl">
        {nodes}
      </h1>
    ),
  },
  {
    segs: [{ t: "AI Engineer & Divulgador IA" }],
    render: (nodes) => <p className="text-2xl text-success">{nodes}</p>,
  },
  {
    segs: taglineSegs,
    render: (nodes) => <p className="max-w-xl text-lg leading-relaxed">{nodes}</p>,
  },
];

/** Streams the hero name/role/tagline, then reveals location + socials. */
function HeroIntro({ done, onDone }: { done: boolean; onDone: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <StreamTyped rows={heroRows} done={done} onDone={onDone} step={2} interval={18} />
      {done && (
        <>
          <p className="text-dim">// A Coruña - Galicia, España </p>
          {socialRow}
        </>
      )}
    </div>
  );
}

function HeroSection(props: { state: SectionState; onComplete: () => void }) {
  return (
    <SectionShell
      {...props}
      promptText="¿quién es brais r.?"
      actions={["Reading profile.md", "Loading me.jpg", "Resolving identity"]}
      renderBody={(bs, onDone) => (
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/me.jpg"
              alt="Brais R."
              width={208}
              height={208}
              priority
              className={`rounded-full object-cover ring-1 ring-accent shadow-[0_0_80px_-15px_rgba(245,158,11,0.55)] ${
                bs === "play" ? "term-fade" : ""
              }`}
            />
            <span className="text-xs text-muted">me.jpg</span>
          </div>
          <HeroIntro done={bs === "done"} onDone={onDone} />
        </div>
      )}
    />
  );
}

const bioRows: TypedRow[] = [
  {
    segs: bioSegs,
    render: (nodes) => <p className="max-w-3xl text-lg leading-relaxed">{nodes}</p>,
  },
];

function BioSection(props: { state: SectionState; onComplete: () => void }) {
  return (
    <SectionShell
      {...props}
      promptText="cuéntame más sobre su trayectoria"
      actions={["Reading bio.md", "Summarizing trayectoria"]}
      renderBody={(bs, onDone) => (
        <StreamTyped
          rows={bioRows}
          done={bs === "done"}
          onDone={onDone}
          step={6}
          interval={12}
        />
      )}
    />
  );
}

const skillRows: TypedRow[] = skills.map((s) => ({
  segs: [{ t: s.label }, { t: s.value }],
  render: ([label, value]) => (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <span className="w-40 shrink-0 text-highlight">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  ),
}));

function SkillsSection(props: { state: SectionState; onComplete: () => void }) {
  return (
    <SectionShell
      {...props}
      promptText="cat skills.txt"
      actions={["Parsing skills.json", "Indexing capabilities", "Ranking proficiency"]}
      renderBody={(bs, onDone) => (
        <StreamTyped
          rows={skillRows}
          done={bs === "done"}
          onDone={onDone}
          step={5}
          interval={12}
        />
      )}
    />
  );
}

const projectRows: TypedRow[] = projects.map((p) => ({
  segs: [{ t: p.name }, { t: "—" }, { t: p.description }],
  render: ([name, dash, description], rowDone) => (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="text-highlight">{name}</span>
      <span className="hidden text-muted sm:inline">{dash}</span>
      <span className="text-foreground">{description}</span>
      {rowDone && <span className="text-muted sm:ml-auto">{p.tag}</span>}
    </div>
  ),
}));

function ProjectsSection(props: { state: SectionState; onComplete: () => void }) {
  return (
    <SectionShell
      {...props}
      promptText="ls projects/"
      actions={["Scanning projects/", "Fetching metadata", "Sorting by recency"]}
      renderBody={(bs, onDone) => (
        <StreamTyped
          rows={projectRows}
          done={bs === "done"}
          onDone={onDone}
          step={4}
          interval={12}
        />
      )}
    />
  );
}

const contactRows: TypedRow[] = contacts.map((c) => ({
  segs: [{ t: c.label }, { t: c.value }],
  render: ([label, value]) => (
    <div className="flex gap-4">
      <span className="w-20 shrink-0 text-dim">{label}</span>
      <a
        href={c.href}
        target={c.href.startsWith("http") ? "_blank" : undefined}
        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-highlight transition-colors hover:text-accent"
      >
        {value}
      </a>
    </div>
  ),
}));

function ContactSection(props: { state: SectionState; onComplete: () => void }) {
  return (
    <SectionShell
      {...props}
      promptText="cat contact.txt"
      actions={["Reading contact.txt", "Verifying links"]}
      renderBody={(bs, onDone) => (
        <StreamTyped
          rows={contactRows}
          done={bs === "done"}
          onDone={onDone}
          step={1}
          interval={14}
        />
      )}
    />
  );
}

const SECTIONS = [
  HeroSection,
  BioSection,
  SkillsSection,
  ProjectsSection,
  ContactSection,
];

/* ------------------------------------------------------------------ */
/* Chat (Phase 3): regex + JSON, no backend, no LLM                    */
/* ------------------------------------------------------------------ */

type QA = { patterns: string[]; answer: string };

// Compile once. Invalid patterns are skipped rather than crashing the page.
const QA_COMPILED: { regexes: RegExp[]; answer: string }[] = (qa as QA[]).map(
  (entry) => ({
    regexes: entry.patterns.flatMap((p) => {
      try {
        return [new RegExp(p, "i")];
      } catch {
        return [];
      }
    }),
    answer: entry.answer,
  })
);

const FALLBACK =
  "Mmm, esa no me la sé 🤔 — soy un terminal de pega a base de regex, no un LLM de verdad. Prueba con: «¿quién eres?», «¿cuál es tu stack?», «¿en qué proyectos trabajas?» o «¿cómo te contacto?». Para hablar de verdad: xh4m1n@gmail.com.";

function matchAnswer(input: string): string {
  const q = input.trim();
  for (const { regexes, answer } of QA_COMPILED) {
    if (regexes.some((re) => re.test(q))) return answer;
  }
  return FALLBACK;
}

/** Types a plain string char-by-char; renders instantly when `instant`. */
function TypedAnswer({
  text,
  instant,
  onDone,
  onTick,
}: {
  text: string;
  instant: boolean;
  onDone: () => void;
  onTick: () => void;
}) {
  const [n, setN] = useState(instant ? text.length : 0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const tickRef = useRef(onTick);
  tickRef.current = onTick;
  useEffect(() => {
    if (instant || n >= text.length) {
      if (n >= text.length) doneRef.current();
      return;
    }
    const id = setTimeout(() => {
      setN((x) => Math.min(x + 2, text.length));
      tickRef.current();
    }, 16);
    return () => clearTimeout(id);
  }, [n, text, instant]);
  const done = n >= text.length;
  return (
    <>
      {text.slice(0, n)}
      {!done && <Cursor />}
    </>
  );
}

type ChatEntry = { id: number; q: string; answer: string };

function Chat() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [value, setValue] = useState("");
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const [instant, setInstant] = useState(false);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setInstant(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Focus on mount without yanking the viewport to the bottom.
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const scrollToBottom = () =>
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    const id = ++idRef.current;
    setHistory((h) => [...h, { id, q, answer: matchAnswer(q) }]);
    setStreamingId(id); // any previously-streaming entry renders fully at once
    setValue("");
    requestAnimationFrame(scrollToBottom);
  };

  return (
    <div className="mt-12">
      <div className="border-t border-border pt-6">
        {history.length === 0 && (
          <p className="mb-4 text-sm text-dim">
            // pregúntame algo — prueba: «¿quién eres?», «¿cuál es tu stack?»,
            «¿cómo te contacto?»
          </p>
        )}

        {history.map((entry) => (
          <div key={entry.id} className="mb-5">
            <p className="text-accent">
              <span className="mr-1 text-muted">$</span>
              <span className="mr-2">ask&gt;</span>
              <span className="text-foreground">{entry.q}</span>
            </p>
            <p className="mt-1 max-w-3xl leading-relaxed text-foreground">
              {entry.id === streamingId ? (
                <TypedAnswer
                  text={entry.answer}
                  instant={instant}
                  onDone={() => setStreamingId(null)}
                  onTick={scrollToBottom}
                />
              ) : (
                entry.answer
              )}
            </p>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-1 text-muted">$</span>
          <span className="mr-2 text-accent">ask&gt;</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Pregunta algo sobre Brais"
            className="flex-1 bg-transparent text-foreground caret-accent outline-none placeholder:text-muted"
            placeholder="escribe una pregunta y pulsa enter…"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Orchestrator                                                        */
/* ------------------------------------------------------------------ */

const SEEN_KEY = "term-seen";

export default function Terminal() {
  // "pending" = pre-decision (also the no-JS / SSR view → render everything).
  const [mode, setMode] = useState<"pending" | "animate" | "instant">("pending");
  const [activeIndex, setActiveIndex] = useState(0);

  // Decide before paint to avoid a flash of fully-revealed content.
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    setMode(reduce || seen ? "instant" : "animate");
  }, []);

  const handleComplete = (i: number) => {
    if (i + 1 >= SECTIONS.length) {
      setActiveIndex(SECTIONS.length);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
    } else {
      setActiveIndex(i + 1);
    }
  };

  const animating = mode === "animate";
  const visibleCount = animating
    ? Math.min(activeIndex + 1, SECTIONS.length)
    : SECTIONS.length;
  const showTrailingCursor = !animating || activeIndex >= SECTIONS.length;

  return (
    <>
      {SECTIONS.slice(0, visibleCount).map((Section, i) => (
        <Section
          // mode in the key: sections mounted during the "pending" (SSR) render
          // cache phase="done" in useState; remount them once the mode is decided.
          key={`${mode}-${i}`}
          state={animating && i === activeIndex ? "animate" : "final"}
          onComplete={() => handleComplete(i)}
        />
      ))}

      {showTrailingCursor && <Chat />}
    </>
  );
}
