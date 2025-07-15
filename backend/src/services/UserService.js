import UserRepository from "#repository/UserRepo";
import { BadRequestException } from "#utils/errors/Exceptions";

export const RegisterUser = async (userData) => {
	try {
		const { name, email, password } = userData;

		if (!email || !password) {
			throw new BadRequestException("Invalid data sent by user");
		}

		const userExist = await UserRepository.getByEmail(email);
		if (userExist) {
			throw new BadRequestException("User with this email already exist");
		}

		const newUser = await UserRepository.registerUser({
			name,
			email,
			password,
		});

		const user = {
			name: newUser.name,
			email: newUser.email,
			id: newUser._id,
		};
		return user;
	} catch (error) {
		throw error;
	}
};

export const Authenticate = async (userData) => {
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

		const user = {
			name: userExist.name,
			email: userExist.email,
			id: userExist._id,
		};

		return user;
	} catch (error) {
		throw error;
	}
};
