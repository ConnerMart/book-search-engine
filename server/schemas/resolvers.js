const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const { User } = require("../models/User");
const { Book } = require("../models/Book");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You are not logged in.");
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: {},
    saveBook: {},
    removeBook: {},
  },
};

module.exports = resolvers;
