"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name ? getInitials(session.user.name) : "?"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500">{session?.user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
