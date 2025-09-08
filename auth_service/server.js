
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8081;
const SECRET = process.env.JWT_SECRET || 'dev-secret';

app.post('/auth/login', (req, res) => {
  const { userId = 'demo', roles = ['USER'] } = req.body || {};
  const token = jwt.sign({ sub: String(userId), roles }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/auth/validate', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.substring(7) : null;
  if (!token) return res.status(401).json({ ok:false, error:'missing token' });
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ ok:true, userId: decoded.sub, roles: decoded.roles });
  } catch (e) {
    res.status(401).json({ ok:false, error:'invalid token' });
  }
});

app.listen(PORT, () => console.log(`auth-service listening on ${PORT}`));
