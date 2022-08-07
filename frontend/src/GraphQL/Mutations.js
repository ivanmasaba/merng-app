import { gql } from "@apollo/client";

/******** CREATE A NEW CATEGORY *********** */
export const CREATE_CATEGORY = gql`
        mutation($name: String!){
        createCategory(name: $name){
            name
        }
        },
    
`;

/******** CREATE A NEW FURNITURE ITEM *********** */
export const CREATE_FURNITURE_ITEM = gql`
        mutation(
  $name: String!,
  $categoryID: ID!,
  $description: String!,
  $file: Upload!){
    createItem(
      name: $name,
      categoryID: $categoryID,
      description: $description,
      file: $file
    ){
      id
    }
}

`;