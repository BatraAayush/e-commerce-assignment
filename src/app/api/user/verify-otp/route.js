import prisma from 'lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
    const { email, otpCode, name, password } = await req.json();

    try {
      const otp = await prisma.OTP.findFirst({ where: { email } });

      if (Number(otp.code) !== Number(otpCode)) {
        return new Response(JSON.stringify({ message: 'Invalid OTP' }), { status: 400 })
      }

      if ( Number(otp.expiresAt) < Date.now()) {
        return new Response(JSON.stringify({ message: 'OTP has expired' }), { status: 400 })
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET);

      return new Response(JSON.stringify({ token }), { status: 200 })
    } catch (error) {
      return new Response(JSON.stringify({ message: 'Internal server errorrrsc' }), { status: 500 })
    }
}
