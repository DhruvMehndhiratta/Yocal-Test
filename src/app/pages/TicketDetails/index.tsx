import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Ticket } from 'src/app/types';
import { API_BASE_URL } from 'src/constants';

export const TicketDetails = () => {

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const params = useParams<any>();
  const { ticketId='' } = params;

  useEffect(() => {
    const fetchTicket = async () => {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
      setTicket(response.data);
    }
    fetchTicket();
  }, [ ticketId ])

  console.log(ticket, "ticekt");

  return <div className="app">
    TicketDetails
  </div>;
};
