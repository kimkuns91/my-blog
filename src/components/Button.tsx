import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        'w-full rounded-md bg-gray-800 px-5 py-3 font-medium text-white transition-all hover:bg-gray-900',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
