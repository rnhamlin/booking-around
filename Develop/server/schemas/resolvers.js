const resolvers = {
  Query: {
    me: () => {
      return 'Hello world!';
    }
  }
};

module.exports = resolvers;