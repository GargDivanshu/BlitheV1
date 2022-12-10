import React, {useState} from 'react'
import {Routes, Route} from "react-router-dom";
import {NavBar, Feed, PinDetails, CreatePin, Search} from '../components';




const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="px-2 md:px-5">
    <div className="bg-gray-60">
    <NavBar serachTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}></NavBar>
    </div>
    <div>
      <Routes>
        <Route path="/" element={<Feed/>}></Route>
        <Route path="/category/:categoryId" element={<Feed/>}></Route>
        <Route path="/pin-detail/:pinId" element={<PinDetails user={user}/>}></Route>
        {/* in home file we made pin tag and sent user prop so here also we have to do the same */}
        <Route path="/create-pin" element={<createPin user={user}/>}></Route> 
        {/* we want to know who made a pin so user prop will go  */}
        <Route path="/search" element={<Search serachTerm={searchTerm} setSearchTerm={setSearchTerm} />}></Route>
      </Routes>
    </div>
    </div>
  )
}

export default Pins