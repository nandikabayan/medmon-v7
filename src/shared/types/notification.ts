export interface Notification {
  _id: string;
  key: string;
  read: number;
  source: string;
  timestamp: string;
  type: number;
  value: number;
  title: string;
  description: string;
  status: string;
}