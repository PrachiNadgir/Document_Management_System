import { useState } from 'react'
import { topNavItems } from '../../data/mockData'
import NotificationBadge from '../ui/NotificationBadge'
import SearchBar from '../ui/SearchBar'
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar({
  authUser,
  isAuthenticated,
  notifications,
  onLogout,
  onSearchChange,
  unreadCount,
  setUnreadCount,
}) {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();

  const showSearch =
    location.pathname === "/dashboard" ||
    location.pathname === "/library" ||
    location.pathname.startsWith("/document") ||
    location.pathname === "/analytics"||
    location.pathname === "/upload" // ✅ YOU WANTED THIS

  // ✅ ROUTE MAP
  const routeMap = {
    home: "/",
    dashboard: "/dashboard",
    analyse: "/upload",   // ✅ YOU WANTED THIS
    library: "/library",
    pricing: "/pricing",
    collaboration: "/collaboration",
    api: "/collaboration",
  };

  // ✅ NAVIGATION HANDLER
  const handleNavigate = (path) => {
    if (!isAuthenticated && path !== "/" && path !== "/pricing") {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fbf9f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 lg:px-8">

        {/* LOGO */}
        <div className="flex items-center gap-4 lg:gap-10">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2f67e9]" />
            <span className="text-[1.45rem] font-black text-stone-950">
              Docu <span className="text-[#2f67e9]">Wise</span>
            </span>
          </button>

          {/* NAV ITEMS */}
          <nav className="hidden lg:flex gap-9">
            {topNavItems.map((item) => {
              const path = routeMap[item.id] || "/";

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(path)}
                  className={`text-sm ${
                    location.pathname === path
                      ? 'font-medium text-stone-950'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {showSearch && <SearchBar onSearchChange={onSearchChange} />}

              <span className="text-sm text-[#2f67e9]">
                {authUser?.name?.split(' ')[0]} / Free plan
              </span>

              <NotificationBadge
                notifications={notifications}
                unreadCount={unreadCount}
                setUnreadCount={setUnreadCount}
              />

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#1d1a14] text-white px-6 py-3 rounded-2xl"
              >
                Dashboard
              </button>

              <button
                onClick={onLogout}
                className="border px-5 py-3 rounded-2xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-stone-600"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="bg-[#1d1a14] text-white px-6 py-3 rounded-2xl"
              >
                Sign up
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setShowMobileNav(!showMobileNav)}
          className="lg:hidden border px-3 py-2 rounded-xl"
        >
          Menu
        </button>
      </div>

      {/* MOBILE MENU */}
      {showMobileNav && (
        <div className="border-t px-4 py-4 lg:hidden">
          {topNavItems.map((item) => {
            const path = routeMap[item.id] || "/";

            return (
              <button
                key={item.id}
                onClick={() => {
                  handleNavigate(path);
                  setShowMobileNav(false);
                }}
                className="block text-left w-full py-2"
              >
                {item.label}
              </button>
            );
          })}

          {isAuthenticated ? (
            <>
              <button onClick={() => navigate("/dashboard")} className="w-full py-2">
                Dashboard
              </button>
              <button onClick={onLogout} className="w-full py-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="w-full py-2">
                Login
              </button>
              <button onClick={() => navigate("/signup")} className="w-full py-2">
                Sign up
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;