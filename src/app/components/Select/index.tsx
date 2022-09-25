import { FC } from 'react';
import { Form } from 'react-bootstrap';

interface IOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: IOption[];
  value: string;
  onChange: () => void;
}

export const Select: FC<SelectProps> = ({ options = [], value, onChange}) => {
  return (
    <Form.Select aria-label="Default select example" value={value} onChange={onChange}>
      {
        options.map((item:IOption) => <option value={item.value}>{item.label}</option>)
      }
    </Form.Select>
  );
}
