/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './exploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1> Explore Our Menu</h1>
      <p className="explore-menu-text">
        choose from our broad selection of dishes . our chef will prepare it for
        you. our mission is to delivered you the best
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,idex) => {
            return (
              <div onClick={() => setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} className="explore-menu-list-item" key={idex}>
                <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>
              </div>
            );
         
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu