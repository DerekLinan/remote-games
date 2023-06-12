import GameSquare from './game-square';
import { SQUARESTATE, type JeopardyClue } from './types';

export default function Jeopardy() {
  const testClue: JeopardyClue = {
    id: 7601,
    answer: '"On The Radio"',
    question:
      "It's both the title of Donna Summer's hit of January 1980 \u0026 where you could hear it",
    value: 100,
    airdate: '1986-11-19T20:00:00.000Z',
    created_at: '2022-12-30T18:40:40.435Z',
    updated_at: '2022-12-30T18:40:40.435Z',
    category_id: 1020,
    game_id: 2555,
    category: {
      id: 1020,
      title: '"on" \u0026 "off" songs',
      created_at: '2022-12-30T18:40:40.397Z',
      updated_at: '2022-12-30T18:40:40.397Z',
      clues_count: 5,
    },
  };
  return (
    <div className='m-4'>
      <div className='border border-white sticky top-2 left-2 right-2'>
        Stat panel
      </div>
      <div className='overflow-auto inline-grid grid-flow-col grid-cols-6 grid-rows-6 gap-4 columns-7xl'>
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
  );
}
