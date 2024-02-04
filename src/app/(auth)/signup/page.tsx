import prisma from "@/libs/prisma";

async function createUser(formData: any) {
  "use server";
  try {
    const email = formData.get("email");
    const name = formData.get("name");
    const password = formData.get("password");
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    console.log(user)
  } catch (error) {}
}

export default async function Page() {
  return (
    <form
      action={createUser}
      className="flex flex-col gap-6 py-80 max-w-[330px] m-auto"
    >
      <label htmlFor="email">이메일</label>
      <input
        type="text"
        name="email"
        className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
      />

      <label htmlFor="name">이름</label>
      <input
        type="text"
        name="name"
        className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
      />

      <label htmlFor="password">비밀번호</label>
      <input
        type="text"
        name="password"
        className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
      />

      <button
        type="submit"
        className="w-full rounded-md text-md px-5 py-3 bg-gray-800 text-white transition-all hover:bg-gray-900"
      >
        Submit
      </button>
    </form>
  );
}
