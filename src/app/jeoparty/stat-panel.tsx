import { FaShareAlt, FaQuestionCircle, FaPlus } from 'react-icons/fa';
import { PlayStates } from './game-board';
import { SQUARESTATE } from './types';

const columnStyles = 'flex flex-col flex-grow basis-0';
const specialFont =
  'font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200';

function PanelButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      className={
        'group self-center w-24 rounded flex gap-2 p-2 justify-center bg-gradient-to-br from-blue-800 to-blue-700 hover:from-yellow-800 hover:to-yellow-400 focus:bg-gradient-to-br focus:ring-2 focus:ring-white focus:ring-inset' +
        ` ${className}`
      }
    >
      {children}
    </button>
  );
}

function CalculateStats(playStates: PlayStates): {
  score: number;
  right: number;
  wrong: number;
  accuracy: number;
} {
  const keys = Object.keys(playStates);
  const { score, right } = keys.reduce(
    (count, key) => {
      const clue = playStates[key];
      if (clue.state === SQUARESTATE.Right) {
        count.score += clue.points;
        count.right += 1;
      }
      return count;
    },
    { score: 0, right: 0 },
  );
  const wrong = keys.length - right;
  const accuracy = keys.length ? right / keys.length : 0;

  return { score, right, wrong, accuracy };
}

export default function StatPanel({
  playStates,
  isFinished,
}: {
  playStates: PlayStates;
  isFinished?: boolean;
}) {
  const stats = CalculateStats(playStates);

  return (
    <div className='sticky z-10 gap-2 top-2 left-2 right-2 my-4 backdrop-blur backdrop-brightness-[.25] p-4 flex justify-between text-xl lg:text-2xl'>
      <div className={`${columnStyles} align-middle text-center`}>
        {isFinished && (
          <>
            <div>
              <span className={specialFont}>
                Congratualtions! You have finished this board.
              </span>
            </div>
            <div>New game board: </div>
            <PanelButton>
              <FaPlus className='text-yellow-300 group-hover:text-black' />
            </PanelButton>
          </>
        )}
        <div>Share this game board: </div>
        <PanelButton className='hover:cursor-not-allowed'>
          <FaShareAlt className='text-yellow-300 group-hover:text-black' />
        </PanelButton>
      </div>
      <div
        className={`${columnStyles} sm:flex-grow-[2] sm:flex-row gap-2 sm:gap-0`}
      >
        <div className={`${columnStyles} text-center`}>
          <div>Total Score</div>
          <div className={`${specialFont} text-4xl lg:text-5xl`}>
            {stats.score}
          </div>
        </div>
        <div className={columnStyles}>
          <div className='flex justify-between align-middle'>
            <span>
              Right: <span className={specialFont}>{stats.right}</span>
            </span>
            <button>
              <FaQuestionCircle />
            </button>
          </div>
          <div>
            Wrong: <span className={specialFont}>{stats.wrong}</span>
          </div>
          <div>
            Accuracy:{' '}
            <span className={specialFont}>
              {(stats.accuracy * 100).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
