import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Role, SignupData } from '../types';

export const ROLE_DEFAULT_ROUTES: Record<Role, string> = {
  'security-desk': '/security-desk/live-queue',
  'staff': '/staff/live-queue',
  'institution': '/institution/overview',
  'operator': '/operator/overview',
};

// Demo user registry matching REACH_login-signup.html
export const DEMO_USERS: Record<string, { pass: string; role: Role; name: string; inst: string }> = {
  'desk@greenfield.demo': { pass: 'demo1234', role: 'security-desk', name: 'A. Okonkwo', inst: 'Greenfield Estate' },
  'staff@greenfield.demo': { pass: 'demo1234', role: 'staff', name: 'T. Bello', inst: 'Greenfield Estate' },
  'admin@greenfield.demo': { pass: 'demo1234', role: 'institution', name: 'Estate Admin', inst: 'Greenfield Estate' },
  'ops@reach.demo': { pass: 'demo1234', role: 'operator', name: 'Ops Ada', inst: 'REACH Platform' },
};

// Normalize role strings (e.g. 'desk' -> 'security-desk')
export function normalizeRole(roleStr: string): Role {
  if (roleStr === 'desk') return 'security-desk';
  if (roleStr === 'admin') return 'institution';
  if (roleStr === 'student' || roleStr === 'resident') return 'security-desk';
  if (roleStr === 'security-desk' || roleStr === 'staff' || roleStr === 'institution' || roleStr === 'operator') {
    return roleStr as Role;
  }
  return 'security-desk';
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, requestedRole?: string) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string; user?: AuthUser }>;
  logout: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  getRoleDashboardPath: (role: Role) => string;
}

const STORAGE_KEY = 'reach_auth_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && ((parsed.role as string) === 'resident' || (parsed.role as string) === 'student')) {
          parsed.role = 'security-desk';
          parsed.name = 'A. Okonkwo';
          parsed.email = 'desk@greenfield.demo';
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          } catch {
            // ignore
          }
        }
        return parsed as AuthUser;
      }
    } catch {
      // Ignore parse error
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toast]);

  const saveUserSession = (newUser: AuthUser | null) => {
    setUser(newUser);
    if (newUser) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } catch {
        // storage disabled or quota exceeded
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  };

  const login = async (
    rawEmail: string,
    pass: string,
    requestedRole?: string
  ): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setIsLoading(true);
    const email = (rawEmail || '').trim().toLowerCase();
    const cleanPass = pass || '';
    const normRequestedRole = requestedRole ? normalizeRole(requestedRole) : undefined;

    // Check demo accounts
    const demo = DEMO_USERS[email];
    if (demo && demo.pass === cleanPass) {
      const activeRole = normRequestedRole || demo.role;
      const loggedUser: AuthUser = {
        email,
        name: demo.name,
        role: activeRole,
        inst: demo.inst,
      };
      saveUserSession(loggedUser);
      showToast(`Welcome back, ${loggedUser.name}`);
      setIsLoading(false);
      return { success: true, user: loggedUser };
    }

    // General validation: pass >= 4 chars
    if (cleanPass.length >= 4) {
      const role = normRequestedRole || 'security-desk';
      const roleNames: Record<Role, string> = {
        'security-desk': 'Security Officer',
        staff: 'Response Staff',
        institution: 'Institution Admin',
        operator: 'SaaS Operator',
      };
      const loggedUser: AuthUser = {
        email: email || 'user@reach.local',
        name: roleNames[role] || 'REACH User',
        role,
        inst: 'Greenfield Estate',
      };
      saveUserSession(loggedUser);
      showToast(`Welcome, ${loggedUser.name}`);
      setIsLoading(false);
      return { success: true, user: loggedUser };
    }

    setIsLoading(false);
    showToast('Use a demo account or password ≥ 4 characters');
    return { success: false, error: 'Password must be at least 4 characters long.' };
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string; user?: AuthUser }> => {
    setIsLoading(true);

    if (data.pass.length < 4) {
      setIsLoading(false);
      showToast('Password too short (min 4 characters)');
      return { success: false, error: 'Password too short' };
    }


    if (data.type === 'institution') {
      const newUser: AuthUser = {
        email: data.email.trim().toLowerCase() || 'admin@local',
        name: data.name.trim() || 'Institution Admin',
        role: 'institution',
        inst: data.org.trim() || 'New Institution',
      };
      saveUserSession(newUser);
      showToast('Institution created · REACH Full');
      setIsLoading(false);
      return { success: true, user: newUser };
    }

    if (data.type === 'staff') {
      if (!data.invite.trim()) {
        setIsLoading(false);
        showToast('Invite code required');
        return { success: false, error: 'Invite code required' };
      }
      const mappedRole = normalizeRole(data.roleMap);
      const newUser: AuthUser = {
        email: data.email.trim().toLowerCase() || 'staff@local',
        name: data.name.trim() || 'New Staff',
        role: mappedRole,
        inst: 'Greenfield Estate',
      };
      saveUserSession(newUser);
      showToast('Joined with invite');
      setIsLoading(false);
      return { success: true, user: newUser };
    }

    if (data.type === 'operator') {
      if (!data.key.trim()) {
        setIsLoading(false);
        showToast('Operator access key required');
        return { success: false, error: 'Operator access key required' };
      }
      const newUser: AuthUser = {
        email: data.email.trim().toLowerCase() || 'ops@local',
        name: data.name.trim() || 'Operator',
        role: 'operator',
        inst: 'REACH Platform',
      };
      saveUserSession(newUser);
      showToast('Operator access granted');
      setIsLoading(false);
      return { success: true, user: newUser };
    }

    setIsLoading(false);
    return { success: false, error: 'Invalid account type' };
  };

  const logout = () => {
    saveUserSession(null);
    showToast('Logged out');
  };

  const getRoleDashboardPath = (role: Role): string => {
    return ROLE_DEFAULT_ROUTES[role] || '/security-desk/live-queue';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        toast,
        showToast,
        getRoleDashboardPath,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      <div id="toast" className={toast ? 'show' : ''} role="status" aria-live="polite">
        {toast}
      </div>
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
