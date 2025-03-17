import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Helmet } from "react-helmet";
import { AuthProvider } from "@/contexts/AuthContext";

// Import pages
import Home from "@/pages/Home";
import AddGroup from "@/pages/AddGroup";
import GroupDetails from "@/pages/GroupDetails";
import CategoryPage from "@/pages/CategoryPage";
import CountryPage from "@/pages/CountryPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/add-group" component={AddGroup} />
      <Route path="/group/:id" component={GroupDetails} />
      <Route path="/groups/:category" component={CategoryPage} />
      <Route path="/groups" component={CategoryPage} />
      <Route path="/countries/:country" component={CountryPage} />
      <Route path="/countries" component={CountryPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/login" component={Auth} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Helmet>
          <title>LinkShare - WhatsApp Group Link Sharing Platform</title>
          <meta name="description" content="Discover and share WhatsApp groups with the community. Find groups by category or add your own WhatsApp group." />
          <meta name="keywords" content="WhatsApp, groups, community, social, sharing, links" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Helmet>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
