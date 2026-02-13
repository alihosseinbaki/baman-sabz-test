import {ReactNode} from 'react';
import "./layout.css";
import Sidebar from "./sidebar/Sidebar.tsx";


interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children} : LayoutProps) => {
    return (
        <div className={"layout"}>
            <Sidebar />

            <section className={"main"}>
                {children}
            </section>
        </div>
    );
};

export default Layout;