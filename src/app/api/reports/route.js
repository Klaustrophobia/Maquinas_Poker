import db from '@/libs/db';

export async function POST(request) {
  try {
    const { machineId, description } = await request.json();
    
    // Registrar falla
    db.prepare(`
      INSERT INTO failure_reports (machine_id, description)
      VALUES (?, ?)
    `).run(machineId, description);
    
    // Actualizar estado
    db.prepare(`
      UPDATE machines SET status = 'Fuera de servicio'
      WHERE id = ?
    `).run(machineId);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}