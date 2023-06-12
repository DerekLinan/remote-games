export type JeopardyClue = {
  id: number;
  answer: string;
  question: string;
  value: number;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  category: JeopardyCategory;
};

export type JeopardyCategory = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  clues_count: number;
};

export const enum SQUARESTATE {
  Unplayed,
  Right,
  Wrong,
}
