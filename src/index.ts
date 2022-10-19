import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth";
import {typeDefs} from "./types"
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
require('dotenv').config()
const { OGM } = require("@neo4j/graphql-ogm") 
var jwt = require('jsonwebtoken');
import { compare, hash, getSalt } from "./helpers/passwordUtils";


const driver = neo4j.driver(
    'neo4j+s://3af1e591.databases.neo4j.io',
    neo4j.auth.basic('neo4j', 'E-r9PlqZMgSwO4JKRwwr5o7nhntIkAK9w3L8dhdoAcU')
);

const ogm = new OGM({ typeDefs, driver });
const User = ogm.model("User");

const resolvers = {
  Mutation: {
      signUp: async (_source:any, { username, password, name, email }: any) => {
          const [existing] = await User.find({
              where: {
                  username,
              },
          });

          if (existing) {
              throw new Error(`User with username ${username} already exists!`);
          }

          const salt = getSalt()
          const hashedPassword = hash(password, salt)
          

          const { users } = await User.create({
              input: [
                  {
                      username,
                      password: hashedPassword,
                      salt,
                      name,
                      role: 'User',
                      email,
                      bookmarks: [],
                      createdAt: new Date().toISOString(),
                      updatedAt: new Date().toISOString(),
                  }
              ]
          });
          return jwt.sign({ sub: users[0].id }, 'shhhhh');
      },
      signIn: async (_source:any, { username, password }:any) => {
          const [user] = await User.find({
              where: {
                  username,
              },
          });

          if (!user) {
              throw new Error(`User with username ${username} not found!`);
          }

          const correctPassword = compare(password, user.password, user.salt)

          if (!correctPassword) {
              throw new Error(`Incorrect password for user with username ${username}!`);
          }
          return jwt.sign({ sub: user.id }, 'shhhhh');
      },
  },
};


const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers,
  plugins: {
      auth: new Neo4jGraphQLAuthJWTPlugin({
          secret: "secret"
      })
  }
});


export default Promise.all([neoSchema.getSchema(), ogm.init()])
.then(([schema]) => {
  const server = new ApolloServer({
      schema,
      context: ({ req }:any) => ({ req }),
  });

  server.listen().then(({ url }:any) => {
      console.log(`🚀 Server ready at ${url}`);
  });
});