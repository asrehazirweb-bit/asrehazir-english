import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { Home } from './pages/Home';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage, AboutPage, AdvertisementsPage, GuestColumnsPage, PrivacyPolicyPage, TermsOfUsePage } from './pages/StaticPages';
import { AdminGuard } from './components/auth/AdminGuard';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AddNews from './pages/admin/AddNews';
import ManageNews from './pages/admin/ManageNews';
import AdsManagement from './pages/admin/AdsManagement';
import LoginPage from './pages/LoginPage';
import ArticleDetail from './pages/ArticleDetail';
import SavedNews from './pages/SavedNews';
import { SearchPage } from './pages/SearchPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout><Home /></Layout>} path="/" />

        {/* News Categories */}
        <Route element={<Layout><CategoryPage category="World News" title="World News" /></Layout>} path="/world" />
        <Route element={<Layout><CategoryPage category="National News" title="National News" /></Layout>} path="/national" />
        <Route element={<Layout><CategoryPage category="Deccan News" title="Deccan News" /></Layout>} path="/deccan" />
        <Route element={<Layout><CategoryPage category="Photos" title="Photos" /></Layout>} path="/photos" />
        <Route element={<Layout><CategoryPage category="Videos" title="Videos" /></Layout>} path="/videos" />
        <Route element={<Layout><CategoryPage category="Articles & Essays" title="Articles & Essays" /></Layout>} path="/articles-essays" />
        <Route element={<Layout><CategoryPage category="Sports & Entertainment" title="Sports & Entertainment" /></Layout>} path="/sports-entertainment" />
        <Route element={<Layout><CategoryPage category="Crime & Accidents" title="Crime & Accidents" /></Layout>} path="/crime-accidents" />

        {/* Static Pages */}
        <Route element={<Layout><AdvertisementsPage /></Layout>} path="/advertisements" />
        <Route element={<Layout><ContactPage /></Layout>} path="/contact" />
        <Route element={<Layout><AboutPage /></Layout>} path="/about-us" />
        <Route element={<Layout><GuestColumnsPage /></Layout>} path="/guest-columns" />
        <Route element={<Layout><PrivacyPolicyPage /></Layout>} path="/privacy-policy" />
        <Route element={<Layout><TermsOfUsePage /></Layout>} path="/terms-of-use" />

        {/* Utility Routes */}
        <Route element={<Layout><LoginPage /></Layout>} path="/login" />
        <Route element={<Layout><ArticleDetail /></Layout>} path="/news/:id" />
        <Route element={<Layout><SavedNews /></Layout>} path="/saved-news" />
        <Route element={<Layout><SearchPage /></Layout>} path="/search" />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="manage" element={<ManageNews />} />
          <Route path="ads" element={<AdsManagement />} />
        </Route>

        {/* Catch-all 404 - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
