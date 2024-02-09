import { cn } from '@/utils/style';
import { ErrorMessage, Field } from 'formik';
import { ReactNode } from 'react';

interface InputFormikProps {
  icon?: ReactNode;
  name: string;
  type?: string;
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  placeholder?: string;
}

const InputIconFormik: React.FC<InputFormikProps> = ({
  icon,
  name,
  type,
  touched,
  errors,
  placeholder,
}) => {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <Field
          name={name}
          type={type || 'text'}
          placeholder={placeholder}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          )}
        />
      </div>
      {touched[name] && errors[name] ? (
        <p className="font-semibold text-red-500">
          <ErrorMessage name={name} />
        </p>
      ) : null}
    </div>
  );
};

export default InputIconFormik;
