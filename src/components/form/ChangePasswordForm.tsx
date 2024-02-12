'use client';

import Button from '@/components/Button';
import InputIconFormik from '@/components/InputIconFormik';
import { changePasswordSchema } from '@/libs/validations/signUpSchema';
import { slideInFromTop } from '@/utils/motion';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { MdKey } from 'react-icons/md';
import { toast } from 'react-toastify';

interface ChangePasswordFormProps {
  id: string;
  userId: string;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  id,
  userId,
}) => {
  const router = useRouter();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="mx-auto flex min-h-screen w-full max-w-[330px] flex-col justify-center gap-10"
    >
      <motion.div
        variants={slideInFromTop}
        className="mx-auto flex min-h-screen w-full max-w-[330px] flex-col justify-center gap-10"
      >
        <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text  text-6xl font-bold text-transparent">
          Change Password
        </h1>
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validationSchema={changePasswordSchema}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              const response = await axios.post('/api/auth/changepassword', {
                id,
                userId,
                password: data.password,
              });

              if (response.status === 201) {
                toast.success('비밀번호 변경이 완료되었습니다.');
                resetForm();
                router.push('/login');
              }
            } catch (error: any) {
              toast.error(
                error.response?.data?.message || 'An unexpected error occurred'
              );
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="z-20 flex flex-col gap-2">
              <label htmlFor="confirmPassword">Password</label>
              <InputIconFormik
                icon={<MdKey />}
                type="password"
                name="password"
                placeholder="········"
                touched={touched}
                errors={errors}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <InputIconFormik
                icon={<MdKey />}
                type="password"
                name="confirmPassword"
                placeholder="········"
                touched={touched}
                errors={errors}
              />
              <Button type="submit" disabled={isSubmitting}>
                비밀번호 변경
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
};
export default ChangePasswordForm;
