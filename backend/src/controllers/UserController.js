import { ACCESS_TOKEN_EXPIRY, NODE_ENV } from "#config/appConfig";
import UserRepository from "#repository/UserRepo";
import { GenTokenService, TokenRefreshService } from "#services/AuthServices";
import { Authenticate, RegisterUser } from "#services/UserService";
import {
	BadRequestException,
	UnauthorizedException,
} from "#utils/errors/Exceptions";
import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";

export const registerUserController = ControllerErrorHandler(
	async (req, res, next) => {
		const { name, email, password } = req.body;
		const user = await RegisterUser({ name, email, password });

		const { accessToken, refreshToken } = GenTokenService(user.id);

		const data = {
			user,
			token: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRY },
		};

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		return { message: "Successfully registered", data };
	}
);

export const tokenRefreshController = ControllerErrorHandler(
	async (req, res, next) => {
		const { refreshToken } = req.cookies;
		try {
			const { accessToken, newRefreshToken } = await TokenRefreshService(
				refreshToken
			);

			res.cookie("refreshToken", newRefreshToken, {
				httpOnly: true,
				secure: NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			});

			return { token: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRY } };
		} catch (error) {
			res.clearCookie("refreshToken");
			throw error;
		}
	}
);

export const userLoginController = ControllerErrorHandler(
	async (req, res, next) => {
		const { email, password } = req.body;

		const user = await Authenticate({ email, password });

		const { accessToken, refreshToken } = GenTokenService(user.id);

		const data = {
			user,
			token: { accessToken, expiresIn: ACCESS_TOKEN_EXPIRY },
		};

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		return { message: "User signed in successfully", data };
	}
);

export const userLogoutController = ControllerErrorHandler(
	async (req, res, next) => {
		res.clearCookie("refreshToken");

		return { message: "Logged out successfully" };
	}
);
