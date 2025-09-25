import { users } from '../dummyData/data.js'
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";


const userResolver = {
    Query: {
    },

    Mutation: {
        login: async (_, { input }) => {
            const { username, password } = input;


            const user = await User.findOne({ username });
            if (!user) {
                throw new Error("Invalid username or password");
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid username or password");
            }


            return {
                _id: user._id,
                username: user.username,
                name: user.name,
                gender: user.gender,
            };
        },
        signup: async (_, { input }) => {
            try {
                const { username, name, password, gender } = input;


                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("Username already taken");
                }


                const hashedPassword = await bcrypt.hash(password, 10);


                const newUser = new User({
                    username,
                    name,
                    password: hashedPassword,
                    gender,
                });

                await newUser.save();


                return {
                    _id: newUser._id,
                    username: newUser.username,
                    name: newUser.name,
                    gender: newUser.gender,
                };
            } catch (error) {
                console.error("Error in signup:", error);
                throw new Error(error.message || "Internal server error");
            }
        },
    },
};

export default userResolver;
