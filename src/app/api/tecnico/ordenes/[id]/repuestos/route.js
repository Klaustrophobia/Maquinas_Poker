import { getOrderUsedParts } from '@/libs//db';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const parts = await getOrderUsedParts(id);
    return Response.json(parts);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}