import { useEffect } from "react";
import axios from 'axios';
import { API_BASE_URL } from '../../../constants';
export const Listing = () => {
  useEffect(() => {
    axios.get(`${API_BASE_URL}/tickets`).then(res => console.log(res))
  }, [])
  return <div className="app">
    Listing
  </div>;
};
