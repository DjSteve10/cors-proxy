import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', contentType || 'text/plain');
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send('Proxy error: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
