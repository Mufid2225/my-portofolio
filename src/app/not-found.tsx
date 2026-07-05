import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-emerald-400">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Halaman yang kamu cari tidak ditemukan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-600"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
