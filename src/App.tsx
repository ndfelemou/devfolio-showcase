import AdminLayout from "@/components/layout/AdminLayout";
import FrontLayout from "@/components/layout/FrontLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

import AdminBlog from "./pages/admin/AdminBlog";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminExperiences from "./pages/admin/AdminExperiences";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/AdminSkills";
import Dashboard from "./pages/admin/Dashboard";
import Login from "./pages/admin/Login";
import Trainings from './pages/Training';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Front Office */}
              <Route element={<FrontLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/trainings" element={<Trainings />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              {/* Admin */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="experiences" element={<AdminExperiences />} />
                <Route path="education" element={<AdminEducation />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="messages" element={<AdminMessages />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
