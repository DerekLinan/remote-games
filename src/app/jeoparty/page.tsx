import GameSquare from './game-square';
import { SQUARESTATE, type JeopardyClue } from './types';
import { getCategoryQuestions } from './utils';

export default async function Jeopardy() {
  const categories = await getCategoryQuestions();

  const testClue: JeopardyClue = {
    id: 7601,
    answer: '"On The Radio"',
    question:
      "It's both the title of Donna Summer's hit of January 1980 \u0026 where you could hear it",
    value: 1000,
    airdate: '1986-11-19T20:00:00.000Z',
    category_id: 1020,
    game_id: 2555,
  };
  return (
    <div className='m-4'>
      <div className='border border-white sticky top-2 left-2 right-2 my-2'>
        Stat panel
      </div>
      <div className='overflow-auto'>
        <div className='min-w-[50rem] grid grid-flow-col grid-cols-6 grid-rows-6 gap-4'>
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />

          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />

          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />

          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />

          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />

          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
          <GameSquare clue={testClue} state={SQUARESTATE.Unplayed} />
          <GameSquare clue={testClue} state={SQUARESTATE.Right} />
          <GameSquare clue={testClue} state={SQUARESTATE.Wrong} />
        </div>
      </div>
    </div>
  );
}
