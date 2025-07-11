import db from '@/libs/db';

export async function GET() {
  try {
    const machines = db.prepare('SELECT * FROM machines').all();
    return new Response(JSON.stringify(machines), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}