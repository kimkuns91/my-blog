import ChangePasswordForm from '@/components/form/ChangePasswordForm';
import { verifyChangepassword } from '@/utils/fetch';
import { notFound } from 'next/navigation';

type ChangePasswordProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: ChangePasswordProps) {
  const result = await verifyChangepassword(params.id);

  if (!result) return notFound();

  return <ChangePasswordForm id={params.id} userId={result} />;
}
