import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, Home, Rss } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navigationMenuItems = [
  { title: "Home", href: "#", icon: Home, isActive: true },
  { title: "Blog", href: "#blog", icon: Rss },
  { title: "Docs", href: "#docs", icon: BookOpen },
];

export default function NavigationMenuWithActiveItem() {
  return (
    <div className="w-full border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList className="space-x-8">
            {navigationMenuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  className={cn(
                    "relative group inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                    "before:absolute before:bottom-0 before:inset-x-0 before:h-[2px] before:bg-primary before:scale-x-0 before:transition-transform",
                    "hover:before:scale-x-100 hover:text-accent-foreground",
                    "focus:before:scale-x-100 focus:text-accent-foreground focus:outline-hidden",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "data-active:before:scale-x-100 data-[state=open]:before:scale-x-100",
                    "hover:bg-transparent active:bg-transparent focus:bg-transparent"
                  )}
                  asChild
                  active={item.isActive}
                >
                  <Link href={item.href} className="flex flex-row items-center gap-2.5">
                    <item.icon className="h-5 w-5 shrink-0" />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </div>
  );
}
