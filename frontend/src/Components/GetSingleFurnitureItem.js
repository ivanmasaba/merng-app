import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_SINGLE_FURNITURE_ITEM } from '../GraphQL/Queries';
import { useParams } from 'react-router-dom';
import DisplayItems from './DisplayItems';

const GetSingleFurnitureItem = () => {
    const { id } = useParams();
    const { error, loading, data } = useQuery(GET_SINGLE_FURNITURE_ITEM,{
        variables: { id: id }
    }); 
    const [ item, setItem ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setItem( data.furnitureItem );
        }        
    }, [data]);

    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>

    return ( 
        <>

            <DisplayItems item={item} />

        </>
     );
}
 
export default GetSingleFurnitureItem;