import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useLocation, Outlet } from "react-router-dom";

function AppLayout({
  authUser,
  filters,
  isAuthenticated,
  notifications,
  onFilterChange,
  onLogout,
  onSearchChange,
  unreadCount,
  setUnreadCount,
}) {
  const location = useLocation();

  const workspaceRoutes = [
    "/dashboard",
    "/library",
    "/analytics",
    "/profile",
    "/collaboration",
    "/upload",
  ];

  const showWorkspaceSidebar = workspaceRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1e1b16]">
      <Navbar
        authUser={authUser}
        isAuthenticated={isAuthenticated}
        notifications={notifications}
        onLogout={onLogout}
        onSearchChange={onSearchChange}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />

      <div className={showWorkspaceSidebar ? 'flex min-h-[calc(100vh-77px)] flex-col lg:flex-row' : ''}>
        
        {showWorkspaceSidebar && (
          <Sidebar
            filters={filters}
            onFilterChange={onFilterChange}
          />
        )}

        <main className={showWorkspaceSidebar ? 'min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8' : ''}>
          <Outlet />   {/* 🔥 renders dashboard content */}
        </main>

      </div>
    </div>
  )
}

export default AppLayout