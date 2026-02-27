export default function Loading() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-12 animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/6 rounded bg-muted" />
          <div className="h-40 w-full rounded-xl bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>
      </main>
    </div>
  );
}
