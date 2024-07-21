import prisma from 'lib/prisma';
import crypto from 'crypto';
import sendEmail from 'lib/sendEmail';

export async function POST(req) {

  try {
    const { email } = await req.json(); 

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    const otpCode = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = (Date.now() + 10 * 60000).toString(); 
    await prisma.OTP.deleteMany({ where: { email } });
    await prisma.OTP.create({
      data: {
        email,
        code: otpCode,
        expiresAt: otpExpiry,
      },
    });

    await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otpCode}. It will be expired in 10 minutes.`);
    return new Response(JSON.stringify({ message: 'OTP sent to email'}), { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/user:', error); 
    return new Response(JSON.stringify({ message: 'Internal server error'}), { status: 500 });
  }
}
