import { getOrderActivities } from '@/libs/db';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const activities = await getOrderActivities(id);
    return Response.json(activities);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}