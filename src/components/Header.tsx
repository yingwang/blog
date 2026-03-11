import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="site-title">
          Ying Wang
        </Link>
        <nav className="site-nav">
          <Link href="/" className="page-link">
            Home
          </Link>
          <Link href="/blog" className="page-link">
            Blog
          </Link>
          <a
            href="https://github.com/yingwang"
            className="page-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
