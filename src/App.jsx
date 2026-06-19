import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from '@/components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Consulting from './pages/Consulting';
import Speaking from './pages/Speaking';
import ResetRoom from './pages/ResetRoom';
import Contact from './pages/Contact';
import Questionnaire from './pages/Questionnaire';
import StrategyReport from './pages/StrategyReport.jsx';
import Submissions from './pages/Submissions.jsx';
import ClaritySpring from './pages/ClaritySpring.jsx';
import ClaritySprintIntake from './pages/ClaritySprintIntake.jsx';
import Quiz from './pages/Quiz.jsx';
import QuizAdmin from './pages/QuizAdmin.jsx';
import ScheduledEmailAdmin from './pages/ScheduledEmailAdmin.jsx';
import ContactSubmissions from './pages/ContactSubmissions.jsx';
import EngagementAcceptance from './pages/EngagementAcceptance.jsx';
import FractionalCMO from './pages/FractionalCMO.jsx';
import FindYourFit from './pages/FindYourFit.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SubmissionsDashboard from './pages/SubmissionsDashboard.jsx';
import ClientPortal from './pages/ClientPortal.jsx';

// Allow all pages to be accessible
const PublicOnlyRoute = ({ children }) => {
  return children;
};

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/questionnaire" element={<Questionnaire />} />
      <Route path="/strategy-report/:id" element={<StrategyReport />} />
      <Route path="/" element={<PublicOnlyRoute><Home /></PublicOnlyRoute>} />
      <Route path="/about" element={<PublicOnlyRoute><About /></PublicOnlyRoute>} />
      <Route path="/consulting" element={<PublicOnlyRoute><Consulting /></PublicOnlyRoute>} />
      <Route path="/fractional-cmo" element={<PublicOnlyRoute><FractionalCMO /></PublicOnlyRoute>} />
      <Route path="/find-your-fit" element={<PublicOnlyRoute><FindYourFit /></PublicOnlyRoute>} />
      <Route path="/speaking" element={<PublicOnlyRoute><Speaking /></PublicOnlyRoute>} />
      <Route path="/services" element={<PublicOnlyRoute><ResetRoom /></PublicOnlyRoute>} />
      <Route path="/businesssprint" element={<ClaritySpring />} />
      <Route path="/businesssprint-intake" element={<ClaritySprintIntake />} />
      <Route path="/contact" element={<PublicOnlyRoute><Contact /></PublicOnlyRoute>} />
      <Route path="/submissions" element={<PublicOnlyRoute><Submissions /></PublicOnlyRoute>} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/quiz-admin" element={<QuizAdmin />} />
      <Route path="/quiz-admin/emails" element={<ScheduledEmailAdmin />} />
      <Route path="/contact-submissions" element={<ContactSubmissions />} />
      <Route path="/accept" element={<EngagementAcceptance />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/submissions-dashboard" element={<SubmissionsDashboard />} />
      <Route path="/portal" element={<ClientPortal />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App