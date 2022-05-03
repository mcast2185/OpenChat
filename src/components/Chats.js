import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';

import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

require("dotenv").config()
const ProjectID = process.env.PROJECT_ID;
const PrivateKey = process.env.PRIVATE_KEY;


const Chats = () => {
  const history = useHistory();
  const {user} = useAuth();
  const [loading, setLoading] = useState(true);
  const getFile = async (url) => {
    let response = await fetch(url);
    let data = await response.blob();
    
    return new File([data], "userPhoto.jpg", {type: "image/jpeg"});
  }
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  }

  useEffect(() => {
    if(!user) {
      history.push('/');
      return;
    }
      axios.get("https://api.chatengine.io/users/me/",
      {
        headers: {
          "project-id": "a5192c7b-a35c-402f-bf57-9194d999a193",
          "user-name": user.email,
          "user-secret": user.uid

        },   
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append("avatar", avatar, avatar.name);

            axios.post("https://api.chatengine.io/users/", 
              formdata,
              { headers: {"private-key": "43906159-e6a9-431c-aae3-3b924008bb8c"}}
            )
            .then(() => setLoading(false))
            .catch((error) => console.log(error))
          })
      })
  }, [user, history]);

  if(!user || loading) return "Loading..."

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>
          OpenChat
        </div>
        <div 
          className='logout-tab'
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh -66px)"
        projectID="a5192c7b-a35c-402f-bf57-9194d999a193"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats;