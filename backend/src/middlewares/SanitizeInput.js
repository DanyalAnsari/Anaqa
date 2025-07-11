function sanitize(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => sanitize(item));
  }

  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key.includes('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitize(obj[key]);
    }
  }

  return obj;
}

export default function sanitizeInput(req, res, next) {
  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
}
