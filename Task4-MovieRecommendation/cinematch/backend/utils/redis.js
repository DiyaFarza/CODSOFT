const axios = require('axios');

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const headers = { Authorization: `Bearer ${UPSTASH_TOKEN}` };

async function getCache(key) {
  try {
    const res = await axios.get(`${UPSTASH_URL}/get/${key}`, { headers });
    return res.data.result ? JSON.parse(res.data.result) : null;
  } catch { return null; }
}

async function setCache(key, value, exSeconds = 600) {
  try {
    await axios.get(`${UPSTASH_URL}/set/${key}/${encodeURIComponent(JSON.stringify(value))}/ex/${exSeconds}`, { headers });
  } catch (e) { console.error('Redis set error', e.message); }
}

module.exports = { getCache, setCache };