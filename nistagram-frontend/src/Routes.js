import MainLayout from "./components/MainLayout";
import UserLayout from "./components/UserLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";

const routes = [
  {
    path: "/app",
    component: MainLayout,
    routes: [
      {
        path: "/app/login",
        component: Login,
      },
      {
        path: "/app/register",
        component: Register,
      },
      {
        path: "/app/404",
        component: NotFound,
      },
    ],
  },
  {
    path: "/user",
    component: UserLayout,
    routes: [
      {
        path: "/user/posts",
        component: NotFound,
      },
      {
        path: "/user/profile",
        component: UserProfile,
      },
    ],
  },
];

export default routes;
