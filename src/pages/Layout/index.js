import { useEffect } from "react";
import { useNavigate , Outlet } from "react-router-dom";

export function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        const publicPath = ["/login", "/signup"];
        const nonPublicPath = ["/dashboard"];
        const isPublicPath = publicPath.includes(window.location.pathname);
        const isNonPublicPath = nonPublicPath.includes(window.location.pathname);

        if(isPublicPath && localStorage.token) navigate("/dashboard");
        else if(isNonPublicPath && !localStorage.token) navigate("/login");
        else console.log(window.location.pathname);
    }, [])

    return (
        <>
            <Outlet/>
        </>
    )
}