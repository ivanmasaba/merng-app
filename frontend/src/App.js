import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Container } from 'semantic-ui-react';
import CreateCategory from './Components/CreateCategory';
import GetFurnitureItems from './Components/GetFurnitureItems';
import GetSingleCategory from './Components/GetSingleCategory';
import GetSingleFurnitureItem from './Components/GetSingleFurnitureItem';

import MenuBar from './Components/MenuBar';

// pages
import CategoriesPage from './pages/CategoriesPage';
import CreateItem from './pages/CreateItem';
import FurnitureItems from './pages/FurnitureItems';
import Home from './pages/Home';



const App = () => { 

    return ( 
        <div className="App">
            <Container>
            <BrowserRouter>
        <MenuBar />
            <div className="pages">
                <Routes>
                <Route 
                        path="/"
                        element={ <Home /> }
                    />
                    <Route 
                        path="/categories"
                        element={ <CategoriesPage /> }
                    />

                    <Route 
                        path="/createcategory"
                        element={ <CreateCategory /> }
                    />
                    <Route 
                        path="/createItem"
                        element={ <CreateItem /> }
                    />
                    <Route 
                        path="/categories/:id"
                        element={ <GetSingleCategory /> }
                    />

                     <Route 
                        path="/furniture"
                        element={ <FurnitureItems /> }
                    />

                     <Route 
                        path="/furniture/:id"
                        element={ <GetSingleFurnitureItem /> }
                    />
                </Routes>
            </div>
        </BrowserRouter>
            </Container>
        </div>
             
       
     );
}
 
export default App;