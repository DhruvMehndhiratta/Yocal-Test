import Spinner from 'react-bootstrap/Spinner';
import './spinner.css';

export const SpinnerLoader = () => {
  return (
    <div className="spinner-container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
