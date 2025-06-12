function sanitize(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // If key is unsafe, delete it
      if (key.includes('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitize(obj[key]); // Recursive sanitization
      }
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
