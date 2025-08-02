import path from 'path';
import PDFDocument from 'pdfkit';
import { FinanzaService } from '@/services/finanza.service';

export async function GET(
  request: Request,
  context: any
): Promise<Response> {
  const id = Number(context.params.id);
  const finanza = await FinanzaService.getFinanzas().then((f) =>
    f.find((x) => x.id === id)
  );

  if (!finanza) {
    return new Response(JSON.stringify({ error: 'Movimiento no encontrado' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const logoPath = path.resolve(process.cwd(), 'src/assets/logo.png');

  const doc = new PDFDocument({ margin: 40 });
  const chunks: any[] = [];
  doc.on('data', (c) => chunks.push(c));
  doc.on('end', () => {});

  doc.image(logoPath, 40, 30, { width: 120 });

  doc
    .fontSize(20)
    .text('FACTURA', 0, 50, { align: 'right' })
    .fontSize(10)
    .text(`Factura N°: ${finanza.id}`, { align: 'right' })
    .text(`Fecha: ${new Date(finanza.fecha_movimiento).toLocaleDateString()}`, {
      align: 'right',
    });

  doc.moveDown();

  doc
    .fontSize(12)
    .text('EMPRESA: Gestión de Máquinas Poker', 40, 120)
    .fontSize(10)
    .text('Dirección: Tegucigalpa, Honduras')
    .text('Teléfono: +504 1234-5678')
    .moveDown();

  doc
    .fontSize(12)
    .text(`PROVEEDOR: ${finanza.proveedor_id?.nombre || 'N/A'}`)
    .fontSize(10)
    .text(`Contacto: ${finanza.proveedor_id?.contacto || '-'}`)
    .moveDown();

  doc.fontSize(12).text('Detalle:', { underline: true }).moveDown(0.2);

  doc.font('Helvetica-Bold').text('Descripción', 40, doc.y, { continued: true });
  doc.text('Tipo', 260, doc.y, { continued: true });
  doc.text('Monto', 400, doc.y);

  doc.moveDown(0.5);
  doc.font('Helvetica');

  doc.text(finanza.descripcion || '-', 40, doc.y, { continued: true });
  doc.text(finanza.tipo_movimiento, 260, doc.y, { continued: true });
  doc.text(`${finanza.monto} ${finanza.moneda}`, 400, doc.y);

  doc.moveDown();

  doc.font('Helvetica-Bold').fontSize(14).text(
    `TOTAL: ${finanza.monto} ${finanza.moneda}`,
    { align: 'right' }
  );

  doc.end();
  await new Promise((res) => doc.on('end', res));
  const buffer = Buffer.concat(chunks);

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=factura-${finanza.id}.pdf`,
    },
  });
}
