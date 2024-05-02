import React, { useEffect, useState } from 'react'
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

  const [pathways, setPathways] = useState([
    {
      id: 1,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway1,
      rating: 10
    },
    {
      id: 2,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway2,
      rating: 10
    },
    {
      id: 3,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway3,
      rating: 9
    },
    {
      id: 4,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway4,
      rating: 8
    },
    {
      id: 5,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway5,
      rating: 10
    },
    {
      id: 6,
      title: "Student",
      description: "Are you tired of struggling to finish your projects on time?",
      image: pathway5,
      rating: 10
    },
  ])

  const fetchPitches = async() => {
    try {
      const token = localStorage.getItem('token');

      const headers = {
        'Authorization': `Token ${token}`, 
      };
      const response = await fetch('https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/pitches/', {
      method: 'GET', // Specify the HTTP method (default is 'GET')
      headers, // Include the headers object
    });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setPathways(data);
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

useEffect(() => {
    fetchPitches();
}, []);
  return (
    <div className='ds'>
      <Header value="library"/>
      <section className='pathways'>
        <div className='pathway-list'>
          {pathways.map((pathway) => (
            <NavLink to={`/practice/${pathway.id}`} className='pathway' key={pathway.id}>
              <img src={pathway.pitch_image_url} alt={pathway.title} />
              <div className='flex-row-space pathway-info'>
                <div className="flex-column2">
                <h2>{pathway.pitch_title}</h2>
                <p>{pathway.pitch_text?.length <= 100 ? pathway.pitch_text : pathway.pitch_text?.substring(0, 100)} ....</p>
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