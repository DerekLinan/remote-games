export type JeopardyClue = {
  id: number;
  answer: string;
  question: string;
  value: number;
  airdate: string;
  category_id: number;
  game_id: number;
};

export type JeopardyCategory = {
  id: number;
  title: string;
  clues_count: number;
  clues: JeopardyClue[];
};

export type JeopardyCategoryInfo = Omit<JeopardyCategory, 'clues'> & {
  created_at: string;
  updated_at: string;
};

export type QueryParams = {
  categories: string;
  questions: string;
};

export const enum SQUARESTATE {
  Unplayed,
  Right,
  Wrong,
}
