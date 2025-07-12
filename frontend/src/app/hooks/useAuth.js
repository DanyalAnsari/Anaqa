import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
	selectIsAuthenticated,
	logout as logoutAction,
	selectUser,
	selectToken,
} from "@/features/auth/authSlice";
import {
	authHelpers,
	useLoginMutation,
	useRegisterMutation,
} from "@/features/auth/authApi";
import toast from "react-hot-toast";

export const useAuth = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const token = useSelector(selectToken);

	const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
	const [registerMutation, { isLoading: isRegisterLoading }] =
		useRegisterMutation();

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
			// This stores token via onQueryStarted but not user data
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
				error.data?.msg || error.message || "Registration failed!";
			toast.error(errorMessage);
			throw error;
		}
	};
	const handleLogout = () => {
		dispatch(logoutAction());
		authHelpers.logout();
		navigate("/", { replace: true });
		toast.success("Logged out successfully!");
	};

	return {
		handleLogin,
		handleRegister,
		handleLogout,
		isLoginLoading,
		isRegisterLoading,
		isLoading: isLoginLoading || isRegisterLoading,
		isAuthenticated,
		user,
		token,
	};
};
