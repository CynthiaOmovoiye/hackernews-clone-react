import React from 'react';
import { NavLink } from 'react-router-dom';
import qs from 'query-string';

const queryParam = qs.parse(window.location.search);
const newQueryParam = {
   ...queryParam,
   type: 'news?page={1-10}',
   
}
console.log(newQueryParam)




const Navigation = () => (
    <nav className="nav-link">
        <NavLink to="/news"  activeClassName="active">
          Top Stories
       </NavLink>
        <NavLink to={{ pathname: '/news?page={1-10}', type: "news?page={1-10}"}}   activeClassName="active">
         Latest Stories
        </NavLink>
       
       </nav>
  );

  export default Navigation;