const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # define types of object to use
    scalar Upload

    #FILES
    type File{
        filename: String!
        mimetype: String!
    }

    # categories
    type category{
            id: ID!
            name: String!
            items: [furniture!]!
    }

    #################################

# Furniture items
type furniture{
        id: ID!
        name: String!
        categoryID: ID!
        description: String!
        imageName: String
        ImageType: String
        ImagePath: String
        category: category!
   
}

#############################


    # Queries
    type Query{
        ######### CATEGORY QUERIES ##########
        categories: [category!]!
        category(id: ID!): category!
        ####### FURNITURE QUERIES #########
        furnitureItems: [furniture!]!
        furnitureItem(id: ID!): furniture!
    }

    # Mutations
    type Mutation{
        # File uplaod
        fileUpload(file: Upload!): File!
        #### CREATE CATEGORY #######
        createCategory(name: String!): category!
        #### CREATE FURNITURE ITEM #######
        createItem(name: String!, categoryID: ID!, description: String!, file: Upload!): furniture!
    }

`;

module.exports = { typeDefs };