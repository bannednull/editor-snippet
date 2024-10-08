import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface RadioProps {
  items: Array<Array<string>>; // [[name, id, value]]
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function Radio(props: RadioProps) {
  return (
    <RadioGroup
      defaultValue={props.defaultValue}
      className={props.className}
      onValueChange={props.onChange}
    >
      {props.items.map(([name, id, value], index) => {
        return (
          <div className="flex items-center gap-1" key={index}>
            <RadioGroupItem value={value} id={id} />
            <label htmlFor={id}>{name}</label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
