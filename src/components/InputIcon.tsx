import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

type InputIconProps = ComponentPropsWithoutRef<'input'> & {
  icon?: ReactNode; // ReactNode 타입을 사용하여 아이콘을 React 컴포넌트로 받을 수 있게 함
};

const InputIcon = forwardRef<HTMLInputElement, InputIconProps>(
  ({ className, icon, ...rest }, ref) => {
    return (
      <div className="relative mb-6">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
    );
  }
);

export default InputIcon;

InputIcon.displayName = 'Input';
