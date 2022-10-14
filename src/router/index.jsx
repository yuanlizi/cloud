import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRoutes } from "react-router-dom"
const Login = React.lazy(() => import("../pages/Login/index"))
const Home = React.lazy(() => import("../pages/Home/index"))
const NotFound = React.lazy(() => import("../pages/NotFound/index"))
const routes = [
    {
        path: "/",
        element: <Navigate to="login" replace />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "home",
        element: <Home />
    },
    // {
    //     path: "home",
    //     element: <Home />,
    //     children: [
    //         {
    //             index: true,
    //             element: <div> home index route or default rendered </div>
    //         },
    //         {
    //             path: "system",
    //             children: [
    //                 {
    //                     path: "dict",
    //                     element: <Dict />,
    //                 },
    //                 {
    //                     path: "menu",
    //                     element: <Menu />,
    //                 },
    //                 {
    //                     path: "role",
    //                     element: <Role />,
    //                 },
    //                 {
    //                     path: "user",
    //                     element: <User />,
    //                 }
    //             ]
    //         },

    //     ]
    // },
    {
        path: "*",
        element: <NotFound />
    }
]
export default function Router() {
    const element = useRoutes(routes)
    return element
}