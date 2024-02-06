import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  icon?: ReactNode; // ReactNode 타입을 사용하여 아이콘을 React 컴포넌트로 받을 수 있게 함
};

const IconInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...rest }, ref) => {
    return (
      <div className="relative mb-6">
        {icon && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    );
  }
);

export default IconInput;

IconInput.displayName = 'Input';
