import { getCategoryQuestions } from './utils';
import GameBoard from './game-board';

export default async function Jeopardy({
  params,
}: {
  params: { categories: string; questions: string };
}) {
  const { categories, questions } = params;
  const test =
    categories &&
    typeof categories === 'string' &&
    questions &&
    typeof questions === 'string'
      ? await getCategoryQuestions({
          categories,
          questions,
        })
      : await getCategoryQuestions();

  return <GameBoard categories={test} />;
}
