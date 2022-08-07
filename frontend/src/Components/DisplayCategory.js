import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label } from 'semantic-ui-react';

const DisplayCategory = ({ category }) => {

    return ( 
    <>
                <Card as={Link} to={`/categories/${category.id}`} >
                    <Card.Content>
                        <Card.Header>{category.name}</Card.Header>
                        <Card.Description>Details about cat</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <p>buttons</p>
                    </Card.Content>
                </Card>

            
    </>
     );
}
 
export default DisplayCategory;