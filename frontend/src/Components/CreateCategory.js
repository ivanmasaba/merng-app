import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { CREATE_CATEGORY } from '../GraphQL/Mutations';
import { GET_CATEGORIES } from '../GraphQL/Queries';

const CreateCategory = () => {
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({ category_name:'' });
    const [createCategory, {loading}] = useMutation( CREATE_CATEGORY,{ 
                                                                refetchQueries:[{query: GET_CATEGORIES}],
                                                                onError(err){
                                                                    console.log(err&&err.graphQLErrors[0].extensions.exception.errors)
                                                                    setErrors(err&&err.graphQLErrors[0].extensions.exception.errors)
                                                                }
                                                            });
    const navigate = useNavigate();

    const onChange = (e) =>{
        
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        createCategory({variables: { name: values.category_name }});
        // if (error) setErrors(err&&err.graphQLErrors[0].extensions.exception.errors)
    }

    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    return ( 
        <div>
            <Form onSubmit={onSubmit} className={loading ? 'loading' : '' }>
                <h3>New Category</h3>
                <Form.Input
                    label="category name"
                    placeholder="category name"
                    type='text'
                    name="category_name"
                    error={errors.category_name ? true : false}
                    value={ values.category_name }
                    onChange={onChange}
                    />

                    <Button type='submit' primary>
                        Create
                    </Button>
            </Form>

          {Object.keys(errors).length > 0 && (
             <div className="ui error message">
                <ul className="list">
                    { Object.values(errors).map(({value, path}) =>  (
                        <li key={value} >{path}</li>
                    ))}
                </ul>
            </div>
                    )}
               
        </div>
     );
}
 
export default CreateCategory;