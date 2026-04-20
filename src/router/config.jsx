import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import LoginPage from "../pages/login/page";
import RegisterPage from "../pages/register/page";
import HelpersPage from "../pages/helpers/page";
import HelperProfilePage from "../pages/helpers/profile/page";
import SeekerOverviewPage from "../pages/dashboard/seeker/overview/page";
import MyTasksPage from "../pages/dashboard/seeker/tasks/page";
import PostTaskPage from "../pages/dashboard/seeker/tasks/new/page";
import TaskDetailPage from "../pages/dashboard/seeker/tasks/detail/page";
import HelperOverviewPage from "../pages/dashboard/helper/overview/page";
import HelperActiveTasksPage from "../pages/dashboard/helper/tasks/page";
import BrowseTasksPage from "../pages/dashboard/helper/browse/page";
import MyOffersPage from "../pages/dashboard/helper/offers/page";
import EarningsPage from "../pages/dashboard/helper/earnings/page";
import PointsBadgesPage from "../pages/dashboard/helper/points/page";
import MessagesPage from "../pages/messages/page";
import HowItWorksPage from "../pages/how-it-works/page";
import TasksMarketplacePage from "../pages/tasks/page";
import CategoriesPage from "../pages/categories/page";
import NotificationsPage from "../pages/notifcations/page";
import ProfilePage from "../pages/profile/page";
import ProjectsPage from "../pages/projects/page";
import SeekerWalletPage from "../pages/dashboard/seeker/wallet/page";
import SeekerSessionsPage from "../pages/dashboard/seeker/sessions/page";
import SeekerProjectsPage from "../pages/dashboard/seeker/projects/page";
import AIToolsPage from "../pages/ai/page";
import ProtectedRoute from "../components/base/ProtectedRoute";

const routes = [
  // ── Public routes ──────────────────────────────────────────
  { path: "/", element: <Home /> },
  { path: "/how-it-works", element: <HowItWorksPage /> },
  { path: "/tasks", element: <TasksMarketplacePage /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/helpers", element: <HelpersPage /> },
  { path: "/helpers/:id", element: <HelperProfilePage /> },

  // ── Protected routes (any authenticated user) ──────────────
  { path: "/notifications", element: <ProtectedRoute><NotificationsPage /></ProtectedRoute> },
  { path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
  { path: "/ai", element: <ProtectedRoute><AIToolsPage /></ProtectedRoute> },
  { path: "/messages", element: <ProtectedRoute><MessagesPage /></ProtectedRoute> },

  // ── Seeker dashboard (requires Seeker role) ────────────────
  { path: "/dashboard/seeker", element: <ProtectedRoute roles={["Seeker"]}><SeekerOverviewPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/tasks", element: <ProtectedRoute roles={["Seeker"]}><MyTasksPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/tasks/new", element: <ProtectedRoute roles={["Seeker"]}><PostTaskPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/tasks/:id", element: <ProtectedRoute roles={["Seeker"]}><TaskDetailPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/wallet", element: <ProtectedRoute roles={["Seeker"]}><SeekerWalletPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/sessions", element: <ProtectedRoute roles={["Seeker"]}><SeekerSessionsPage /></ProtectedRoute> },
  { path: "/dashboard/seeker/projects", element: <ProtectedRoute roles={["Seeker"]}><SeekerProjectsPage /></ProtectedRoute> },

  // ── Helper dashboard (requires Helper role) ────────────────
  { path: "/dashboard/helper", element: <ProtectedRoute roles={["Helper"]}><HelperOverviewPage /></ProtectedRoute> },
  { path: "/dashboard/helper/tasks", element: <ProtectedRoute roles={["Helper"]}><HelperActiveTasksPage /></ProtectedRoute> },
  { path: "/dashboard/helper/browse", element: <ProtectedRoute roles={["Helper"]}><BrowseTasksPage /></ProtectedRoute> },
  { path: "/dashboard/helper/offers", element: <ProtectedRoute roles={["Helper"]}><MyOffersPage /></ProtectedRoute> },
  { path: "/dashboard/helper/earnings", element: <ProtectedRoute roles={["Helper"]}><EarningsPage /></ProtectedRoute> },
  { path: "/dashboard/helper/points", element: <ProtectedRoute roles={["Helper"]}><PointsBadgesPage /></ProtectedRoute> },

  // ── Catch-all ──────────────────────────────────────────────
  { path: "*", element: <NotFound /> },
];

export default routes;
