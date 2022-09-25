import { FC } from "react";
import { Ticket } from "../../types";

import { Button, Card as CardComponent } from "react-bootstrap";
interface CardProps {
  ticket: Ticket;
}
export const Card: FC<CardProps> = ({ ticket }) => {
  return (
    <CardComponent className="card-component">
      <CardComponent.Body>
        <CardComponent.Title>{`Status: ${ticket.status}`}</CardComponent.Title>
        <CardComponent.Text>
          {`Ticket Number: ${ticket.number}`}
        </CardComponent.Text>
        <Button variant="primary">Go somewhere</Button>
      </CardComponent.Body>
    </CardComponent>
  );
};
