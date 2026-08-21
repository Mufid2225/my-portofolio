import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-mono text-7xl font-bold text-white">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

