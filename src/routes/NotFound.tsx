export default function NotFound() {
  return (
    <div className="min-h-[500px] h-[70vh] flex flex-col items-center justify-center text-neutral-900 dark:text-neutral-100 px-4">
      {/* Animated 404 text */}
      <div className="relative">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold animate-bounce">
          404
        </h1>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-pulse -z-10"></div>
      </div>

      {/* Animated divider line */}
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-neutral-500 to-transparent my-6 animate-pulse"></div>

      {/* Message with fade-in animation */}
      <p className="text-neutral-500 dark:text-neutral-400 mt-2 text-center text-base sm:text-lg animate-fade-in">
        Oops! The page you're looking for seems to have vanished.
      </p>

      {/* Animated button */}
      <a
        href="/"
        className="mt-8 px-6 py-2.5 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2 animate-fade-in-up"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </a>
    </div>
  );
}
