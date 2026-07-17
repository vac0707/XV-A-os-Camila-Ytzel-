import { LucideIcon } from 'lucide-react';

export interface GuestComment {
  id: string;
  name: string;
  comment: string;
  date: string;
}

export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface BankAccount {
  bank: string;
  accountNumber: string;
  cci: string;
  holder: string;
}
