import prisma from '@/libs/prisma';

async function getData() {
  try {
    const users = await prisma.categories.findMany();
    return users;
  } catch (error) {
    throw new Error('Failed to fetch data: ' + (error as Error).message);
  }
}

export default async function Page() {
  const data = await getData();
  console.log(data);
  return <main></main>;
}
