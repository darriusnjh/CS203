import Link from 'next/link';

// This function defines the component for your custom 404 page.
// Next.js will automatically render this component when a route is not found.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="max-w-md">
        <h1 className="text-9xl font-extrabold text-indigo-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </p>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or maybe you just mistyped the URL.
        </p>
        
        {/* This is the new button that redirects to the homepage */}
        <Link href="/">
          <span className="inline-block mt-8 px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 cursor-pointer">
            Go back home
          </span>
        </Link>
      </div>
    </div>
  );
}

