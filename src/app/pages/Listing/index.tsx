import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, assigneeFilters } from "../../../constants";
import { User, Ticket } from "../../types/";
import { SpinnerLoader, Card, Select } from "../../components";
import { Row, Col, Container } from "react-bootstrap";

export const Listing = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    return axios.get(`${API_BASE_URL}/users`);
  };

  const fetchTickets = () => {
    return axios.get(`${API_BASE_URL}/tickets`);
  };

  const fetchTicketsByStatus = (status: string) => {
    if(!status) return fetchTickets();
    return axios.get(`${API_BASE_URL}/tickets?status=${status}`);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      Promise.all([fetchUsers(), !status ? fetchTickets(): fetchTicketsByStatus(status)]).then((values) => {
        const [users, ticketResponse] = values;
        ticketResponse.data.forEach((item: Ticket) => {
          const userIndex = users.data.findIndex(
            (val: User) => item.userId === val.id
          );
          if (userIndex !== -1) {
            item["user"] = users.data[userIndex];
          }
        });
        setTickets(ticketResponse.data);
        setLoading(false);
      });
    })();
  }, [status]);


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    setStatus(value);
  };

  return (
    <Container className="app">
      {loading ? (
        <SpinnerLoader />
      ) : tickets.length ? (
        <Row>
          <div className="select-container">
            <span>Filter By Status: {"  "}</span>
            <Select
              value={status}
              onChange={handleFilterChange}
              options={assigneeFilters}
            />
          </div>
          {tickets.map((item) => (
            <Col xs={12} sm={6} md={6} lg={4} key={item.number}>
              <Card  ticket={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <h2>Something went wrong Please try again</h2>
      )}
    </Container>
  );
};
