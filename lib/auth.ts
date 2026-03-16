const SESSION_KEY = 'media_today_admin_session';
const TOKEN_KEY = 'media_today_admin_token';

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt?: Date;
}

export interface LoginRequest {
  username?: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: AdminUser;
  token?: string;
}

// 真实请求后端 API 验证登录
export async function loginAdmin(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await res.json();
    
    if (data.success) {
      const token = generateMockToken(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        localStorage.setItem(TOKEN_KEY, token);
      }
      return { success: true, message: 'Login successful', user: data.user, token };
    } else {
      return { success: false, message: data.message || 'Invalid credentials' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Server connection failed.' };
  }
}

export function getCurrentUser(): AdminUser | null {
  if (typeof window === 'undefined') return null;
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;
  try { return JSON.parse(sessionStr); } catch { return null; }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function logoutAdmin(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null && getAuthToken() !== null;
}

function generateMockToken(user: AdminUser): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id, username: user.username, role: user.role,
    exp: Math.floor(Date.now() / 1000) + 86400 * 7,
  }));
  return `${header}.${payload}.mock-signature`;
}