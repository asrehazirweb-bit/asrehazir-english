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
import ManageCategories from './pages/admin/ManageCategories';
import LoginPage from './pages/LoginPage';
import ArticleDetail from './pages/ArticleDetail';
import SavedNews from './pages/SavedNews';
import { SearchPage } from './pages/SearchPage';
import { LivePage } from './pages/LivePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout><Home /></Layout>} path="/" />

        {/* Dynamic News Categories */}
        <Route element={<Layout><CategoryPage /></Layout>} path="/category/:categoryName" />
        <Route element={<Layout><CategoryPage /></Layout>} path="/category/:categoryName/:subCategory" />

        {/* Legacy redirect for old URLs (optional but good for SEO) */}
        <Route element={<Navigate to="/category/World News" replace />} path="/world" />
        <Route element={<Navigate to="/category/National News" replace />} path="/national" />
        <Route element={<Navigate to="/category/Hyderabad" replace />} path="/deccan" />
        <Route element={<Navigate to="/category/Photos" replace />} path="/photos" />
        <Route element={<Navigate to="/category/Videos" replace />} path="/videos" />
        <Route element={<Navigate to="/category/Articles & Essays" replace />} path="/articles-essays" />
        <Route element={<Navigate to="/category/Sports & Entertainment" replace />} path="/sports-entertainment" />
        <Route element={<Navigate to="/category/Crime & Accidents" replace />} path="/crime-accidents" />


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
        <Route element={<Layout><LivePage /></Layout>} path="/live" />

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
          <Route path="categories" element={<ManageCategories />} />
        </Route>

        {/* Catch-all 404 - Redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
