
export enum AppView {
  DASHBOARD = 'dashboard',
  LESSON_33 = 'lesson_33',
  LESSON_34 = 'lesson_34',
  LESSON_35 = 'lesson_35',
  LESSON_36 = 'lesson_36',
  QUIZ = 'quiz',
  GAME = 'game'
}

export type Nucleotide = 'A' | 'T' | 'G' | 'C' | 'U';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
}

export interface SimulationStep {
  title: string;
  description: string;
}
