import {createBrowserRouter, type RouteObject} from "react-router";
import App from "../App.tsx";
import DropdownSelectPage from "../pages/DropdownSelect.Page.tsx";
import UsersPage from "../pages/Users.Page.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <></>},
            {path: "dropdown", element: <DropdownSelectPage />},
            {path: "users", element: <UsersPage />},
            // {path: "*", element: <NotFound/>}
        ]
    } as RouteObject
]);
