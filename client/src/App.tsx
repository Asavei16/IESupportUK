import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ApplicationForm from "@/pages/ApplicationForm";
import Universities from "@/pages/Universities";
import Courses from "@/pages/Courses";
import UniversityDetail from "@/pages/UniversityDetail";
import CoursesDetail from "@/pages/CoursesDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/apply" component={ApplicationForm} />
      <Route path="/courses" component={Universities} />
      <Route path="/courses/:id" component={UniversityDetail} />
      {/* <Route path="/courses" component={Courses} />
      <Route path="/courses/:id" component={CoursesDetail} /> */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
