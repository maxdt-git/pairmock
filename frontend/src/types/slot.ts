import type { feedbackDataProps } from "@/pages/InterviewPage/InterviewPage";

export type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'CANCELLED' | 'COMPLETED';

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface SlotType {
  id: number;
  imageSrc: string | null;
  hostId: string;
  bookerId: string | null;
  description: string;
  difficulty: Difficulty;
  scheduledAt: string;
  durationMinutes: number;
  status: SlotStatus;
  createdAt: string;
  updatedAt: string;
  infoThirty: boolean;
  googleEventId: string | null
  meetLink: string | null
  code: string | null
  bookerFeedback: feedbackDataProps
  hostFeedback: feedbackDataProps
  host: {
    name: string;
    image: string | null;
  };
  booker: {
    name: string
  }
}

export type CreateSlotPayload = {
  description: string;
  difficulty: string;
  scheduledAt: string;
  durationMinutes: number;
  status: "AVAILABLE";
};
