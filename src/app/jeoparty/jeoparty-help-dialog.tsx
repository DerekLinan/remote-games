import HelpDialog from '@/components/help-dialog';
import { ReactNode } from 'react';

type Props = {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function JeopartyHelpDialog({ open, setIsOpen }: Props) {
  return (
    <HelpDialog open={open} setIsOpen={setIsOpen}>
      <ol className='list-inside list-decimal'>
        <li>Click/Tap a game square.</li>
        <li>
          Type in what you believe the clue is referring to.
          <ol className='list-inside list-disc pl-5'>
            <li>
              If you got it wrong, you will get another chance to guess the
              answer (max 3 guesses). The red &apos;x&apos; denotes incorrect
              guesses. Categories marked with &apos;*&apos; come from an
              external source and might be impossible to solve. (Sorry! 😔)
            </li>
            <li>
              If you got it right (congratulations! 🎉), you will return to the
              game board.
            </li>
          </ol>
        </li>
        <li>
          When you finish answering all the clues you can click/tap the plus
          button (upper left) to start a new game.
        </li>
      </ol>
    </HelpDialog>
  );
}
