import jwt from "jsonwebtoken";
import {
	ACCESS_TOKEN_EXPIRY,
	REFRESH_TOKEN_EXPIRY,
	JWT_SECRET,
} from "#config/appConfig";

export const GenToken = (payload) => {
	const accessToken = jwt.sign(payload, JWT_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	});
	const refreshToken = jwt.sign(payload, JWT_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRY,
	});

	return { accessToken, refreshToken };
};
