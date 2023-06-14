import CategorySquare from './category-square';
import GameSquare from './game-square';
import { SQUARESTATE, type JeopardyClue } from './types';
import { getCategoryQuestions } from './utils';

export default async function Jeopardy() {
  const categories = await getCategoryQuestions();

  return (
    <div className='m-4 flex flex-col'>
      <div className='border border-white sticky top-2 left-2 right-2 my-4'>
        Stat panel
      </div>
      <div className='overflow-x-auto overflow-y-hidden'>
        <div className='min-w-[50rem] grid grid-flow-col grid-cols-6 grid-rows-6 gap-4'>
          {categories.map(category => {
            return (
              <>
                <CategorySquare title={category.title} />
                {category.clues.map(clue => (
                  <GameSquare clue={clue} state={SQUARESTATE.Unplayed} />
                ))}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
