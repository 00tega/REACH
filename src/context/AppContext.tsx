import React, { createContext, useContext, useState } from 'react';
import {
  Incident,
  IncidentStatus,
  StaffMember,
  StaffTask,
  InstitutionItem,
  PaymentRecord,
  DeskSettings,
} from '../types';
import { INITIAL_INCIDENTS } from '../data/incidents';
import { INITIAL_STAFF, INITIAL_STAFF_TASKS } from '../data/staff';
import { INITIAL_INSTITUTIONS, INITIAL_PAYMENT_HISTORY } from '../data/institutions';
import { INITIAL_DESK_SETTINGS } from '../data/system';

interface AppContextType {
  incidents: Incident[];
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  staff: StaffMember[];
  staffTasks: StaffTask[];
  toggleTaskChecklist: (taskId: string, checkId: string) => void;
  advanceTaskStatus: (taskId: string, newStatus: StaffTask['status']) => void;
  institutions: InstitutionItem[];
  paymentHistory: PaymentRecord[];
  recordPayment: (amount?: string) => void;
  deskSettings: DeskSettings;
  updateDeskSettings: <K extends keyof DeskSettings>(key: K, value: DeskSettings[K]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [staffTasks, setStaffTasks] = useState<StaffTask[]>(INITIAL_STAFF_TASKS);
  const [institutions, setInstitutions] = useState<InstitutionItem[]>(INITIAL_INSTITUTIONS);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>(INITIAL_PAYMENT_HISTORY);
  const [deskSettings, setDeskSettings] = useState<DeskSettings>(INITIAL_DESK_SETTINGS);

  const updateIncidentStatus = (id: string, status: IncidentStatus) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status } : inc))
    );
  };

  const toggleTaskChecklist = (taskId: string, checkId: string) => {
    setStaffTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          checklist: task.checklist.map((item) =>
            item.id === checkId ? { ...item, completed: !item.completed } : item
          ),
        };
      })
    );
  };

  const advanceTaskStatus = (taskId: string, newStatus: StaffTask['status']) => {
    setStaffTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const recordPayment = (amount: string = '$1,450.00') => {
    const newRecord: PaymentRecord = {
      id: `pay-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      code: `PAY-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 90)}`,
      status: 'Paid',
      amount,
    };
    setPaymentHistory((prev) => [newRecord, ...prev]);
  };

  const updateDeskSettings = <K extends keyof DeskSettings>(
    key: K,
    value: DeskSettings[K]
  ) => {
    setDeskSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        incidents,
        updateIncidentStatus,
        staff,
        staffTasks,
        toggleTaskChecklist,
        advanceTaskStatus,
        institutions,
        paymentHistory,
        recordPayment,
        deskSettings,
        updateDeskSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
