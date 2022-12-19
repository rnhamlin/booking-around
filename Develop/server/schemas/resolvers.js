const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findone({ _id: context.user.id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("not logged in");
    },
    Mutatuion: {
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect credentials");
        }

        const token = signToken(user);
        return { token, user };
      },
      saveBook: async (parent, { book }, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: book } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in to do this");
      },
      removeBook: async (parent, args, context) => {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError("You need to be logged in to do this");
      },
    },
  },
};

module.exports = resolvers;
