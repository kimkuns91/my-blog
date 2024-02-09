import nodemailer from 'nodemailer';

type ContactEmailProps = {
  email: string;
  name: string;
  phone: string;
  message: string;
};

type VerifyEmailProps = {
  email: string;
  id: string;
};

type ChangeEmailProps = {
  email: string;
  id: string;
};

if (
  !process.env.SYSTEM_EMAIL_SERVICE ||
  !process.env.SYSTEM_EMAIL_PORT ||
  !process.env.SYSTEM_EMAIL_HOST ||
  !process.env.SYSTEM_EMAIL_SENDER ||
  !process.env.SYSTEM_EMAIL_APPPASS
) {
  console.error('환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

let transporter = nodemailer.createTransport({
  service: process.env.SYSTEM_EMAIL_SERVICE,
  host: process.env.SYSTEM_EMAIL_HOST,
  port: parseInt(process.env.SYSTEM_EMAIL_PORT, 10),
  secure: true,
  auth: {
    user: process.env.SYSTEM_EMAIL_SENDER,
    pass: process.env.SYSTEM_EMAIL_APPPASS,
  },
});

export async function contactEmail({
  email,
  name,
  phone,
  message,
}: ContactEmailProps) {
  const mailData = {
    to: process.env.SYSTEM_EMAIL_SENDER,
    subject: `Contant White Mouse Dev By ${email}`,
    from: process.env.SYSTEM_EMAIL_SENDER,
    html: `
    <h1>${email}</h1>
    <h1>${name}</h1>
    <h1>${phone}</h1>
    <h1>${message}</h1>
    `,
  };

  return transporter.sendMail(mailData);
}

export async function verifyEmail({ email, id }: VerifyEmailProps) {
  const mailData = {
    to: email,
    subject: `White Mouse Dev - 이메일 인증`,
    from: process.env.SYSTEM_EMAIL_SENDER,
    html: `
    <table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td style="display:flex;flex-direction: column;justify-items: center;align-items: center;border: 1px solid #b1b1b1;padding: 80px 0;border-radius: 20px;">
            <a href="https://whitemouse.dev/" target="_blank">
              <img style="width: 300px;" src="https://rgvzlonuavmjvodmalpd.supabase.co/storage/v1/object/public/images/public/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:20px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              이메일 주소를 인증해주세요.
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;margin-bottom: 40px;">
              하단 버튼을 누르시면 이메일 인증이 완료됩니다.
            </p>
            <a href="https://whitemouse.dev/verifyemail/${id}" style="background:#404040;text-decoration:none;padding:10px 24px;font-size:18px;color:#fff;font-weight:400;border-radius:4px;" >이메일 인증하러 가기</a>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  };

  return transporter.sendMail(mailData);
}

export async function changePassEmail({ email, id }: ChangeEmailProps) {
  const mailData = {
    to: email,
    subject: `White Mouse Dev - 비밀번호 변경`,
    from: process.env.SYSTEM_EMAIL_SENDER,
    html: `
    <table style="margin:40px auto 20px;text-align:left;border-collapse:collapse;border:0;width:600px;padding:64px 16px;box-sizing:border-box">
      <tbody>
        <tr>
          <td style="display:flex;flex-direction: column;justify-items: center;align-items: center;border: 1px solid #b1b1b1;padding: 80px 0;border-radius: 20px;">
            <a href="https://whitemouse.dev/" target="_blank">
              <img style="width: 300px;" src="https://rgvzlonuavmjvodmalpd.supabase.co/storage/v1/object/public/images/public/Logo.png" alt="fastcampus" class="CToWUd" data-bit="iit">
            </a>
            <p style="padding-top:20px;font-weight:700;font-size:20px;line-height:1.5;color:#222">
              비밀번호 변경하러 가기
            </p>
            <p style="font-size:16px;font-weight:400;line-height:1.5;margin-bottom: 40px;">
              하단 버튼을 누르시면 비밀번호 변경 페이지로 이동됩니다.
            </p>
            <a href="https://whitemouse.dev/changepassword/${id}" style="background:#404040;text-decoration:none;padding:10px 24px;font-size:18px;color:#fff;font-weight:400;border-radius:4px;" >비밀번호 변경하러 가기</a>
          </td>
        </tr>
      </tbody>
    </table>
    `,
  };

  return transporter.sendMail(mailData);
}
