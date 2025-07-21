import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
	selectIsAuthenticated,
	selectUser,
	selectToken,
} from "@/features/auth/authSlice";
import {
	useLoginMutation,
	useLazyLogoutQuery, // Using lazy query for GET request
	useRegisterMutation,
} from "@/features/auth/authApi";
import toast from "react-hot-toast";

export const useAuth = () => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const token = useSelector(selectToken);

	const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
	const [registerMutation, { isLoading: isRegisterLoading }] =
		useRegisterMutation();
	const [triggerLogout, { isLoading: isLoggingOut }] = useLazyLogoutQuery(); // Using lazy query

	const handleLogin = async (data) => {
		try {
			const response = await loginMutation({
				email: data.email,
				password: data.password,
			}).unwrap();

			toast.success("Welcome back!");
			navigate("/", { replace: true });
			return response;
		} catch (error) {
			const errorMessage = error.data?.msg || error.message || "Login failed!";
			toast.error(errorMessage);
			throw error;
		}
	};

	const handleRegister = async (data) => {
		try {
			const response = await registerMutation({
				name: data.name,
				email: data.email,
				password: data.password,
			}).unwrap();

			toast.success("Your account has been created!");
			navigate("/", { replace: true });
			return response;
		} catch (error) {
			const errorMessage =
				error.data?.message || error.message || "Registration failed!";
			toast.error(errorMessage);
			throw error;
		}
	};

	const handleLogout = async () => {
		try {
			await triggerLogout();
			toast.success("Logged out successfully!");
			navigate("/", { replace: true });
		} catch (error) {
			toast.dismiss();
			const errorMessage = error.data?.msg || error.message || "Logout failed!";
			toast.error(errorMessage);
			throw error;
		}
	};

	return {
		handleLogin,
		handleRegister,
		handleLogout,
		isLoginLoading,
		isRegisterLoading,
		isLoggingOut,
		isLoading: isLoginLoading || isRegisterLoading || isLoggingOut,
		isAuthenticated,
		user,
		token,
	};
};
