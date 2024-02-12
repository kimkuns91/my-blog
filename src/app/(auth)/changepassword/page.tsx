'use client';

import Button from '@/components/Button';
import InputIconFormik from '@/components/InputIconFormik';
import { verifyEmailSchema } from '@/libs/validations/signUpSchema';
import { slideInFromTop } from '@/utils/motion';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Page() {
  return (
    <motion.div initial="hidden" animate="visible">
      <motion.div
        variants={slideInFromTop}
        className="mx-auto flex min-h-screen w-full max-w-[330px] flex-col justify-center gap-10"
      >
        <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent">
          Find Password
        </h1>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={verifyEmailSchema}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            console.log(data);
            setSubmitting(true);
            try {
              const response = await axios.post('/api/auth/verifyemail', {
                email: data.email,
              });

              if (response.status === 201) {
                toast.success('해당 이메일로 비밀번호 변경 이메일이 발송되었습니다.');
                resetForm();
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
            <Form className="z-[20] flex flex-col gap-2 ">
              <InputIconFormik
                icon={<MdEmail />}
                type="text"
                name="email"
                touched={touched}
                errors={errors}
                placeholder="name@whitemouse.dev"
              />
              <Button type="submit" disabled={isSubmitting}>
                비밀번호 찾기
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </motion.div>
  );
}
