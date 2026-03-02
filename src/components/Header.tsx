import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="site-title">
          Ying Wang
        </Link>
      </div>
    </header>
  );
}
