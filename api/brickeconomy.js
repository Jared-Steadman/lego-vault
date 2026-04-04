export default async function handler(req, res) {
  const { apiKey, setNumber } = req.query;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing apiKey' });
  }

  if (!setNumber) {
    return res.status(400).json({ error: 'Missing setNumber' });
  }

  try {
    const url = `https://www.brickeconomy.com/api/v1/set/${setNumber}`;
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'x-apikey': apiKey,
        'User-Agent': 'LegoVaultApp/1.0'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach BrickEconomy API', detail: err.message });
  }
}
