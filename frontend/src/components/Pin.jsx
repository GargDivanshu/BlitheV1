import React, {useState, useRef} from 'react'
import {client, urlFor} from '../client'
import { useNavigate, Link } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import { fetchUser } from './../utilities/fetchUser';


const Pin = ({pin: {postedBy, image, _id, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savePost, setsavePost] = useState(false)

  const navigate = useNavigate();
  const user = fetchUser();
  
  console.log(save)
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length;
  const destinationUrl = useRef(null);
  //in the array 'save' we r using filter func
  //-> ans will be array lets say [1], let it be index of saved post
  //i don't want array but we want bool 
  // first i will take [1].lentth, to get the lgth of array
  // then !! will help in converting numbers to bool
  
  const savePin = (id) => {
    if(!alreadySaved) {
    setsavePost(true);
    
    client //update the doc with client 
    .patch(id) //patch post with an id 
    .setIfMissing({save: []}) //initializing save array to be empty array 
    .insert('after', 'save[-1]', [{ //insert the doc 
      //this means we want to add at end
      _key:uuidv4(), //generate new id 
      userId: user.googleId,
      postedBy: {
        _type: 'postedBy',
        _ref: user.googleId
      }
    }])
    .commit()
    .then(() => {
      window.location.reload();
      setsavePost(false);
    });
    }
  }

  const deletePin = (id) => {
    setsavePost(false);

    client
    .delete()
    .then(() => {
      window.location.reload();
    })
  }

  return (
    <div className="m-3">
    <div
    onMouseEnter={() => setPostHovered(true)}
    onMouseLeave={() => setPostHovered(false)}
    onClick={() => navigate(`/pin-detail/${_id}`)}
    className="cursor-zoom-in relative w-auto hover:shadow-lg overflow-hidden rounded-lg transition-all "
    >
    { image && 
      <img className="rounded-t-lg w-full" alt="user-post" src={urlFor(image).width(250).url()} />
    }
    {postHovered && (
      <div
      className="absolute top-0 h-full flex-col p-1 w-full justify-between pr-2 pt-2 pb-2 z-50"
      style={{height: '100%'}}
      >
      <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
      <a 
      href={`${image?.asset?.url}?dl=`} //dl is to download 
      download 
      onClick={(event) => event.stopPropagation()} //to stop the propagation of our click further into the image 
      // behind the btn lies the image, we can clk img to see pin details 
      //but on download we don't want that 
      >
      <MdDownloadForOffline
        className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
      />
      </a>
      {
         ( postedBy?.id === user.googleId &&
          <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            deletePin(_id);
          }}
          className="text-white px-auto py-auto p-2 justify-center items-center bg-red-500 opacity-70 hover:opacity-100 font-bold text-base rounded-3xl hover:shadow-md outline-none"
          >
          <AiTwotoneDelete className="justify-center items-center" />
          </button>
        )
      }
      </div>
      {alreadySaved ? (
        <button className="text-white bg-red-500 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
          {save?.length} Saved
        </button>
      ): (
        <button className="text-white bg-red-500 opacity-70 hover:opacity-100 font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
        onClick={(event) => {event.stopPropagation()
        savePin(_id);
        }}>
          {savePost ? 'saving' : 'Save'}
        </button>
      )}
      </div>
      
      </div>
    )}
    {image && <div className="flex justify-between items-center w-full opacity-75 hover:opacity-100 hover:shadow-md h-8 color-[#f5f5f5] shadow-md rounded-b-lg">
    
      {postedBy?.userName && (
        <div
        className=" flex items-center gap-2 text-black font-bold pr-4 pl-2 opacity-70"
        >
        <BsFillArrowUpRightCircleFill className="w-4"/>
        {/* { destination.length > 20 ? destination.slice(8, 20) : 'not available'} */}
        {postedBy?.userName}
        </div>
      )}
      
    </div>}
    
    </div>
    
    {/*  */}
       
    </div>
  )
}

export default Pin
