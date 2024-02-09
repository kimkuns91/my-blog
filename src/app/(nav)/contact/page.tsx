'use client';

import Button from '@/components/Button';
import InputIconFormik from '@/components/InputIconFormik';
import { contactSchema } from '@/libs/validations/signUpSchema';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MdEmail, MdPerson, MdPhone } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function Page() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className="container relative z-[20] flex w-full flex-col font-En"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text font-En text-6xl font-bold text-transparent">
            Contact
          </h1>
          <p className="mt-8 text-2xl font-semibold">
            Do you have a project you would like to request?
          </p>
        </motion.div>
        <div className="relative mt-20 flex gap-28">
          <motion.div
            variants={slideInFromLeft(0.8)}
            className="flex flex-[1] flex-col items-center justify-center gap-10"
          >
            <div className="relative size-[300px] bg-slate-400">
              <Image
                src="/images/QRCode.png"
                alt="MyPicture"
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2 font-En text-lg">
                <MdEmail className="text-gray-500 dark:text-gray-400" />
                <Link
                  href={`mailto:kimkuns98@gmail.com`}
                  className="hover:underline"
                >
                  kimkuns98@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2 font-En text-lg">
                <MdPhone className="text-gray-500 dark:text-gray-400" />
                <Link href={`tel:01085959869`} className="hover:underline">
                  01085959869
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div variants={slideInFromRight(0.8)} className="flex-[1]">
            <Formik
              initialValues={{
                email: '',
                name: '',
                phone: '',
                message: '',
              }}
              validationSchema={contactSchema}
              onSubmit={async (data, { setSubmitting, resetForm }) => {
                console.log(data);
                setSubmitting(true);
                try {
                  const response = await axios.post('/api/contact', {
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    message: data.message,
                  });

                  if (response.status === 201) {
                    toast.success('연락주셔서 감사합니다.');
                    resetForm();
                  }
                } catch (error: any) {
                  toast.error(
                    error.response?.data?.message ||
                      'An unexpected error occurred'
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="flex flex-col gap-2">
                  <InputIconFormik
                    icon={<MdEmail />}
                    type="text"
                    name="email"
                    touched={touched}
                    errors={errors}
                    placeholder="name@flowbite.com"
                  />
                  <InputIconFormik
                    icon={<MdPerson />}
                    type="text"
                    name="name"
                    touched={touched}
                    errors={errors}
                    placeholder="Name"
                  />
                  <InputIconFormik
                    icon={<MdPhone />}
                    type="text"
                    name="phone"
                    touched={touched}
                    errors={errors}
                    placeholder="Phone"
                  />
                  <Field
                    name="message"
                    as="textarea"
                    placeholder="Message"
                    rows={6}
                    className="resize-none rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    Send
                  </Button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
