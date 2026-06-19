import { Link as RouterLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <nav className="flex items-center text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.label} className="flex items-center">
              {/* ITEM */}
              {isLast || !item.href ? (
                <span className="font-medium text-zinc-900 dark:text-white">
                  {item.label}
                </span>
              ) : (
                <RouterLink
                  to={item.href}
                  className="text-zinc-500 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
                >
                  {item.label}
                </RouterLink>
              )}

              {/* SEPARATOR */}
              {!isLast && (
                <ChevronRight className="mx-2 h-4 w-4 text-zinc-400" />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Breadcrumb;
