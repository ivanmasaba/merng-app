if(process.env.NODE_env != 'production'){
    require('dotenv').config()
  }

const { ApolloServer } = require('apollo-server-express');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress');
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const express = require('express');
// import mongo db
const mongoose = require('mongoose');

const cors = require('cors');


// get schemas
const { typeDefs } = require('./schema/TypeDefs');
const { resolvers } = require('./schema/Resolvers');

async function startApolloServer() {
  const app = express();
  app.use(cors())
  app.use(express.static('public'))

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({app}),
        ApolloServerPluginLandingPageDisabled()
    ],
        
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  // connect to db
mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true
  } );

  const db = mongoose.connection
db.on( 'error', error => console.error(error) )

db.once( 'open', async () => {

    console.log( "Connected to mongoose..." ) 
    
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));

    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    
    })

//   await new Promise(resolve => app.listen({ port: 4000 }, resolve));

//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer()