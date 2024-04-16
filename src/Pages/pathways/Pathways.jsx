import React from 'react'
import './Pathways.css'
import Header from '../../components/d_header/Header'
import pathway1 from '../../assets/pathway1.png'
import pathway2 from '../../assets/pathway2.png'
import pathway3 from '../../assets/pathway3.png'
import pathway4 from '../../assets/pathway4.png'
import pathway5 from '../../assets/pathway5.png'
import { IoDiamond } from "react-icons/io5";
import { NavLink } from 'react-router-dom'


const Pathways = () => {

  const pathways = [
    {
      id: 1,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway1,
      rating: 10
    },
    {
      id: 2,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway2,
      rating: 10
    },
    {
      id: 3,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway3,
      rating: 9
    },
    {
      id: 4,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway4,
      rating: 8
    },
    {
      id: 5,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time? We have the right solution for you...",
      image: pathway5,
      rating: 10
    },
  ]
  return (
    <div className='ds'>
      <Header value="library"/>
      <section className='pathways'>
        <div className='pathway-list'>
          {pathways.map((pathway) => (
            <NavLink to={`/practice/${pathway.id}`} className='pathway' key={pathway.id}>
              <img src={pathway.image} alt={pathway.title} />
              <div className='flex-row-space pathway-info'>
                <div className="flex-column2">
                <h2>{pathway.title}</h2>
                <p>{pathway.description}</p>
                </div>
                <div className='flex-row rating'>
                  <div className="iconn">
                  <IoDiamond />
                  </div>
                  
                  <span>{pathway.rating}</span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Pathways