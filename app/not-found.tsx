import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-500">404</p>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Page not found</h1>
      <p className="max-w-md text-slate-600 dark:text-slate-400">
        That route is not part of the Hyperion organization site.
        {process.env.NODE_ENV === 'development' ? (
          <>
            {' '}
            Local dev is served at <code className="text-blue-500">http://localhost:3000/</code>
            ; production static export lives under <code className="text-blue-500">/Organization-Website/</code>.
          </>
        ) : (
          <> Check the URL or return home.</>
        )}
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
      >
        Back to home
      </Link>
      <p className="text-xs text-slate-500">
        Looking for the live site?{' '}
        <a
          className="text-blue-500 hover:underline"
          href="https://hyperion-corporation.github.io/Organization-Website/"
        >
          hyperion-corporation.github.io/Organization-Website
        </a>
      </p>
    </div>
  );
}
