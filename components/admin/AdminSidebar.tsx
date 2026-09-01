// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  UserCircle,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Layers },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

const bottomItems = [
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "Support", href: "/admin/support", icon: HelpCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-lg font-semibold text-gray-900">PYNX Admin</h1>
        <p className="mt-0.5 text-xs tracking-wide text-gray-400">
          Store management
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-gray-100 px-3 py-4">
        {bottomItems.map(({ label, href, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={17} strokeWidth={1.75} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2.5 border-t border-gray-100 px-6 py-4">
        <UserCircle size={28} strokeWidth={1.5} className="text-gray-400" />
        <span className="text-sm text-gray-600">Admin User</span>
      </div>
    </aside>
  );
}