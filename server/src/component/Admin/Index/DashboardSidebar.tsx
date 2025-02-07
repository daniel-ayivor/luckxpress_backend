import { Home, LayoutDashboard, Settings, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex h-16 items-center border-b px-6">
        <Home className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold">Dashboard</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
                        item.url === "/" && "text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4 text-violet-600 hover:text-violet-400" />
                      <span className="`">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}