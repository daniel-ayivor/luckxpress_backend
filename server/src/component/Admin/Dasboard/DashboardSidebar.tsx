import {
  AlignHorizontalJustifyEndIcon,
  Home,
  LayoutDashboard,
  LogOut,
  MonitorCheck,
  Settings,
  Users,
} from "lucide-react";
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
import toast from "react-hot-toast";

export function DashboardSidebar() {

const logoutUser = () => {
  try {
    // Remove the token from localStorage
    localStorage.removeItem("access_token");

    // Optionally, clear other user-related data
    localStorage.removeItem("user_data");

    // Notify the user
    toast.success("Logged out successfully.");

    // Redirect to login page
    window.location.href = "/signin";
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("An error occurred. Please try again.");
  }
};


  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/index",
    },
    {
      title: "Register",
      icon: Users,
      url: "/register",
    },
    {
      title: "Analytics",
      icon: AlignHorizontalJustifyEndIcon,
      url: "/analytics",
    },
    {
      title: "Tracking",
      icon: MonitorCheck,
      url: "/tracking",
    },
    {
      title: "Logout",
      icon: LogOut,
      action: logoutUser, 
    },
  ];

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
                    {item.action ? (
                      <button
                        onClick={item.action}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg px-3 py-6 text-muted-foreground transition-colors hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-6 text-muted-foreground transition-colors hover:text-foreground",
                          item.url === "/" && "text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    )}
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
