import CrudRepository from "./CrudRepo.js";
import User from "#models/UserModel";

const UserRepository = {
	...CrudRepository(User),
	getByEmail: async (email) => {
		const user = await User.findOne({ email }).select("+password");
		return user;
	},
	registerUser: async (data) => {
		const newUser = new User(data);
		const updatedUser = await newUser.save();
		return updatedUser;
	},
};

export default UserRepository;
