import prisma from "lib/prisma";

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page')) || 1;
        const pageSize = parseInt(url.searchParams.get('pageSize')) || 6;

        const categories = await prisma.category.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const totalCategories = await prisma.category.count();

        return new Response(
            JSON.stringify({ categories, totalCategories }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        return new Response('Error fetching categories', { status: 500 });
    }
}
