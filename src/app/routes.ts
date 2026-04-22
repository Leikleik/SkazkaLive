import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./components/HomePage";
import { CatalogPage } from "./components/CatalogPage";
import { DashboardPage } from "./components/DashboardPage";
import { LessonSetupPage } from "./components/LessonSetupPage";
import { StoryReadingPage } from "./components/StoryReadingPage";
import { ResultsPage } from "./components/ResultsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "lesson/:id", Component: LessonSetupPage },
      { path: "story/:id", Component: StoryReadingPage },
      { path: "results/:id", Component: ResultsPage },
    ],
  },
]);
