
import { Link } from "react-router-dom";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
    Bell1Outlined,
    Message2Stroke,
} from "@lineiconshq/free-icons";

function NavigationBar() {
    return (
        <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link
                    to="/"
                    className="shrink-0 text-2xl font-extrabold tracking-tight text-blue-600 transition hover:text-blue-700"
                >
                    Frame<span className="text-gray-900">Flow</span>
                </Link>
                {/* Main navigation */}
                <div className="hidden items-center gap-1 lg:flex">
                    <Link
                        to="/"
                        className="rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                    >
                        Home
                    </Link>

                    <Link
                        to="/discover"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                    >
                        Discover
                    </Link>

                    <Link
                        to="/following"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                    >
                        Following
                    </Link>
                </div>
                {/* Search bar */}
                <div className="hidden max-w-sm flex-1 md:block">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 shrink-0 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path
                                strokeLinecap="round"
                                d="m16 16 4 4"
                            />
                        </svg>
                        <input
                            type="search"
                            placeholder="Search photos, creators..."
                            aria-label="Search photos and creators"
                            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                        />
                    </div>
                </div>
                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    <Link
                        to="/upload"
                        className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                    >
                        <span className="sm:hidden">+</span>
                        <span className="hidden sm:inline">+ Upload</span>
                    </Link>
                    {/* Notifications */}
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <Lineicons
                            icon={Bell1Outlined}
                            color="currentColor"
                            size={24}
                        />
                        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-600" />
                    </button>
                    {/* Messages */}
                    <Link
                        to="/messages"
                        aria-label="Messages"
                        className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <Lineicons
                            icon={Message2Stroke}
                            color="currentColor"
                            size={24}
                        />
                    </Link>
                    {/* Profile */}
                    <Link
                        to="/profile"
                        aria-label="Profile"
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-100 bg-blue-50 font-bold text-blue-700 transition hover:border-blue-500 hover:bg-blue-100"
                    >
                        <span>P</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;
