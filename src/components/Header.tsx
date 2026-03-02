import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="site-title">
          Ying Wang blog
        </Link>
        <nav className="site-nav">
          <Link href="/blog" className="page-link">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
