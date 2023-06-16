import {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  ReactNode,
  RefObject,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import { JeopardyClue } from './types';

type Props = {
  open: boolean;
  clue?: JeopardyClue;
  setSquareState: (correct: boolean) => void;
};

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
  console.log(props.className);
  return (
    <button
      className={`rounded bg-blue-300 px-2 ${props.className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function ClueDialog({ open, clue, setSquareState }: Props) {
  console.log(open);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  function handleClose() {
    setSquareState(false);
  }

  return (
    <dialog
      ref={dialogRef}
      className='backdrop:bg-opacity-80 backdrop:backdrop-blur backdrop:bg-black bg-gradient-to-tr from-blue-800 to-blue-700 lg:max-w-4xl'
      onCancel={() => setSquareState(false)}
    >
      {clue && (
        <>
          <div className='mb-4 flex justify-between text-2xl lg:text-3xl text-center'>
            <p>
              Aired: <b>{new Date(clue.airdate).getFullYear()}</b>
            </p>
            <p>
              Points: <b>{clue.value}</b>
            </p>
          </div>
          <div className='my-4 font-bold text-4xl text-center lg:text-5xl select-none bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200'>
            {clue.question}
          </div>
          <form className='text-xl m-4 flex flex-col gap-2 text-center'>
            <p>Type your guess below:</p>
            <input
              type='text'
              className='rounded px-2 py-1 text-2xl bg-blue-300 w-full text-center'
            />
            <div className='flex gap-4 justify-center'>
              <Button onSubmit={() => {}}>Give Up</Button>
              <Button onSubmit={() => {}}>Guess</Button>
            </div>
          </form>
        </>
      )}
    </dialog>
  );
}
