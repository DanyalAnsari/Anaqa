import { useAuth } from "@/app/hooks/useAuth";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		toast.error("Please login to continue");
		return <Navigate to="/auth" state={{ from: location }} replace />;
	}
    
	// User is authenticated and has required role (if any)
	return children;
};

export default ProtectedRoute;
