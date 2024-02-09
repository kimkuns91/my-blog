'use client';

import { signUpSchema } from '@/libs/validations/signUpSchema';
import { slideInFromTop } from '@/utils/motion';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Button from '../Button';
import InputFormik from '../InputFormik';

const RegistForm = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="z-[20] mx-auto  flex w-full max-w-[330px] flex-col gap-8 font-En"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text py-4 font-En text-6xl font-bold text-transparent">
            Sign Up
          </h1>
        </motion.div>

        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={signUpSchema}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              const response = await axios.post('/api/auth/signup', {
                email: data.email,
                name: data.name,
                password: data.password,
              });

              if (response.status === 201) {
                toast.success('회원가입 성공! 이메일 인증을 해주세요.');
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
            <Form className="flex flex-col gap-6">
              <InputFormik
                label="EMAIL"
                name={'email'}
                type={'email'}
                touched={touched}
                errors={errors}
              />
              <InputFormik
                label="NAME"
                name={'name'}
                type={'text'}
                touched={touched}
                errors={errors}
              />

              <InputFormik
                label="PASSWORD"
                name={'password'}
                type={'password'}
                touched={touched}
                errors={errors}
              />
              <InputFormik
                label="CONFIRM PASSWORD"
                name={'confirmPassword'}
                type={'password'}
                touched={touched}
                errors={errors}
              />
              <Button type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};
export default RegistForm;
