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
                    <Link className={"sidebar__link"} data-active={location.pathname === "/dropdown"} to="/dropdown">DropdownSelected</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;