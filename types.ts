
export interface JourneyContent {
  imageUrl: string | null;
  shortMessage: string | null;
  loveLetter: string | null;
  proposal: string | null;
}

export interface AppState {
  view: 'setup' | 'loading' | 'journey';
  recipient: string;
  nicknames: string;
  keywords: string;
  memory: string;
  userPhotos: string[]; // Store local object URLs for the uploaded photos
  content: JourneyContent | null;
  error: string | null;
}

export enum AppTab {
  LETTER = 'LETTER',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  MESSAGE = 'MESSAGE',
  PROPOSAL = 'PROPOSAL',
}
