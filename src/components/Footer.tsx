import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-col">
          <p className="footer-heading">Ying Wang</p>
          <p>Thoughts on web development, programming, and technology.</p>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Links</p>
          <ul>
            <li>
              <a
                href="https://github.com/yingwang"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Navigate</p>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blog">All Posts</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
