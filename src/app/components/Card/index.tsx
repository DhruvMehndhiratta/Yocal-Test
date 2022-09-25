import { FC } from "react";
import { Ticket } from "../../types";
import { useHistory } from "react-router";
import { Avatar } from "../Avatar";
import { Button, Card as CardComponent } from "react-bootstrap";
interface CardProps {
  ticket: Ticket;
}
export const Card: FC<CardProps> = ({ ticket }) => {
  const history = useHistory();
  const { user } = ticket;
  return (
    <CardComponent className="card-component">
      <CardComponent.Body>
        <CardComponent.Title>{`Status: ${ticket.status}`}</CardComponent.Title>
        <CardComponent.Text>
          {`Ticket Number: ${ticket.number}`}
        </CardComponent.Text>
        <CardComponent.Text>
          Assignee: <Avatar url={user?.image ?? ""} height={30} width={30} />
        </CardComponent.Text>
        <Button
          variant="primary"
          onClick={() => history.push(`/tickets/${ticket.id}`)}
        >
          Ticket details
        </Button>
      </CardComponent.Body>
    </CardComponent>
  );
};
