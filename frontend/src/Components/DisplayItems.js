import React from 'react';
import {Link} from 'react-router-dom'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';

const DisplayItems = ({ item }) => {

    return ( 
        <Card style={{ marginBottom:20 }} as={Link} to={`/furniture/${item.id}`}>
            <Card.Content>
                <Image
                    floated='right'
                    size='medium'
                    src={item.ImagePath}
                />
                <Card.Header>{item.name}</Card.Header>
                <Card.Description>{item.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as="div" labelPosition='right' >
                    <Button color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        See
                    </Label>
                </Button>
            </Card.Content>
        </Card>
     );
}
 
export default DisplayItems;