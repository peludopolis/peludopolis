// import { NextApiRequest, NextApiResponse } from 'next';

// const mercadopago = require('mercadopago');

// mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN || '');

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const preference = {
//         items: req.body.items,
//         back_urls: req.body.back_urls,
//         auto_return: 'approved',
//         payment_methods: {
//           excluded_payment_types: [
//             { id: 'atm' },
//           ],
//         },
//       };

//       const preferenceResult = await mercadopago.preferences.create(preference);
//       res.status(200).json({ init_point: preferenceResult.body.init_point });
//     } catch (error) {
//       console.error('Error al crear la preferencia:', error);
//       res.status(500).json({ error: 'Error al generar la preferencia' });
//     }
//   } else {
//     res.status(405).json({ error: 'Método no permitido' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';

const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN || '');

// Simula almacenamiento temporal para el ejemplo (sustituir por DB en producción)
const existingPayments: { [orderId: string]: string } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { orderId, items, back_urls } = req.body;

    try {
      if (!orderId) {
        return res.status(400).json({ error: 'Falta el identificador único (orderId).' });
      }

      // Verificar si ya existe una preferencia para este orderId
      if (existingPayments[orderId]) {
        console.log(`Preferencia existente encontrada para orderId: ${orderId}`);
        return res.status(200).json({ init_point: existingPayments[orderId] });
      }

      // Crear la preferencia si no existe
      const preference = {
        items,
        back_urls,
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [{ id: 'atm' }],
        },
        external_reference: orderId, // Vincular la orden con la preferencia
      };

      const preferenceResult = await mercadopago.preferences.create(preference);

      // Guardar la preferencia para evitar duplicados
      existingPayments[orderId] = preferenceResult.body.init_point;

      res.status(200).json({ init_point: preferenceResult.body.init_point });
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
      res.status(500).json({ error: 'Error al generar la preferencia' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
