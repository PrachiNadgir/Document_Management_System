import { useContext, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";

// Pages
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LibraryPage from "./pages/LibraryPage";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from "./pages/UploadPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import PricingPage from "./pages/PricingPage";
import CollaborationPage from "./pages/CollaborationPage";
import Navbar from "./components/layout/Navbar";
import Compare from "./pages/Compare";
import BatchUpload from "./pages/BatchUpload";
import { Toaster } from "react-hot-toast";


// Data
import { defaultFilters, documents, notifications } from "./data/mockData";

// Context
import { userDataContext } from "./Context/UserContext";

function App() {
  const { userData, logout, loading } = useContext(userDataContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  const isAuthenticated = Boolean(userData);

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const matchesSearch =
        !searchQuery ||
        document.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        document.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.category === "All" || document.category === filters.category;

      const matchesSentiment =
        filters.sentiment === "All" ||
        document.sentiment === filters.sentiment;

      const matchesDate =
        filters.dateRange === "Any time" ||
        document.dateBucket === filters.dateRange;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSentiment &&
        matchesDate
      );
    });
  }, [filters, searchQuery]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <Toaster position="top-center" />
   
    <Routes>
     
      {/* 🌐 PUBLIC (WITH NAVBAR) */}
      <Route
        path="/"
        element={
          <>
            <Navbar
              authUser={userData}
              isAuthenticated={isAuthenticated}
              notifications={notifications}
              onLogout={logout}
              onSearchChange={setSearchQuery}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
            <HomePage />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Navbar
              authUser={userData}
              isAuthenticated={isAuthenticated}
              notifications={notifications}
              onLogout={logout}
              onSearchChange={setSearchQuery}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
            <AuthPage initialMode="login" />
          </>
        }
      />

      <Route
        path="/signup"
        element={
          <>
            <Navbar
              authUser={userData}
              isAuthenticated={isAuthenticated}
              notifications={notifications}
              onLogout={logout}
              onSearchChange={setSearchQuery}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
            <AuthPage initialMode="signup" />
          </>
        }
      />

      <Route
        path="/pricing"
        element={
          <>
            <Navbar
              authUser={userData}
              isAuthenticated={isAuthenticated}
              notifications={notifications}
              onLogout={logout}
              onSearchChange={setSearchQuery}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
            <PricingPage />
          </>
        }
      />

      {/* 🔐 PROTECTED ROUTES */}
      <Route
        element={
          isAuthenticated ? (
            <AppLayout
              authUser={userData}
              filters={filters}
              isAuthenticated={isAuthenticated}
              notifications={notifications}
              onFilterChange={setFilters}
              onLogout={logout}
              onSearchChange={setSearchQuery}
              unreadCount={unreadCount}
              setUnreadCount={setUnreadCount}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route
          path="/dashboard"
          element={<DashboardPage documents={filteredDocuments} />}
        />

        <Route
          path="/analytics"
          element={
            <AnalyticsPage
              filters={filters}
              onFilterChange={setFilters}
            />
          }
        />

        <Route
          path="/library"
          element={<LibraryPage documents={filteredDocuments} />}
        />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/batchupload" element={<BatchUpload />} />
        <Route path="/compare" element={<Compare/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />

        {/* ✅ Dynamic document detail */}
        <Route
          path="/document/:id"
          element={<DocumentDetailPage documents={documents} />}
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
     </>
  );
}

export default App;