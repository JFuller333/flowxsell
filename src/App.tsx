import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CaseStudyFlowXsell from "./pages/CaseStudyFlowXsell";
import CaseStudyAFL from "./pages/CaseStudyAFL";
import CaseStudyLRB from "./pages/CaseStudyLRB";
import CaseStudyChildrensBook from "./pages/CaseStudyChildrensBook";
import ShopifyPlusDev from "./pages/ShopifyPlusDev";
import PowerPointBackgrounds from "./pages/PowerPointBackgrounds";
import YouTubeCallouts from "./pages/YouTubeCallouts";
import FlowXsellQuiz from "./pages/FlowXsellQuiz";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/flowxsell" element={<CaseStudyFlowXsell />} />
          <Route path="/case-study/afl" element={<CaseStudyAFL />} />
          <Route path="/case-study/lrb" element={<CaseStudyLRB />} />
          <Route path="/case-study/childrens-book" element={<CaseStudyChildrensBook />} />
          <Route path="/shopify-plus-development" element={<ShopifyPlusDev />} />
          <Route path="/powerpoint-backgrounds" element={<PowerPointBackgrounds />} />
          <Route path="/youtube-callouts" element={<YouTubeCallouts />} />
          <Route path="/flowxsell-quiz" element={<FlowXsellQuiz />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
