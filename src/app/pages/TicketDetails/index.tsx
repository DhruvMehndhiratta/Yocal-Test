import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { SpinnerLoader, Avatar } from 'src/app/components';
import { Ticket, User } from 'src/app/types';
import { API_BASE_URL } from 'src/constants';

type RouteParams = { ticketId: string; };

export const TicketDetails = () => {

  const [ ticket, setTicket ] = useState<Ticket | null>(null);
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

  const params = useParams<RouteParams>();
  const { ticketId='' } = params;

  useEffect(() => {
    const fetchUser = async (userId: string) => {
      if(userId) {
        const response: AxiosResponse = await axios.get(`${API_BASE_URL}/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }

    const fetchTicket = async () => {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
      setTicket(response.data);
      fetchUser(response.data.userId);
    }
    fetchTicket();
  }, [ ticketId ]);

  if(loading) {
    return <SpinnerLoader />;
  }

  const { id='', status='', number='' } = ticket || {};
  const { image='', firstName, lastName } = user || {};

  return <div>
    <Card>
      <Card.Body>
        <p>Ticket No.: {number}</p>
        <p className='text-capitalize'>Status: {status}</p>
        {
          user ? <>
            <div className="d-flex align-items-center">
              <Avatar url={image} />
              <span>{firstName} {lastName}</span>
            </div>
          </> : null}
      </Card.Body>
    </Card>
  </div>;
};
