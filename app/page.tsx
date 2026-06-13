import NewSessionButton from "./NewSessionButton";
import Terminal from "./Terminal";

export default function Home() {
  return (
    <div className="min-h-screen p-3 sm:p-5">
      <div className="flex min-h-[calc(100vh-1.5rem)] flex-col rounded-lg border border-border sm:min-h-[calc(100vh-2.5rem)]">
        {/* Top chrome bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
              <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
            </span>
            <span className="text-dim">brais-r@terminal — v0.45</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <NewSessionButton />
            <span className="rounded border border-border px-2 py-1 text-dim">Ctrl+K</span>
            <span className="flex items-center gap-1.5 text-dim">
              <span className="text-success">●</span> online
            </span>
          </div>
        </header>

        {/* Body — animated terminal session */}
        <main className="flex-1 overflow-y-auto px-5 py-8 sm:px-10 sm:py-12">
          <Terminal />
        </main>
      </div>
    </div>
  );
}
