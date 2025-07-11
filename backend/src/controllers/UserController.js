import { RegisterUser, UserLogin } from "#services/UserService";
import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";

export const registerUserController = ControllerErrorHandler(
	async (req, res, next) => {
		const data = await RegisterUser(req.body);

		return { message: "User Created Successfully", data };
	}
);

export const userLoginController = ControllerErrorHandler(
	async (req, res, next) => {
		const { email, password } = req.body;

		const data = await UserLogin({ email, password });

		return { message: "User signed in successfully", data };
	}
);
