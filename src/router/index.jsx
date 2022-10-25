import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRoutes } from "react-router-dom"
const Login = React.lazy(() => import("../pages/Login/index"))
const Home = React.lazy(() => import("../pages/Home/index"))
const Bar = React.lazy(() => import("../pages/Bar/index"))
const Category = React.lazy(() => import("../pages/Category/index"))
const Index = React.lazy(() => import("../pages/Index/index"))
const Line = React.lazy(() => import("../pages/Line/index"))
const Order = React.lazy(() => import("../pages/Order/index"))
const Pie = React.lazy(() => import("../pages/Pie/index"))
const Product = React.lazy(() => import("../pages/Product/index"))
const AddUpdate = React.lazy(() => import("../pages/AddUpdate/index"))
const Role = React.lazy(() => import("../pages/Role/index"))
const User = React.lazy(() => import("../pages/User/index"))
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
        path: "index",
        element: <Navigate to="home" replace />
    },
    {
        path: "index",
        element: <Index />,
        children: [
            {
                path: "charts/bar",
                element: <Bar />
            },
            {
                path: "category",
                element: <Category />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "charts/line",
                element: <Line />
            },
            {
                path: "order",
                element: <Order />
            },
            {
                path: "charts/pie",
                element: <Pie />
            },
            {
                path: "product",
                element: <Product />
            },
            {
                path: "product/addUpdate",
                element: <AddUpdate />
            },
            {
                path: "role",
                element: <Role />
            },
            {
                path: "user",
                element: <User />
            }

        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]
export default function Router() {
    const element = useRoutes(routes)
    return element
}