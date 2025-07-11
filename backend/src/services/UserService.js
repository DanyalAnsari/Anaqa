import UserRepository from "#repository/UserRepo";
import { GenToken } from "#utils/helpers/GenToken";
import { BadRequestException } from "#utils/errors/Exceptions";

export const RegisterUser = async (userData) => {
	try {
		const { email, password } = userData;

		if (!email || !password) {
			throw new BadRequestException("Invalid data sent by user");
		}

		const userExist = await UserRepository.getByEmail(email);
		if (userExist) {
			throw new BadRequestException("User with this email already exist");
		}

		const newUser = await UserRepository.registerUser(userData);

		const TOKEN = GenToken({
			id: newUser._id,
			email: newUser.email,
		});

		return {
			user: {
				name: newUser.name,
				email: newUser.email,
				id: newUser._id,
			},
			token: TOKEN,
		};

	} catch (error) {
		throw error;
	}
};

export const UserLogin = async (userData) => {
	try {
		const { email, password } = userData;
		if (!email || !password) {
			throw new BadRequestException("Invalid data sent by user");
		}

		const userExist = await UserRepository.getByEmail(email);
		if (!userExist) {
			throw new BadRequestException("User with this email does not exist");
		}

		const isPasswordMatch = userExist.comparePassword(password);

		if (!isPasswordMatch) {
			throw new BadRequestException("invalid password, Please try again");
		}

		const TOKEN = GenToken({
			id: userExist._id,
			email: userExist.email,
		});

		return {
			user: {
				name: userExist.name,
				email: userExist.email,
				id: userExist._id,
			},
			token: TOKEN,
		};
	} catch (error) {
		throw error;
	}
};
