import jwt from "jsonwebtoken";
import { JWT_SECRET } from "#config/appConfig";
import UserRepository from "#repository/UserRepo";
import {
	BadRequestException,
	UnauthorizedException,
} from "#utils/errors/Exceptions";

export const AuthMiddleware = async (req, res, next) => {
	const { authorization } = req.headers;
	try {
		const Token = authorization?.split(" ")[1];

		if (!Token) {
			throw new UnauthorizedException("No auth Token is provided");
		}

		const isTokenValid = jwt.verify(Token, JWT_SECRET);

		if (!isTokenValid) {
			throw new BadRequestException("Invalid authentication token");
		}

		const user = await UserRepository.findById(isTokenValid.id);
		if (!user) {
			throw new UnauthorizedException("User not found");
		}

		req.user = user;
		next();
	} catch (error) {
		// Convert JWT errors to appropriate HTTP errors
		if (error instanceof jwt.JsonWebTokenError) {
			if (error.name === "TokenExpiredError") {
				error = new UnauthorizedException("Token expired");
			} else {
				error = new BadRequestException("Invalid token");
			}
		}
		next(error);
	}
};
