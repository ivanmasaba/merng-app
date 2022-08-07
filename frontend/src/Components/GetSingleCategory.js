import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {GET_SINGLE_CATEGORY } from '../GraphQL/Queries';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import DisplayItems from './DisplayItems';

const GetSingleCategory = () => {
    const { id } = useParams();
    const { error, loading, data } = useQuery(GET_SINGLE_CATEGORY, {
        variables: { id: id }
    }); 
    const [ category, setcategory ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setcategory( data.category );
        }        
    }, [data]);

    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>

    return ( 
        <>
                       
                <div key={category.id}>
                    <h1>Category: <strong>{ category.name }</strong></h1>
                    <div>
                                <Grid columns={3} >
                                <Grid.Row>
                                    <h2>Furniture Items</h2>
                                </Grid.Row>
                                <Grid.Row>   
                                    {category.items && category.items.map(item => (
                                     <Grid.Column key={item.id}>
                                        <DisplayItems item={item} />
                                     </Grid.Column>
                    
                                    ))}
                                  </Grid.Row>
                            </Grid>
                    </div>
                </div>

        </>
     );
}
 
export default GetSingleCategory;