import { JeopardyClue, SQUARESTATE } from './types';
import { FaCheck, FaTimes } from 'react-icons/fa';

type Clue = {
  clue: JeopardyClue;
};

type Props = Clue & {
  state: SQUARESTATE;
};

function DisplayUnplayed({ clue }: Clue) {
  return (
    <div className='p-2 flex flex-col justify-center h-full bg-gradient-to-br from-blue-800 to-blue-700'>
      <span className='bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200 sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl'>
        ${clue.value}
      </span>
    </div>
  );
}

function DisplayAnswered({ clue, state }: Props) {
  const wasRight = state === SQUARESTATE.Right;
  const prefixStyle = 'text-sm font-bold';

  return (
    <div
      className={`p-2 text-xs xl:text-base ${
        wasRight
          ? 'bg-gradient-to-tr from-blue-800 to-blue-700'
          : 'bg-gradient-to-b from-blue-950 to-blue-900'
      }`}
    >
      <div
        className={`bg-clip-text text-transparent bg-gradient-to-br ${
          wasRight
            ? 'from-yellow-500 to-yellow-200'
            : 'from-gray-300 to-gray-400'
        }`}
      >
        <div>
          <span className={prefixStyle}>Q:</span> {clue.question}
        </div>
        <div>
          <span className={prefixStyle}>A:</span> {clue.answer}
        </div>
        <div>
          <span className={prefixStyle}>Aired:</span>{' '}
          {new Date(clue.airdate).getFullYear()}
        </div>
        <div className='flex justify-between'>
          {clue.value}
          {wasRight ? (
            <FaCheck className='text-green-400' />
          ) : (
            <FaTimes className='text-red-600' />
          )}
        </div>
      </div>
    </div>
  );
}

export default function GameSquare({ clue, state }: Props) {
  let content;

  switch (state) {
    case SQUARESTATE.Unplayed:
      content = <DisplayUnplayed clue={clue} />;
      break;
    case SQUARESTATE.Right:
    case SQUARESTATE.Wrong:
      content = <DisplayAnswered {...{ clue, state }} />;
      break;
    default:
      content = <div>State number {state} is unhandled</div>;
  }

  //TODO move up one level into the mapping
  return <button>{content}</button>;
}
