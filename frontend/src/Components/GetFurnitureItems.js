import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_FURNITURE_ITEMS, GET_SINGLE_CATEGORY } from '../GraphQL/Queries';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GetFurnitureItems = () => {
    const param = useParams()

    const { error, loading, data } = useQuery(GET_SINGLE_CATEGORY,{
        variables: { id: param }
    });
    const [ items, setItems ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setItems(data.furnitureItems);
            console.log(data);
        }        
    }, [data]);

    if(loading) return <div>{ loading }</div>

    if(error) return <div>{ error.message }</div>

    return ( 
        <>
        { items.map( item => {
            return(
                <p key={item.id}>
                    { item.name }
                    { item.description }
                    { item.category.name }
                </p>
            ) 
        }) }
        </>
     );
}
 
export default GetFurnitureItems;