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
        throw new AuthenticationError("There is no profile with this email.");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password.");
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    saveBook: {},
    // removeSkill: async (parent, { book }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedBooks: book } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You are not logged in.");
    // },
  },
};

module.exports = resolvers;
