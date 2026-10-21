export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'CANCELLED' | 'COMPLETED';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface Slot {
  id: number;
  imageSrc: string;
  hostUsername: string;
  bookerUsername: string | null;
  description: string;
  difficulty: Difficulty;
  scheduledAt: string;
  durationMinutes: number;
  status: SlotStatus;
  createdAt: string;
  updatedAt: string;
}