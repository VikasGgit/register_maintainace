import React from 'react'
import Hero from "../components/Hero"
import Biography from "../components/Biography"
import Message from "../components/Message"
import Departments from "../components/Departments"

const Home = () => {
  return (
    <>
    
    <Hero title={"Welcome to Maintainance System"} imageUrl={"/hero.webp"} />
    <Biography imageUrl={"/hero.webp"}/>
    <Departments/>
    <Message/>
    </>
  )
}

export default Home