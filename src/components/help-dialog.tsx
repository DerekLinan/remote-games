import { ReactNode, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

type Props = {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

export default function HelpDialog({ open, setIsOpen, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef && dialogRef.current) {
      dialogRef.current.addEventListener('click', e => {
        // TS doesn't know that dialogRef.current can't be null here...
        if (dialogRef.current) {
          const dialogDimensions = dialogRef.current.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
          ) {
            setIsOpen(false);
            dialogRef.current.close();
          }
        }
      });
    }
  }, [dialogRef, setIsOpen]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={() => setIsOpen(false)}
      className='text-white backdrop:bg-opacity-80 backdrop:backdrop-blur backdrop:bg-black
                 bg-gradient-to-tr from-blue-800 to-blue-700 lg:max-w-4xl
                 cursor-default rounded min-w-[50%]'
    >
      <div className='mb-4 pb-2 flex justify-between text-2xl lg:text-3xl text-center border-b-white border-b-2'>
        How&nbsp;To Play:
        <button
          className='pl-8 sm:pl-0'
          onClick={() => {
            console.log('clicked');
            setIsOpen(false);
            dialogRef?.current?.close();
          }}
        >
          <FaTimes className='hover:text-gray-400 transition-colors' />
        </button>
      </div>
      <div className='py-1 overflow-x-auto max-w-full'>{children}</div>
    </dialog>
  );
}
