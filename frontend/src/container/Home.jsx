import React, {useEffect, useRef, useState} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'
import {Sidebar, UserProfile} from '../components'
import {client} from '../client'
import logo from '../assets/BlitheLogo.png'
import Pins from './Pins'
import {userQuery} from '../utilities/data'
import { fetchUser } from './../utilities/fetchUser';

const Home = () => {

  const [toggleSideBar,setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null);

  //fetcg the info from localstorage if it is there or if not then clear 
  const userInfo = fetchUser();
  
  useEffect(() => { //in this sanity query you put the google id 
    //received from local storsge and put it here for sanuty
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data)=> {
      setUser(data[0]);
    })
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, [])

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 flex flex-row items-center justify-between w-full shadow-md">
        <HiMenu fontSize={40} className="cursor-pointer mt-7" onClick={() => setToggleSideBar(true)} />
        <Link to="/">
          <img src={logo} alt="logo" className="w-24" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-24" />
        </Link>
        </div>
        {toggleSideBar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={40} className="cursor-pointer" onClick={()=> setToggleSideBar(false)}/>
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSideBar} />
        </div>
      )}
      </div>
      
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>} />
          <Route path="/*" element={<Pins user={user && user}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default Home
