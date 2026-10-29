export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'CANCELLED' | 'COMPLETED';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface SlotType {
  id: number;
  hostId: string;
  bookerId: string | null;
  host: {
      name: string;
      image: string | null;
  };
  booker: {
    name: string
  }
  description: string;
  difficulty: Difficulty;
  scheduledAt: string;
  durationMinutes: number;
  status: SlotStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateSlotPayload = {
    description: string;
    difficulty: string;
    scheduledAt: string;
    durationMinutes: number;
    status: "AVAILABLE";
};
