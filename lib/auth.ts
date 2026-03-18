// Admin Authentication Utility (Mock Auth - ready to be replaced with real auth)
// For production, use NextAuth.js, Clerk, or database-backed authentication

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'demo2024',
  email: 'admin@mediatoday.com',
};

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AdminUser;
  token?: string;
}

// Session Storage Key
const SESSION_KEY = 'media_today_admin_session';
const TOKEN_KEY = 'media_today_admin_token';

/**
 * Validate login credentials
 * In production, this would validate against a database
 */
export async function loginAdmin(credentials: LoginRequest): Promise<AuthResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (
    credentials.username === DEMO_CREDENTIALS.username &&
    credentials.password === DEMO_CREDENTIALS.password
  ) {
    const user: AdminUser = {
      id: '1',
      username: DEMO_CREDENTIALS.username,
      email: DEMO_CREDENTIALS.email,
      role: 'admin',
      createdAt: new Date(),
    };

    const token = generateMockToken(user);

    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, token);
    }

    return {
      success: true,
      message: 'Login successful',
      user,
      token,
    };
  }

  return {
    success: false,
    message: 'Invalid credentials. Use admin/demo2024 for demo.',
  };
}

/**
 * Get current logged-in user from session
 */
export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) {
    return null;
  }

  try {
    return JSON.parse(sessionStr);
  } catch {
    return null;
  }
}

/**
 * Get auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Logout current user
 */
export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null && getAuthToken() !== null;
}

/**
 * Generate a mock JWT-like token
 */
function generateMockToken(user: AdminUser): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 * 7, // 7 days
    })
  );
  const signature = btoa('mock-signature');

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify token (mock implementation)
 */
export function verifyToken(token: string): boolean {
  if (!token || token.split('.').length !== 3) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);

    // Check if token is expired
    return payload.exp > now;
  } catch {
    return false;
  }
}

/**
 * Protected route guard (for use in pages)
 * Redirects to login if not authenticated
 */
export function requireAuth() {
  if (typeof window !== 'undefined' && !isAuthenticated()) {
    window.location.href = '/admin/login';
  }
}
