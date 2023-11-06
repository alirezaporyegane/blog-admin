import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  class?: string[] | string;
  color?: string;
  type?: 'button' | 'reset' | 'submit';
  block?: boolean;
}

const Button = (props: IProps) => {
  const { type = 'button', color = 'blue-400' } = props;
  const colorPallet = [`bg-${color}`, `hover:bg-${color.split('-')[0]}-900`];

  const buttonClass = [
    'flex',
    'items-center',
    'justify-center',
    'hover:bg-gray-700',
    props.block ? 'w-full' : '',
    ...colorPallet,
    typeof props.class === 'string' ? props.class : props?.class?.join(' '),
  ].join(' ');

  return (
    <button type={type} className={buttonClass}>
      {props.children}
    </button>
  );
};

export default Button;
