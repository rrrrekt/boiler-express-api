import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middleware/validate';
import * as authService from '../../services/auth.service';
import { authenticate } from '../../middleware/auth';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

const loginSchema = registerSchema;

const refreshSchema = z.object({
  refreshToken: z.string(),
});

// POST /auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body.email, req.body.password);
    res.status(201).json({ data: result });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// POST /auth/refresh
router.post('/refresh', validate(refreshSchema), async (req, res, next) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// POST /auth/logout
router.post('/logout', validate(refreshSchema), async (req, res, next) => {
  try {
    await authService.logout(req.body.refreshToken);
    res.json({ data: { ok: true } });
  } catch (err) {
    next(err);
  }
});

// GET /auth/me — authenticated
router.get('/me', authenticate, async (req, res) => {
  res.json({ data: { id: req.user!.sub, role: req.user!.role } });
});

export default router;
