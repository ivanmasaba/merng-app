import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import { GET_CATEGORIES } from '../GraphQL/Queries';
import DisplayCategory from './DisplayCategory';

const Categories = () => {
    const { error, loading, data } = useQuery(GET_CATEGORIES);
    const [ categories, setcategories ] = useState([]);

    useEffect(() =>{
        if(data){ // if data is returned from server
            setcategories(data.categories); 
        }        
    }, [data]);


    if(loading) return <div> loading.... </div>

    if(error) return <div>{ error.message }</div>
    
    return ( 
        <Grid columns={3} >
            <Grid.Row className='page-title'>
                <h2>Furniture Categories</h2>
            </Grid.Row>
            <Grid.Row>   
                {categories && categories.map(category => (
                 <Grid.Column key={category.id} style={{ marginBottom: 20 }}>
                    <DisplayCategory category={category} />
                 </Grid.Column>

                ))}
              </Grid.Row>
        </Grid>
     );
}
 
export default Categories;