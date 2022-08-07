import { gql } from "@apollo/client";

/******** GET ALL CATEGORIES *********** */
export const GET_CATEGORIES = gql`
   
   {
    categories{
        id
        name
        items{
            id
            name
            description
            ImagePath
        }
    }
 }
    
`;

/******** GET ALL CATEGORIES *********** */
export const GET_SINGLE_CATEGORY = gql`

query($id: ID!){
  category(id: $id){
    id
    name
    items{
      id
      name
      description
      ImagePath
    }
  }
}
    
`;


/******** GET ALL FURNITURE ITEMS *********** */
export const GET_FURNITURE_ITEMS = gql`
   
   {
    furnitureItems{
        id
        name
        description
        ImagePath
        category{
            name
            }
    }
    }
    
`;

/******** GET ALL CATEGORIES *********** */
export const GET_SINGLE_FURNITURE_ITEM = gql`

query($id: ID!){
  furnitureItem(id: $id){
    id
    name
    description
    ImagePath
    category{
      name
    }
  }
}
    
`;