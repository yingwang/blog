import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8 border-b border-gray-100">
      <Link
        href="/"
        className="text-lg font-semibold tracking-tight text-gray-900 hover:text-gray-900"
      >
        Ying Wang
      </Link>
      <nav className="flex gap-6 text-sm text-gray-500">
        <a
          href="https://github.com/yingwang"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-gray-900"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
