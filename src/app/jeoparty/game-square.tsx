import { JeopardyClue, SQUARESTATE } from './types';
import { FaCheck, FaTimes } from 'react-icons/fa';

type Clue = {
  clue: JeopardyClue;
};

type Props = Clue & {
  state: SQUARESTATE;
  openDialog: () => void;
};

function DisplayUnplayed({
  clue,
  openDialog,
}: Clue & { openDialog: () => void }) {
  return (
    <button
      onClick={openDialog}
      className='group p-2 flex flex-col justify-center h-full bg-gradient-to-br from-blue-800 to-blue-700 hover:bg-gradient-to-br hover:from-yellow-800 hover:to-yellow-400 focus:bg-gradient-to-br focus:from-yellow-900 focus:to-yellow-500 focus:border focus:border-white'
    >
      <span className='bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200 hover:bg-gradient-to-tl group-hover:from-black group-hover:to-gray-800 group-focus:from-black group-focus:to-gray-800 text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl '>
        ${clue.value}
      </span>
    </button>
  );
}

function DisplayAnswered({ clue, state }: Clue & { state: SQUARESTATE }) {
  const wasRight = state === SQUARESTATE.Right;
  const prefixStyle = 'text-sm font-bold flex flex-col content-center';

  return (
    <div
      className={`p-2 text-xs xl:text-base flex justify-center ${
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

export default function GameSquare({ clue, state, openDialog }: Props) {
  switch (state) {
    case SQUARESTATE.Unplayed:
      return <DisplayUnplayed clue={clue} openDialog={openDialog} />;

    case SQUARESTATE.Right:
    case SQUARESTATE.Wrong:
      return <DisplayAnswered clue={clue} state={state} />;

    default:
      return <div>State number {state} is unhandled</div>;
  }
}
