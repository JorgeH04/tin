import React, { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import Axios from 'axios';


const fakeData = [
  {
    _id: '1',
    username: 'John Doe',
    firstImage: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=John+Doe',
  },
  {
    _id: '2',
    username: 'Jane Smith',
    firstImage: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=Jane+Smith',
  },
  {
    _id: '3',
    username: 'Alice Johnson',
    firstImage: 'https://via.placeholder.com/300/0000FF/FFFFFF?text=Alice+Johnson',
  },
  // Agrega más objetos de datos falsos aquí si es necesario
];
 
export default function Feed({ user }) {

  const [users, setUsers] = useState([]);
  const childRefs = useRef(fakeData.map(() => React.createRef()));
  useEffect(() => {
    // En lugar de hacer una llamada a la API, usaremos los datos falsos
    setUsers(fakeData);
  }, []);


  

  
 

  return (
    <div>
 

      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {users.map((userData, index) => (
          <TinderCard
            ref={childRefs.current[index]}
            className='swipe'
            key={userData._id}
           
          >
            <div
              style={{ backgroundImage: `url(${userData.firstImage})` }}
              className='card'
            >
              <h3>{userData.username}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

   
    </div>
  );
}

 
