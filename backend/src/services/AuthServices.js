import jwt from "jsonwebtoken";
import {
	ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_EXPIRY,
	JWT_SECRET,
} from "#config/appConfig";
import { UnauthorizedException } from "#utils/errors/Exceptions";

export const GenTokenService = (userId) => {
	const accessToken = jwt.sign({ id: userId }, JWT_SECRET, {
		expiresIn: parseInt(ACCESS_TOKEN_EXPIRY),
	});
	const refreshToken = jwt.sign({ id: userId }, JWT_SECRET, {
		expiresIn: parseInt(REFRESH_TOKEN_EXPIRY),
	});

	return { accessToken, refreshToken };
};

export const TokenRefreshService = async (refreshToken) => {
	try {
		if (!refreshToken) {
			throw new UnauthorizedException("Login again");
		}

		const decoded = jwt.verify(refreshToken, JWT_SECRET);

		if (decoded) {
			const { accessToken, refreshToken } = GenTokenService(decoded.id);
			return { accessToken, newRefreshToken: refreshToken };
		}
	} catch (error) {
		throw error;
	}
};
