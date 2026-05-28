import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleAnalyticsRouteListener } from "@/components/GoogleAnalyticsRouteListener";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyFlowXsell from "./pages/CaseStudyFlowXsell";
import CaseStudyAFL from "./pages/CaseStudyAFL";
import CaseStudyLRB from "./pages/CaseStudyLRB";
import CaseStudyChildrensBook from "./pages/CaseStudyChildrensBook";
import ShopifyPlusDev from "./pages/ShopifyPlusDev";
import PowerPointBackgrounds from "./pages/PowerPointBackgrounds";
import YouTubeCallouts from "./pages/YouTubeCallouts";
import Resume from "./pages/Resume";
import FlowXsellQuiz from "./pages/FlowXsellQuiz";
import Services from "./pages/Services";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Merch from "./pages/Merch";
import MotionGraphicsStudio from "./pages/MotionGraphicsStudio";
import ShopifyRevenueAudit from "./pages/ShopifyRevenueAudit";
import ShopifyAuditTool from "./pages/ShopifyAuditTool";
import FunnelSnapshot from "./pages/FunnelSnapshot";
import FreeWebsiteRedesign from "./pages/FreeWebsiteRedesign";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import AnalyticsGenerate from "./pages/AnalyticsGenerate";
import AnalyticsSettings from "./pages/AnalyticsSettings";
import AnalyticsBiAnalysis from "./pages/AnalyticsBiAnalysis";
import AnalyticsSecurity from "./pages/AnalyticsSecurity";
import AdminDashboard from "./pages/AdminDashboard";
import { SiteBottomPromoBar } from "@/components/SiteBottomPromoBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleAnalyticsRouteListener />
        <SiteBottomPromoBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/flowxsell" element={<CaseStudyFlowXsell />} />
          <Route path="/case-study/afl" element={<CaseStudyAFL />} />
          <Route path="/case-study/lrb" element={<CaseStudyLRB />} />
          <Route path="/case-study/childrens-book" element={<CaseStudyChildrensBook />} />
          <Route path="/shopify-plus-development" element={<ShopifyPlusDev />} />
          <Route path="/powerpoint-backgrounds" element={<PowerPointBackgrounds />} />
          <Route path="/youtube-callouts" element={<YouTubeCallouts />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/flowxsell-quiz" element={<FlowXsellQuiz />} />
          <Route path="/services" element={<Services />} />
          <Route path="/results" element={<Results />} />
          <Route path="/shopify-revenue-audit" element={<ShopifyRevenueAudit />} />
          <Route path="/shopify-audit" element={<ShopifyAuditTool />} />
          <Route path="/funnel-snapshot" element={<FunnelSnapshot />} />
          <Route path="/free-website-redesign" element={<FreeWebsiteRedesign />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/motion-graphics" element={<MotionGraphicsStudio />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/analytics/generate" element={<AnalyticsGenerate />} />
          <Route path="/analytics/bi-analysis" element={<AnalyticsBiAnalysis />} />
          <Route path="/analytics/industry-analysis" element={<Navigate to="/analytics/bi-analysis" replace />} />
          <Route path="/analytics/security" element={<AnalyticsSecurity />} />
          <Route path="/analytics/settings" element={<AnalyticsSettings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
