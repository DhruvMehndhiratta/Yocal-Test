import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { User, Ticket } from "../../types/";
import { SpinnerLoader, Card } from "../../components";

export const Listing = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async () => {
    return axios.get(`${API_BASE_URL}/users`);
  };

  const fetchTickets = () => {
    return axios.get(`${API_BASE_URL}/tickets`);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      Promise.all([fetchUsers(), fetchTickets()]).then((values) => {
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
  }, []);

  return (
    <div className="app">
      {loading ? (
        <SpinnerLoader />
      ) : tickets.length ? (
        tickets.map((item) => <Card key={item.number} ticket={item} />)
      ) : (
        <h2>Something went wrong Please try again</h2>
      )}
    </div>
  );
};
