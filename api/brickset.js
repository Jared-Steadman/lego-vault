export default async function handler(req, res) {
  const { apiKey, params } = req.query;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing apiKey' });
  }

  try {
    const url = `https://brickset.com/api/v3.asmx/getSets?apiKey=${apiKey}&userHash=&params=${params}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Brickset API', detail: err.message });
  }
}
