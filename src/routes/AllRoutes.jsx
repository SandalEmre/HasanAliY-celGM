import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteModels from "./RouteModels";
import LoadingSpinner from "../components/LoadingSpinner";

function AllRoutes() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <BrowserRouter>
                    <Routes>
                        {RouteModels.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <route.layout hideNavbarAndFooter={route.hideNavbarAndFooter}>
                                        <route.component />
                                    </route.layout>
                                }
                            />
                        ))}
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}

export default AllRoutes;