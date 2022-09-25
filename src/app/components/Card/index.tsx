import { FC } from "react";
import { Ticket } from "../../types";
interface CardProps {
  ticket: Ticket;
}
export const Card: FC<CardProps> = ({ ticket }) => {
  console.log(ticket);
  return <div className="app">Card</div>;
};
