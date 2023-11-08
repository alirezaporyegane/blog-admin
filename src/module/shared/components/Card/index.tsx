import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  classes: string;
}

const Card = (props: IProps) => {
  return (
    <div className={`p-3 shadow-md rounded-xl ${props.classes}`}>
      {props.children}
    </div>
  );
};

export default Card;
