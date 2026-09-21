import { createBrowserRouter, Outlet } from "react-router-dom";

import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";

import SearchBox from "./Components/SearchBox.jsx";
import FilterBox from "./Components/FilterBar.jsx";
import Trendings, { trendingLoader } from "./Components/Trendings.jsx";
import FloatingAIButton from "./Components/FloatingAIButton.jsx";
import AIRecommendation from "./pages/AIRecommendation.jsx";

import MangaDetail, { mangaLoader } from "./pages/MangaDetail.jsx";
import Library, { libraryLoader } from "./pages/library.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";

import Search, { searchLoader } from "./Components/Search.jsx";

/* ================= Layout اصلی ================= */
function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />

      <FloatingAIButton />

      <Footer />
    </>
  );
}

/* ================= Home Page ================= */
function Home() {
  return (
    <>
      <SearchBox />
      <FilterBox />
      <Trendings />
    </>
  );
}

/* ================= Router ================= */
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: trendingLoader,
      },

      {
        path: "manga/:id",
        element: <MangaDetail />,
        loader: mangaLoader,
      },

      {
        path: "search",
        element: <Search />,
        loader: searchLoader,
      },

      {
        path: "library",
        element: <Library />,
        loader: libraryLoader,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "/ai",
        element: <AIRecommendation />,
      },
    ],
  },
]);

export default router;
