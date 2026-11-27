import app from './server/index.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Smart Study Backend Server listening on http://localhost:${PORT}`);
});
