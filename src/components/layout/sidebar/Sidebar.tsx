import "./sidebar.css";
import {Link, useLocation} from "react-router";

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className={"sidebar"}>
            <ul>
                <li>
                    <Link className={"sidebar__link"} data-active={location.pathname === "/"} to="/">Home</Link>
                </li>

                <li>
                    <Link className={"sidebar__link"} data-active={location.pathname === "/dropdown"} to="/dropdown">Dropdown Select</Link>
                </li>

                <li>
                    <Link className={"sidebar__link"} data-active={location.pathname === "/users"} to="/users">Users</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;