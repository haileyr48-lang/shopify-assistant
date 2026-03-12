export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { code, shop } = req.body;
  const client_id = process.env.SHOPIFY_CLIENT_ID;
  const client_secret = process.env.SHOPIFY_CLIENT_SECRET;

  if (!code || !shop) return res.status(400).json({ error: 'Missing code or shop' });

  try {
    const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id, client_secret, code })
    });

    const data = await tokenRes.json();
    if (data.access_token) {
      res.status(200).json({ access_token: data.access_token });
    } else {
      res.status(400).json({ error: 'Token exchange failed', details: data });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
