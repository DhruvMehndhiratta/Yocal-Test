import { useEffect, useState } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';



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
      const users = await fetchUsers();
      let response = await fetchTickets();
      
    })();


  }, [])
  return <div className="app">
    Listing
  </div>;
};
