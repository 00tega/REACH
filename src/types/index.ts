/* ==========================================================================
   REACH TypeScript Type Definitions
   ========================================================================== */

export type Role = 'security-desk' | 'staff' | 'institution' | 'operator';

export type IncidentStatus = 'Verifying' | 'Responding' | 'Resolved' | 'On Scene' | 'Pushed';

export interface Incident {
  id: string;
  code: string;
  type: string;
  category: 'MEDICAL' | 'FIRE' | 'SECURITY' | 'OTHER';
  location: string;
  aiDetails: {
    channel: string;
    confidence: number;
    fpCode: string;
    autoPushed: boolean;
    viaRelay: boolean;
  };
  status: IncidentStatus;
  timestamp: string;
  evidence: {
    audio: boolean;
    image: boolean;
    location: boolean;
  };
  assignedStaff?: string;
}

export interface StaffMember {
  id: string;
  role: string;
  name: string;
  status: 'On Duty' | 'On Task' | 'Off Duty';
}

export interface StaffTaskChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface StaffTask {
  id: string;
  incidentId: string;
  incidentCode: string;
  location: string;
  aiSummary: string;
  status: 'Responding' | 'Verifying' | 'On Scene' | 'Resolved';
  checklist: StaffTaskChecklistItem[];
}

export interface InstitutionItem {
  id: string;
  code: string;
  name: string;
  category: string;
  plan: string;
  status: 'Active' | 'Grace' | 'Inactive';
  coverageCount: number;
  residentsCount: number;
  staffCount: number;
  securityCount: number;
  nextCharge: string;
  paymentApi: string;
  gracePeriod: string;
}

export interface PaymentRecord {
  id: string;
  date: string;
  code: string;
  status: 'Paid' | 'Pending' | 'Failed';
  amount?: string;
}

export interface NotificationItem {
  id: string;
  date: string;
  text: string;
}

export interface SystemHealthItem {
  id: string;
  service: string;
  status: 'Healthy' | 'Unhealthy' | 'Degraded';
}

export interface AuditLogItem {
  id: string;
  time: string;
  actor: string;
  action: string;
}

export interface LiveFeedItem {
  id: string;
  time: string;
  message: string;
}

export interface AiDecisionItem {
  id: string;
  code: string;
  description: string;
}

export interface DeskSettings {
  teamOnDuty: string;
  aiAutoPush: boolean;
  relayPackets: string;
  radioChannel: string;
}
