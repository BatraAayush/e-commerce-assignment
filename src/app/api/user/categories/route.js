import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
    const { categoryId, isSelected } = await request.json();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        if (isSelected) {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    categories: {
                        connect: { id: categoryId }
                    }
                }
            });
        } else {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    categories: {
                        disconnect: { id: categoryId }
                    }
                }
            });
        }

        return new Response('Category updated', { status: 200 });
    } catch (error) {
        return new Response('Unauthorized', { status: 401 });
    }
}

export async function GET(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
        return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { categories: true },
        });

        return new Response(JSON.stringify(user.categories), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Unauthorized', { status: 401 });
    }
}