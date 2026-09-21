import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export const RoleSwitcher: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const roles = [
    { label: 'Security Desk', path: '/security-desk/live-queue', prefix: '/security-desk' },
    { label: 'Staff', path: '/staff/live-queue', prefix: '/staff' },
    { label: 'Institution', path: '/institution/overview', prefix: '/institution' },
    { label: 'Operator', path: '/operator/overview', prefix: '/operator' },
  ];

  return (
    <nav className="role-switcher" aria-label="Role Portals">
      {roles.map((role) => {
        const isActive = pathname.startsWith(role.prefix);
        return (
          <NavLink
            key={role.prefix}
            to={role.path}
            className={`role-switcher__link ${
              isActive ? 'role-switcher__link--active' : ''
            }`}
          >
            {role.label}
          </NavLink>
        );
      })}
    </nav>
  );
};
