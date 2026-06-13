"use client";

export default function NewSessionButton() {
  const handleClick = () => {
    try {
      // Clear the once-per-session flag so the reveal animation replays.
      sessionStorage.removeItem("term-seen");
    } catch {}
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="cursor-pointer rounded border border-accent px-2 py-1 text-accent transition-colors hover:bg-accent/10"
    >
      new session
    </button>
  );
}
