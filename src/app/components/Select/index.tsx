import { FC } from "react";
import { Form } from "react-bootstrap";

interface IOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: IOption[];
  value: string;
  onChange: any;
  className?: string;
  showDefaultLabel?: boolean;
}

export const Select: FC<SelectProps> = ({
  options = [],
  value,
  onChange,
  className = "",
  showDefaultLabel = true,
}) => {
  return (
    <Form.Select
      aria-label="Default select example"
      value={value}
      onChange={onChange}
      className={className}
    >
      {showDefaultLabel ? <option value="">Choose By Status</option> : null}
      {options.map((item: IOption) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};
