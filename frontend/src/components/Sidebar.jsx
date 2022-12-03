import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'
import logo from '../assets/BlitheLogo.png'


const Sidebar = ({user, closeToggle}) => {

  const categories = [
    {name: 'Animals'},
    {name: 'Wallpaper'},
    {name: 'Photography'},
    {name: 'Gaming'},
    {name: 'Coding'},
    {name: 'Other'},
  ]
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false);
  }

  const isNotActiveStyle = 'flex items-center px-5 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize gap-3'
  const isActiveStyle = 'flex items-center px-5 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize gap-3'
  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
        to="/"
        className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
        onClicl={handleCloseSidebar}
        >
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
          to="/"
          className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}
          onClick={handleCloseSidebar}
          >
            <RiHomeFill/>
            Home
          </NavLink>
          <h3 className="my-2 px-5 text-base 2xl:text-xl">
          {categories.slice(0, categories.length -1).map((category) =>(
            <NavLink
              to={`/category/${category.name}`}
              className={({isActive})=> isActive? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}

            </NavLink>
          ))}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default Sidebar