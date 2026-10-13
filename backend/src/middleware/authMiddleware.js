import jwt  from 'jsonwebtoken';
import User from '../models/User.js';

// ─── Protect: verify JWT and attach user to req ───────────────────────────────
export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer '))
      return res.status(401).json({ success: false, message: 'Not authorised — no token' });

    const token   = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id);

    if (!user)
      return res.status(401).json({ success: false, message: 'User no longer exists' });

    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid or expired' });
  }
};

// ─── RestrictTo: role-based access ────────────────────────────────────────────
// Usage: router.delete('/users/:id', protect, restrictTo('admin'), deleteUser)
export const restrictTo = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ success: false, message: 'Access denied' });
  next();
};
