import { useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
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
import { defaultFilters, notifications } from "./data/mockData";

// Context
import { userDataContext } from "./Context/userDataContext";

function App() {
  const { userData, logout, loading, serverURL } = useContext(userDataContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [workspaceDocuments, setWorkspaceDocuments] = useState([]);
  const [workspaceLoading, setWorkspaceLoading] = useState(false);
  const [workspaceRefreshToken, setWorkspaceRefreshToken] = useState(0);
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => !n.read).length
  );

  const isAuthenticated = Boolean(userData);

  useEffect(() => {
    if (!isAuthenticated) {
      setWorkspaceDocuments([]);
      setWorkspaceLoading(false);
      return;
    }

    let isMounted = true;

    const loadWorkspace = async () => {
      setWorkspaceLoading(true);

      try {
        const [documentsRes, analysesRes] = await Promise.all([
          axios.get(`${serverURL}/api/documents?limit=100`, {
            withCredentials: true,
          }),
          axios.get(`${serverURL}/api/analysis?limit=100`, {
            withCredentials: true,
          }),
        ]);

        if (!isMounted) return;

        const documentsPayload = documentsRes.data?.data?.documents || [];
        const analysesPayload = analysesRes.data?.data?.analyses || [];

        setWorkspaceDocuments(buildWorkspaceDocuments(documentsPayload, analysesPayload));
      } catch {
        if (!isMounted) return;
        setWorkspaceDocuments([]);
      } finally {
        if (isMounted) {
          setWorkspaceLoading(false);
        }
      }
    };

    loadWorkspace();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, serverURL, workspaceRefreshToken]);

  const filteredDocuments = useMemo(() => {
    return workspaceDocuments.filter((document) => {
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
  }, [filters, searchQuery, workspaceDocuments]);

  const dashboardStats = useMemo(
    () => buildDashboardStats(filteredDocuments, userData),
    [filteredDocuments, userData]
  );

  const analytics = useMemo(
    () => buildAnalyticsData(filteredDocuments),
    [filteredDocuments]
  );

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
          element={
            <DashboardPage
              documents={filteredDocuments}
              stats={dashboardStats}
              loading={workspaceLoading}
            />
          }
        />

        <Route
          path="/analytics"
          element={
            <AnalyticsPage
              analytics={analytics}
              filters={filters}
              loading={workspaceLoading}
              onFilterChange={setFilters}
            />
          }
        />

        <Route
          path="/library"
          element={
            <LibraryPage
              documents={filteredDocuments}
              loading={workspaceLoading}
            />
          }
        />
        <Route
          path="/upload"
          element={
            <UploadPage
              onUploadComplete={() =>
                setWorkspaceRefreshToken((value) => value + 1)
              }
            />
          }
        />
        <Route path="/batchupload" element={<BatchUpload />} />
        <Route path="/compare" element={<Compare/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />

        {/* ✅ Dynamic document detail */}
        <Route
          path="/document/:id"
          element={<DocumentDetailPage />}
        />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
     </>
  );
}

export default App;

function buildWorkspaceDocuments(documents, analyses) {
  const latestAnalysesByDocument = new Map();

  for (const analysis of analyses) {
    const documentId = getDocumentId(analysis.document);
    if (!documentId) continue;

    const existing = latestAnalysesByDocument.get(documentId);
    if (!existing || new Date(analysis.createdAt) > new Date(existing.createdAt)) {
      latestAnalysesByDocument.set(documentId, analysis);
    }
  }

  return documents.map((document) => {
    const latestAnalysis = latestAnalysesByDocument.get(document._id) || null;
    const summary = latestAnalysis?.summary || buildDocumentSummary(document.extractedText);
    const sentiment = formatSentiment(latestAnalysis?.sentiment?.overall);
    const categories = Array.isArray(latestAnalysis?.categories) ? latestAnalysis.categories : [];

    return {
      id: document._id,
      title: document.originalName,
      uploadDate: formatDate(document.createdAt),
      category: categories[0] || "Uncategorized",
      sentiment,
      summary,
      textPreview: summary,
      keywords: Array.isArray(latestAnalysis?.keywords) ? latestAnalysis.keywords : [],
      type: String(document.fileType || "").toUpperCase(),
      mode: formatMode(latestAnalysis?.mode),
      dateBucket: getDateBucket(document.createdAt),
      status: document.status,
      analysisId: latestAnalysis?._id || null,
      createdAt: document.createdAt,
    };
  });
}

function buildDashboardStats(documents, userData) {
  const completed = documents.filter((document) => document.status === "done").length;
  const processing = documents.filter((document) => document.status === "processing").length;
  const freeLeft = "Unlimited";

  return [
    {
      label: "Documents analysed",
      value: String(documents.length),
      hint: `${completed} completed`,
      tone: "text-emerald-600",
    },
    {
  label: "Analyses",
  value: "Unlimited",
  hint: "No usage limit",
  tone: "text-emerald-600",
},
    {
      label: "Processing now",
      value: String(processing),
      hint: processing > 0 ? "Analyses running" : "No active jobs",
      tone: processing > 0 ? "text-sky-600" : "text-stone-500",
    },
    {
      label: "Categories tracked",
      value: String(new Set(documents.map((document) => document.category)).size),
      hint: "Derived from analyses",
      tone: "text-emerald-600",
    },
  ];
}

function buildAnalyticsData(documents) {
  const categories = aggregateCounts(documents.map((document) => document.category))
    .map(([label, value], index) => ({
      label,
      value,
      color: analyticsColors[index % analyticsColors.length],
    }));

  const sentiment = ["Positive", "Neutral", "Negative"].map((label) => ({
    label,
    value: documents.filter((document) => document.sentiment === label).length,
  }));

  const uploads = buildRecentUploads(documents);
  const keywords = [...aggregateCounts(documents.flatMap((document) => document.keywords || []))]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword]) => keyword);

  return {
    categories,
    sentiment,
    uploads,
    keywords,
  };
}

