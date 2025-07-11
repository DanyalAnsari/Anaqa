import jwt from "jsonwebtoken";
import { JWT_SECRET } from "#config/appConfig";
import UserRepository from "#repository/UserRepo";
import {
	BadRequestException,
	UnauthorizedException,
} from "#utils/errors/Exceptions";
import AppError from "#utils/errors/AppError";

export const AdminAuthMiddleware = async (req, res, next) => {
	// try {
	// 	const Token = req.headers["x-access-token"];
	// 	if (!Token) {
	// 		throw new UnauthorizedException("No auth Token is provided");
	// 	}

	// 	const isTokenValid = jwt.verify(Token, JWT_SECRET);
	// 	if (!isTokenValid) {
	// 		throw new BadRequestException("Invalid authentication token");
	// 	}

	// 	const user = await UserRepository.findById(isTokenValid.id);
	// 	if (!user) {
	// 		throw new UnauthorizedException("User not found");
	// 	}

	// 	if (user.role !== "admin") {
	// 		throw new UnauthorizedException("Access denied");
	// 	}

	// 	req.user = user;
	// 	next();
	// } catch (error) {
	// 	throw AppError(error, "error in auth admin middleware");
	// }
};
