import './App.css';
import Layout from "./components/layout/Layout.tsx";
import {Outlet} from "react-router";

function App() {

  return (
    <Layout>
        <Outlet/>
    </Layout>
  )
}

export default App