function buildRecentUploads(documents) {
  const labels = [];
  const today = new Date();

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    labels.push({
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      value: 0,
    });
  }

  for (const document of documents) {
    const key = new Date(document.createdAt).toISOString().slice(0, 10);
    const bucket = labels.find((item) => item.key === key);
    if (bucket) bucket.value += 1;
  }

  return labels.map(({ label, value }) => ({ label, value }));
}

function aggregateCounts(values) {
  const counts = new Map();

  for (const value of values) {
    const normalized = value || "Uncategorized";
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

function getDocumentId(documentValue) {
  if (!documentValue) return null;
  if (typeof documentValue === "string") return documentValue;
  return documentValue._id || null;
}

function buildDocumentSummary(text) {
  const normalized = String(text || "").trim().replace(/\s+/g, " ");
  if (!normalized) return "No summary available yet.";
  return normalized.length > 140 ? `${normalized.slice(0, 140)}...` : normalized;
}

function formatSentiment(value) {
  if (!value) return "Neutral";
  return capitalize(String(value).toLowerCase());
}

function formatMode(value) {
  const mode = String(value || "all").toLowerCase();
  if (mode === "all") return "Full analysis";
  return capitalize(mode);
}

function formatDate(value) {
  if (!value) return "Unknown";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDateBucket(value) {
  if (!value) return "Any time";
  const createdAt = new Date(value);
  const now = new Date();
  const diffDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) return "Last 7 days";
  if (diffDays <= 30) return "Last 30 days";
  return "This year";
}

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

const analyticsColors = [
  "bg-[#5a9be0]",
  "bg-[#f2b75e]",
  "bg-[#7cc6a8]",
  "bg-[#ef8f7a]",
  "bg-[#b8c0d9]",
];
