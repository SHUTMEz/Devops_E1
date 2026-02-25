const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const helmetPath = path.join(__dirname, 'node_modules', 'helmet');
const hasHelmet = fs.existsSync(helmetPath);
const helmet = hasHelmet ? require('helmet') : null;

if (helmet) {
  app.use(helmet());
}
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});
app.use(express.json());
app.use(cors());

const usersRouter = require('./routes/usersRoutes');
const authRouter = require('./routes/authRouter');
const uploadRouter = require('./routes/uploadRouter');
const categoryRouter = require('./routes/categoryRouter');
const admin = require('./routes/adminRouter');
const evaluatee = require('./routes/evaluateeRouter');
const evaluator = require('./routes/evaluatorRoutes');
const taskRouter = require('./routes/taskRouter');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/health', (req, res) => {
  res.send({ status: 'OK', data: req.query });
});

app.get('/system/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'backend', ts: new Date().toISOString() });
});

app.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi.json'));
});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/cat', categoryRouter);
app.use('/api/admin', admin);
app.use('/api/evaluatee', evaluatee);
app.use('/api/evaluator', evaluator);
app.use('/api', taskRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
  if (err && err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'PAYLOAD_TOO_LARGE' });
  }
  return next(err);
});

module.exports = app;
