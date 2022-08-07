import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
    const pathName = window.location.pathname;
    const path = pathName === '/' ? "home" : pathName.substring(1);

    const [activeItem, setActiveItem] = useState('path');

    const handleItemClick = (e, { name }) => setActiveItem(name)

  
    return (
      
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          
          <Menu.Menu position='right'>
            <Menu.Item
                name='categories'
                active={activeItem === 'categories'}
                onClick={handleItemClick}
                as={Link}
                to="/categories"
            />

            <Menu.Item
              name='items'
              active={activeItem === 'items'}
              onClick={handleItemClick}
              as={Link}
              to="/furniture"
            />
            <Menu.Item
              name='create category'
              active={activeItem === 'create category'}
              onClick={handleItemClick}
              as={Link}
              to="/createcategory"
            />
            <Menu.Item
              name='create item'
              active={activeItem === 'create item'}
              onClick={handleItemClick}
              as={Link}
              to="/createItem"
            />
            
          </Menu.Menu>
        </Menu>

      
    )
  
}

export default MenuBar;