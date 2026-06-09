const createRateLimiter = ({ windowMs, max, message }) => {
  const requestStore = new Map();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip || req.connection?.remoteAddress || 'unknown';
    const current = requestStore.get(key);

    if (!current || now - current.windowStart >= windowMs) {
      requestStore.set(key, { count: 1, windowStart: now });
      return next();
    }

    current.count += 1;
    requestStore.set(key, current);

    if (current.count > max) {
      return res.status(429).json({
        error: message || 'Too many requests. Please try again later.',
      });
    }

    // Opportunistic cleanup to avoid unbounded memory growth.
    if (requestStore.size > 10000) {
      for (const [storeKey, value] of requestStore.entries()) {
        if (now - value.windowStart >= windowMs) {
          requestStore.delete(storeKey);
        }
      }
    }

    return next();
  };
};

module.exports = createRateLimiter;
