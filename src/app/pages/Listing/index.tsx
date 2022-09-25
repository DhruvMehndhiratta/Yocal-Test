import { useEffect, useState } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';
import { User, Ticket } from '../../types/'


export const Listing = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false);
  const fetchUsers = async() => {
    return axios.get(`${API_BASE_URL}/users`)
  }

  const fetchTickets = () => {
    return axios.get(`${API_BASE_URL}/tickets`)
  }

  useEffect(() => {
    (async () => {
      Promise.all([fetchUsers(), fetchTickets()]).then((values) => {
  
        const [users, ticketResponse] = values;
        
        ticketResponse.data.forEach((item: Ticket) => {
          const userIndex = users.data.findIndex((val: User) => item.userId === val.id)
          if(userIndex !== -1){
            item['user'] = users.data[userIndex];
          }
        })
        setTickets(ticketResponse.data)
      })
      // const users = await fetchUsers();
      // let response = await fetchTickets();
      // response.forEach((item) => )
    })();


  }, [])
  console.log(tickets, "tickets")
  return <div className="app">
    Listing
  </div>;
};
