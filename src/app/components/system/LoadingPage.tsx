export function LoadingPage() {
  return (
    <main className="min-h-[70vh] bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 h-8 w-52 animate-pulse rounded bg-muted" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 h-36 animate-pulse rounded-lg bg-muted" />
              <div className="mb-3 h-5 w-4/5 animate-pulse rounded bg-muted" />
              <div className="mb-2 h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
