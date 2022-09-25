import Spinner from 'react-bootstrap/Spinner';

export const SpinnerLoader = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
