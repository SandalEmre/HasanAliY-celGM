import HomeLayout from "../layout/HomeLayout";
import HomeView from "../view/home/HomeView";
import ErrorView from "../view/error/ErrorView";
import Register from "../view/register/Register";
import Cafeteria from "../view/cafeteria/Cafeteria";
import JobApplication from "../view/Job Application/JobApplication";
import Apply from "../view/apply/apply";

var routes = [
    {
        path: "/",
        layout: HomeLayout,
        component: HomeView,
        hideNavbarAndFooter: false,
    },
    {
        path: "/*",
        layout: HomeLayout,
        component: ErrorView,
        hideNavbarAndFooter: true,
    },
    {
        path: "/register",
        layout: HomeLayout,
        component: Register,
        hideNavbarAndFooter: false,
    },
    {
        path: "/JobsApplication",
        layout: HomeLayout,
        component: JobApplication,
        hideNavbarAndFooter: true,
    },
    {
        path: "/apply",
        layout: HomeLayout,
        component: Apply,
        hideNavbarAndFooter: true,
    },
    {
        path: "/cafeteria",
        layout: HomeLayout,
        component: Cafeteria,
        hideNavbarAndFooter: false,
    },
];

export default routes;