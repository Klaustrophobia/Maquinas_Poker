// Importación de dependencias
import PDFDocument from 'pdfkit'; // Librería para generar documentos PDF
import { FinanzaService } from '@/services/finanza.service'; // Servicio para manejar datos financieros

// Definición de la función GET para manejar solicitudes HTTP
export async function GET(
  _req: Request, // Objeto de solicitud (no se usa en este caso, por eso el prefijo _)
  { params }: { params: { id: string } } // Parámetros de ruta, extrayendo el ID
) {
  // Convertir el ID de string a número
  const id = Number(params.id);

  // Obtener las finanzas y buscar la que coincide con el ID proporcionado
  const finanza = await FinanzaService.getFinanzas().then(finanzas =>
    finanzas.find((f) => f.id === id)
  );

  // Si no se encuentra la finanza, devolver una respuesta 404
  if (!finanza) {
    return new Response(
      JSON.stringify({ error: 'Movimiento no encontrado' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Crear un nuevo documento PDF
  const doc = new PDFDocument();
  // Array para almacenar los chunks (fragmentos) del PDF
  const chunks: any[] = [];
  // Evento 'data' que se dispara cuando hay datos disponibles, agregando al array chunks
  doc.on('data', (chunk) => chunks.push(chunk));
  // Evento 'end' que no hace nada en este punto (se redefine más adelante)
  doc.on('end', () => {});

  // Agregar contenido al PDF con formato
  doc.fontSize(20).text('FACTURA', { align: 'center' }); // Título centrado
  doc.moveDown(); // Espacio después del título
  // Información de la finanza con tamaño de fuente más pequeño
  doc.fontSize(12).text(`ID Movimiento: ${finanza.id}`);
  doc.text(`Tipo: ${finanza.tipo_movimiento}`);
  doc.text(`Descripción: ${finanza.descripcion}`);
  doc.text(`Monto: ${finanza.monto} ${finanza.moneda}`);
  doc.text(`Fecha: ${new Date(finanza.fecha_movimiento).toLocaleString()}`);
  doc.end(); // Finalizar el documento

  // Esperar a que el evento 'end' del PDF se complete
  await new Promise((resolve) => doc.on('end', resolve));
  // Concatenar todos los chunks en un único buffer
  const buffer = Buffer.concat(chunks);

  // Devolver el PDF como respuesta
  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf', // Indicar que es un PDF
      'Content-Disposition': `attachment; filename=factura-${finanza.id}.pdf`, // Forzar descarga con nombre personalizado
    },
  });
}