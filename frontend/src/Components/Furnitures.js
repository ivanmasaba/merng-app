import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import { GET_FURNITURE_ITEMS } from '../GraphQL/Queries';
import DisplayItems from './DisplayItems';

const Furnitures = () => {
    
    const { error, loading, data } = useQuery(GET_FURNITURE_ITEMS);
    const [ items, setItems ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setItems(data.furnitureItems); 
        }        
    }, [data]);


    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>


    return ( 
        <Grid columns={3} >
            <Grid.Row className='page-title'>
                <h2>Furniture Items</h2>
            </Grid.Row>
            <Grid.Row>   
                {items && items.map(item => (
                 <Grid.Column key={item.id}>
                    <DisplayItems item={item} />
                 </Grid.Column>

                ))}
              </Grid.Row>
        </Grid>
    );
}
 
export default Furnitures;