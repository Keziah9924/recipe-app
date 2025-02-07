import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./sidebar"
import { faHome, faList, faCog } from "@fortawesome/free-solid-svg-icons"
import { useAtom } from "jotai"
import { AuthToken } from "../store"

export default function Navbar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const location = useLocation()
    const [token, setToken] = useAtom(AuthToken)

    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList

        },
        {
            name: "Settings",
            path: "/settings",
            icon: faCog
        }
    ]

    const authLinks = [
        {
            name: "Login",
            path: "/login",
            icon: faCog
        },
        {
            name: "Register",
            path: "/register",
            icon: faCog
        }
    ]

    const handleLogout = () => {
        setToken(null)
    }

    function closeSidebar() {
        setShowSidebar(false)
    }
    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">F<span>oo</span>diesHub</Link>
                <div className="nav-links">
                    {token?
                        links.map(link => (
                            <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>
                                {token && (link.name === 'Login' || link.name === 'Register') ? "" : link.name}
                            </Link>
                        ))
                    :
                    authLinks.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>
                            {token && (link.name === 'Login' || link.name === 'Register') ? "" : link.name}
                        </Link>
                    ))}
                    {/* <a href="#!">Home</a>
        <a href="#!">Recipes</a>
        <a href="#!">Settings</a> */}
                    {token && <button style={{ padding: '2px 4px', backgroundColor: 'pink', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>}
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            {showSidebar && <Sidebar close={closeSidebar} links={links} />}

        </>
    )
}