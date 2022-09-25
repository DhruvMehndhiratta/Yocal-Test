import { FC } from "react";
import { Ticket } from "../../types";
import { useHistory } from "react-router";

import { Button, Card as CardComponent } from "react-bootstrap";
interface CardProps {
  ticket: Ticket;
}
export const Card: FC<CardProps> = ({ ticket }) => {
  const history = useHistory()
  return (
    <CardComponent className="card-component">
      <CardComponent.Body>
        <CardComponent.Title>{`Status: ${ticket.status}`}</CardComponent.Title>
        <CardComponent.Text>
          {`Ticket Number: ${ticket.number}`}
        </CardComponent.Text>
        <CardComponent.Text>
          {`Assignee: ${ticket.number}`}
        </CardComponent.Text>
        <Button variant="primary" onClick={() => history.push(`/tickets/${ticket.id}`)}>Ticket details</Button>
      </CardComponent.Body>
    </CardComponent>
  );
};
