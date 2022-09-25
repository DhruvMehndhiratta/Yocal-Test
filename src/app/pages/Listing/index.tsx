import { useEffect } from "react";
import axios from 'axios';

export const Listing = () => {
  useEffect(() => {
    axios.get('http://localhost:3004/tickets').then(res => console.log(res))
  }, [])
  return <div className="app">
    Listing
  </div>;
};
