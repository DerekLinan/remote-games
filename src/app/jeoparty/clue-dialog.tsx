import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { MdCancelPresentation } from 'react-icons/md';
import { type JeopardyClue } from './types';
import { isCorrect } from './utils';

type Props = {
  open: boolean;
  clue: JeopardyClue;
  setSquareState: (guesses: boolean[]) => void;
};

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
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
  const maxGuesses = 3;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [guess, setGuess] = useState<string>('');
  const [guessStates, setGuessStates] = useState<boolean[]>([]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  function resetState() {
    setGuess('');
    setGuessStates([]);
  }

  function handleClose() {
    setSquareState(guessStates);
    resetState();
  }

  function handleGuess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //TODO notify user
    if (!guess) return;
    const correct = isCorrect(guess, clue?.answer);
    if (correct || guessStates.length + 1 === maxGuesses) {
      setSquareState([...guessStates, correct]);
      resetState();
      return;
    }
    setGuessStates(current => [...current, correct]);
    setGuess('');
  }

  return (
    <dialog
      ref={dialogRef}
      className='backdrop:bg-opacity-80 backdrop:backdrop-blur backdrop:bg-black bg-gradient-to-tr from-blue-800 to-blue-700 lg:max-w-4xl'
      onCancel={() => handleClose()}
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
          <div className='flex justify-center gap-3 text-red-700 text-7xl lg:text-9xl'>
            {guessStates.map((_, index) => (
              <MdCancelPresentation key={index} />
            ))}
          </div>
          <form
            className='text-xl m-4 flex flex-col gap-2 text-center'
            onSubmit={e => handleGuess(e)}
          >
            <p>Type your guess below:</p>
            <input
              type='text'
              value={guess}
              onChange={e => setGuess(e.target.value)}
              spellCheck
              className='rounded px-2 py-1 text-2xl bg-blue-300 w-full text-center'
            />
            <div className='flex gap-4 justify-center'>
              <Button type='button' onClick={() => handleClose()}>
                Give Up
              </Button>
              <Button type='submit'>Guess</Button>
            </div>
          </form>
        </>
      )}
    </dialog>
  );
}
