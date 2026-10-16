export type ToolCategory = 'Friends' | 'Relationship' | 'Personality' | 'Money' | 'Shaadi';

export interface ToolDefinition {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  icon: string;
  color: string;
  gradient: string;
  badge?: string;
  displayOrder: number;
  featured?: boolean;
}

export interface QuestionOption {
  text: string;
  subtext?: string;
  score: number;
  tag?: string;
  type?: string;
  label?: string;
  icon?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  hint?: string;
  options: QuestionOption[];
}

export interface ResultCardData {
  toolSlug: string;
  toolTitle: string;
  category: ToolCategory;
  userName?: string;
  targetName?: string;
  badgeTitle: string;
  score?: number | string;
  scoreLabel?: string;
  subtitle?: string;
  description: string;
  punchline?: string;
  metrics?: { label: string; value: string; color?: string }[];
  bulletPoints?: string[];
  themeColor?: string;
  disclaimer?: string;
  customDetails?: Record<string, any>;
}

export interface EventPayload {
  toolSlug: string;
  eventType: 'OPEN' | 'COMPLETE' | 'DOWNLOAD' | 'SHARE_ATTEMPT';
  meta?: Record<string, any>;
}
