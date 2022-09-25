import { useEffect, useState } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';
import { User, Ticket } from '../../types/'
import { SpinnerLoader, Card } from "../../components";

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
    setLoading(true);
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
        setLoading(false);
      })
    })();


  }, [])

  return( <div className="app">
    {
      loading ? <SpinnerLoader /> : tickets.map((item) => <Card ticket={item}/>)
    }
    
  </div>)
};
