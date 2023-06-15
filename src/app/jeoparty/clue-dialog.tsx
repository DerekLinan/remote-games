import { RefObject, forwardRef, useEffect, useRef } from 'react';
import { JeopardyClue } from './types';

type Props = {
  open: boolean;
  clue?: JeopardyClue;
  setSquareState: (correct: boolean) => void;
};

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
      className='backdrop:bg-opacity-80 backdrop:backdrop-blur backdrop:bg-black'
      onCancel={() => setSquareState(false)}
    >
      {clue && (
        <>
          <div>{new Date(clue.airdate).getFullYear()}</div>
          <div>{clue.question}</div>
          <div>{clue.value}</div>
        </>
      )}
    </dialog>
  );
}
