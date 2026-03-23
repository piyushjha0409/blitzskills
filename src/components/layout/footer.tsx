import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 py-5">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 px-5 sm:flex-row sm:justify-between sm:px-8 lg:max-w-4xl">
        <p className="text-xs text-gray-400">Monad Skills Marketplace</p>
        <div className="flex gap-4">
          <Link
            href="/browse"
            className="text-xs text-gray-400 transition-colors hover:text-purple-500"
          >
            Skills
          </Link>
          <Link
            href="/knowledge"
            className="text-xs text-gray-400 transition-colors hover:text-purple-500"
          >
            Knowledge
          </Link>
          <Link
            href="/tutorial"
            className="text-xs text-gray-400 transition-colors hover:text-purple-500"
          >
            Guide
          </Link>
          <a
            href="https://github.com/piyushjha0409/monad-skills-marketplace"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 transition-colors hover:text-purple-500"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
