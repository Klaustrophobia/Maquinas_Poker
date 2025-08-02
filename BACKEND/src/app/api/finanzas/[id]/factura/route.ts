import { NextRequest, NextResponse } from 'next/server';
import PDFDocument from 'pdfkit';
import { FinanzaService } from '@/services/finanza.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const finanza = await FinanzaService.getFinanzas().then(finanzas =>
    finanzas.find(f => f.id === id)
  );

  if (!finanza) {
    return NextResponse.json({ error: 'Movimiento no encontrado' }, { status: 404 });
  }

  const doc = new PDFDocument();

  // Convertir el PDF a buffer
  const buffers: any[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  // ---- Contenido del PDF ----
  doc.fontSize(20).text('FACTURA', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`ID Movimiento: ${finanza.id}`);
  doc.text(`Tipo: ${finanza.tipo_movimiento}`);
  doc.text(`Descripción: ${finanza.descripcion}`);
  doc.text(`Monto: ${finanza.monto} ${finanza.moneda}`);
  doc.text(`Fecha: ${new Date(finanza.fecha_movimiento).toLocaleString()}`);
  doc.text(`Proveedor: ${finanza.proveedor_id?.nombre || '-'}`);
  doc.text(`Notas: ${finanza.notas || '-'}`);
  doc.end();
  // ---- Fin contenido PDF ----

  await new Promise(resolve => doc.on('end', resolve));
  const pdfBuffer = Buffer.concat(buffers);

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=factura-${finanza.id}.pdf`
    }
  });
}
