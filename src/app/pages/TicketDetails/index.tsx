import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Card, Dropdown, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router';
import { SpinnerLoader, Avatar } from 'src/app/components';
import { Ticket, User } from 'src/app/types';
import { API_BASE_URL, assigneeFilters } from 'src/constants';

type RouteParams = { ticketId: string; };

export const TicketDetails = () => {

  const [ ticket, setTicket ] = useState<Ticket | null>(null);
  const [ user, setUser ] = useState<User | null>(null);
  const [ users, setUsers ] = useState<User[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ assigneeLoading, setAssigneeLoading ] = useState(false);

  const params = useParams<RouteParams>();
  const { ticketId='' } = params;

  const fetchUser = async (userId: number) => {
    if(userId) {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/users/${userId}`);
      setUser(response.data);
      setLoading(false);
      setAssigneeLoading(false);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {

    const fetchUsers = async () => {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    }

    const fetchTicket = async () => {
      const response: AxiosResponse = await axios.get(`${API_BASE_URL}/tickets/${ticketId}`);
      setTicket(response.data);
      fetchUser(response.data.userId);
    }
    fetchTicket();
    fetchUsers();
  }, [ ticketId ]);

  if(loading) {
    return <SpinnerLoader />;
  }

  const { status='', number='' } = ticket || {};
  const { image='', firstName, lastName } = user || {};

  const updateAssignee = async (userId: number) => {
    setAssigneeLoading(true);
    const payload: { userId: number; status?: string; } = { userId };
    if(status === 'unassigned') {
      payload.status = 'assigned';
    }
    const response = await axios.patch(`${API_BASE_URL}/tickets/${ticketId}`, payload);
    setTicket(response.data);
    fetchUser(response.data.userId);
  }

  const updateStatus = async (status: string) => {
    const response = await axios.patch(`${API_BASE_URL}/tickets/${ticketId}`, { status });
    setTicket(response.data);
  }

  return <div>
    <Card>
      <Card.Body>
        <p>Ticket No.: {number}</p>
        <p className='text-capitalize'>Status: 
          <Form.Select className="d-inline-block w-auto ms-2" onChange={(e) => updateStatus(e.target.value)}>
            {assigneeFilters.map(({label, value}: {label: string; value: string;}) => {
              return <option key={value}>{label}</option>
            })}
          </Form.Select>
        </p>
        <div className="d-flex align-items-center">
          <Avatar url={image} />
          <Dropdown className="ms-2">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {user ? <span className="ms-2">{firstName} {lastName}</span> : 'Unassigned'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                users.map(({firstName, lastName, id}) => {
                  return (
                    <Dropdown.Item key={id} onClick={() => updateAssignee(id)}>{firstName} {lastName}</Dropdown.Item>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
          {assigneeLoading ? <Spinner animation="border" role="status" className="ms-2" variant="success">
            <span className="visually-hidden">Loading...</span>
          </Spinner> : null}
        </div>
      </Card.Body>
    </Card>
  </div>;
};
