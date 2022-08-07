import React, { useState} from 'react';

import { useMutation, gql } from '@apollo/client'; 


const UPLOAD_FILE = gql`
    mutation FileUpload($file: Upload!){
        fileUpload(file: $file){
            filename
            mimetype
        }
       
    }
`;

const FurnitureForm = () => { 

    const [fileUpload, {data, loading, error}] = useMutation(UPLOAD_FILE)

    
    const [selectedFile, setSelectedFile] = useState();

    const u = "http://localhost:4000/images/20160315_110539.jpg";

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log( selectedFile )

        if(!selectedFile){
            return
        }

        fileUpload({ variables: { file: selectedFile }})
     
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    console.log( data )
    return ( 
        <>
            {/* <img src={u} alt="ll" /> */}
       
       <form onSubmit={handleSubmit}>
       
       <h3>Add a new Furniture Item</h3>

       <div >           
       <label>Image:</label>
       <input
       type="file"
       name='file'
       onChange={(e) => {setSelectedFile(e.target.files[0]); }}
       />
           </div>

       <button type="submit">Add Item</button>
   </form>
        </>
        
        
       
     );
}
 
export default FurnitureForm;