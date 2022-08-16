import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Contacts from '../components/Contacts'
import axios from 'axios'
import { allUsersRoute } from '../utils/APIRoutes';


export default function Chat() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)

  // useEffect(() => {
  //   setCurrentUser(user)
  // }, [])

  useEffect(() => {

    async function getAllUsers() {

      

      if (currentUser) {

        const data = await axios.get(`${allUsersRoute}`)
        setContacts(data.data)

      }
    }
    getAllUsers()


  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <Container>

      <div className="container">
        <Contacts currentUser={currentUser} changeChat={handleChatChange}></Contacts>
      </div>
    </Container>
  )
}


const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction:column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container{
  height: 85h;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
  }
}
`;