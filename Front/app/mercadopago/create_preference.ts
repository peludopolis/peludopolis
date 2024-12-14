import { NextApiRequest, NextApiResponse } from 'next';

const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const preference = {
        items: req.body.items,
        back_urls: req.body.back_urls,
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [
            { id: 'atm' },
          ],
        },
      };

      const preferenceResult = await mercadopago.preferences.create(preference);
      res.status(200).json({ init_point: preferenceResult.body.init_point });
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      res.status(500).json({ error: 'Error al generar la preferencia' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
