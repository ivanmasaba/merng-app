import { useMutation } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';
import { CREATE_FURNITURE_ITEM } from '../GraphQL/Mutations';
import { GET_CATEGORIES, GET_FURNITURE_ITEMS } from '../GraphQL/Queries';
import { useNavigate } from 'react-router-dom';

const CreateItem = () => {
    const { data } = useQuery(GET_CATEGORIES);
    var category = [{key: '', value: '', text: ''}];

    useEffect(() =>{
        if(data){ // if data is returned from server
            data.categories.forEach(element => {
             category.push({key: element.id, value: element.id, text: element.name})
            });
        }        
    }, [data]);
    // const [errors, setErrors] = useState({});
    const [name, setName] = useState(''); 
    const [categoryID, setCategoryID] = useState(''); 
    const [description, setDescription] = useState(''); 
    const [pic, setPic] = useState(); 

    const [createItem, {loading, error}] = useMutation( CREATE_FURNITURE_ITEM,{
         refetchQueries:[{query: GET_FURNITURE_ITEMS}] });

    const navigate = useNavigate();


    const onSubmit = (e) =>{
        e.preventDefault();

        createItem({variables: {name: name, categoryID: categoryID, description: description, file: pic }});

         navigate('/furniture');
    }

    // if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return ( 
        <div className='form-container'> 
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : '' }>
                <h3>New Item</h3>
                <Form.Input
                    label="Name"
                    placeholder="Name of item"
                    type='text'
                    name="name"
                    value={name }
                    onChange={(e) => setName(e.target.value)}
                    />

                    <select value={categoryID} onChange={e => setCategoryID(e.target.value)}>
                        
                        { data && data.categories.map( cat => {
                             return   <option key={cat.id} value={cat.id}>{cat.name}</option>
                        })}
                        
                    </select>

                    <Form.TextArea
                    label="Description"
                    placeholder="description of item"
                    name="description"
                    value={ description }
                    onChange={(e) => setDescription(e.target.value)}
                     />
                     <Form.Field>
                        <Button as="label" htmlFor="file" type="button">
                           Upload a photo
                        </Button>
                        <input type="file" id="file" hidden onChange={(e) => {setPic(e.target.files[0]); }} />
                     </Form.Field>
                   

                    <Button type='submit' primary>
                        Create
                    </Button>
            </Form>
        </div>

     );
}
 
export default CreateItem;