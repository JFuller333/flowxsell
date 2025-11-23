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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
