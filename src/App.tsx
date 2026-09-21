import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';

// Security Desk Pages
import { LiveQueuePage } from './pages/security-desk/LiveQueuePage';
import { ResponseDeskPage } from './pages/security-desk/ResponseDeskPage';
import { TeamOnDutyPage } from './pages/security-desk/TeamOnDutyPage';
import { DeskSettingsPage } from './pages/security-desk/DeskSettingsPage';

// Staff Pages
import { StaffTasksPage } from './pages/staff/StaffTasksPage';

// Institution Pages
import { OverviewPage as InstitutionOverviewPage } from './pages/institution/OverviewPage';
import { BillingPlanPage } from './pages/institution/BillingPlanPage';
import { SiteIncidentsPage } from './pages/institution/SiteIncidentsPage';
import { SecurityRosterPage } from './pages/institution/SecurityRosterPage';
import { NotificationsPage } from './pages/institution/NotificationsPage';

// Operator Pages
import { OperatorOverviewPage } from './pages/operator/OperatorOverviewPage';
import { InstitutionsPage } from './pages/operator/InstitutionsPage';
import { AllIncidentsPage } from './pages/operator/AllIncidentsPage';
import { AiPerformancePage } from './pages/operator/AiPerformancePage';
import { RelayHealthPage } from './pages/operator/RelayHealthPage';
import { SystemHealthPage } from './pages/operator/SystemHealthPage';
import { AuditLogPage } from './pages/operator/AuditLogPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Root Redirect */}
            <Route index element={<Navigate to="/security-desk/live-queue" replace />} />

            {/* Security Desk Section */}
            <Route path="security-desk">
              <Route index element={<Navigate to="live-queue" replace />} />
              <Route path="live-queue" element={<LiveQueuePage />} />
              <Route path="response-desk" element={<ResponseDeskPage />} />
              <Route path="team-on-duty" element={<TeamOnDutyPage />} />
              <Route path="desk-settings" element={<DeskSettingsPage />} />
            </Route>

            {/* Staff Section */}
            <Route path="staff">
              <Route index element={<Navigate to="live-queue" replace />} />
              <Route path="live-queue" element={<StaffTasksPage />} />
            </Route>

            {/* Institution Section */}
            <Route path="institution">
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<InstitutionOverviewPage />} />
              <Route path="billing-and-plan" element={<BillingPlanPage />} />
              <Route path="site-incidents" element={<SiteIncidentsPage />} />
              <Route path="security-roster" element={<SecurityRosterPage />} />
              <Route path="from-reach" element={<NotificationsPage />} />
            </Route>

            {/* Operator Section */}
            <Route path="operator">
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<OperatorOverviewPage />} />
              <Route path="institution" element={<InstitutionsPage />} />
              <Route path="all-incidents" element={<AllIncidentsPage />} />
              <Route path="ai-performance" element={<AiPerformancePage />} />
              <Route path="relay-health" element={<RelayHealthPage />} />
              <Route path="system-health" element={<SystemHealthPage />} />
              <Route path="audit-log" element={<AuditLogPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/security-desk/live-queue" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
