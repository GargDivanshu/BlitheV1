import React, {useEffect} from 'react'
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from'react-icons/fc';
import shareVideo from '../assets/share.mp4'
import logo from '../assets/BlitheLogo.png'
import {client} from '../client'
import {gapi} from 'gapi-script'


const Login = () => {

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(()=> {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient)    
  });

  
  const navigate = useNavigate();
  const responseGoogle=(response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const {name, googleId, imageUrl} = response.profileObj ?? {};

    const doc = {
      _id: response.profileObj.googleId,
      _type: 'user',
      userName: response.profileObj.name,
      image: response.profileObj.imageUrl,
    }

    client.createIfNotExists(doc).then(()=> {
      navigate('/', {replace: true})
    });
  }
  return (
    <div className="justify-start items-center flex flex-col h-screen">
      <div className="relative w-full h-full">
       <video 
       src={shareVideo}
       type="video/mp4"
       Loop
       autoPlay
       muted
       controls={false}
       className="w-full h-full object-cover"
       />

       <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="150px" height="120px" alt="logo" className="bg-transparent" />
        </div>

        <div className="shadow-2xl">
          <GoogleLogin 
          clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
          render={(renderProps)=>(
            <button 
            type="button"
            onClick={renderProps.onClick}
            className="bg-mainColor flex justify-center items-center p-3 rounded-xl cursor-pointer outline-none"
            disabled={renderProps.disabled}
            >
              <FcGoogle className="mr-4"/>
              Sign In with Google
            </button>
          )}
          onSuccess = {responseGoogle}
          onFailure = {responseGoogle}
          cookiePolicy='single_host_origin'
          />
        </div>
       </div>
      </div>

      <script src="https://apis.google.com/js/platform.js" async defer/>
    </div>
  )
}

export default Login;
