import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Page Not Found</h2>
      <p className="mb-8 mt-2 text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}
