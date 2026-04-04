export default async function handler(req, res) {
  const { upc, userKey } = req.query;

  if (!upc) {
    return res.status(400).json({ error: 'Missing upc' });
  }

  // Use paid endpoint if a user key is provided, otherwise free trial
  const endpoint = userKey
    ? `https://api.upcitemdb.com/prod/v1/lookup?upc=${upc}`
    : `https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`;

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (userKey) {
    headers['user_key'] = userKey;
    headers['key_type'] = '3scale';
  }

  try {
    const response = await fetch(endpoint, { headers });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach UPCitemdb API', detail: err.message });
  }
}
