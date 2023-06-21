'use client';
import CategorySquare from './category-square';
import GameSquare from './game-square';
import { JeopardyCategory, JeopardyClue, SQUARESTATE } from './types';
import ClueDialog from './clue-dialog';
import React, { useState } from 'react';
import StatPanel from './stat-panel';

type Props = {
  categories: JeopardyCategory[];
};

export default function GameBoard({ categories }: Props) {
  const [states, setstates] = useState<{
    [key: string]: { state: SQUARESTATE; guesses: boolean[] };
  }>({});
  const [currentClue, setCurrentClue] = useState<{
    id: string;
    clue: JeopardyClue;
  } | null>(null);
  function openDialog(id: string, clue: JeopardyClue) {
    setCurrentClue({
      id,
      clue,
    });
  }

  function setSquareState(correct: boolean[]) {
    if (!currentClue) return;
    setstates(prevStates => ({
      ...prevStates,
      [currentClue.id]: {
        state: correct?.some(guess => guess)
          ? SQUARESTATE.Right
          : SQUARESTATE.Wrong,
        guesses: correct,
      },
    }));
    setCurrentClue(null);
  }

  return (
    <div className='m-4 flex flex-col'>
      <StatPanel />
      <div className='overflow-x-auto overflow-y-hidden'>
        <div className='min-w-[50rem] grid grid-flow-col grid-cols-6 grid-rows-6 gap-4'>
          {categories.map(category => {
            return (
              <React.Fragment key={category.id}>
                <CategorySquare title={category.title} />
                {category.clues.map(clue => {
                  const id = `${category.id}-${clue.id}`;
                  return (
                    <GameSquare
                      key={id}
                      clue={clue}
                      state={states[id]?.state ?? SQUARESTATE.Unplayed}
                      guesses={states[id]?.guesses}
                      openDialog={() => openDialog(id, clue)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {currentClue && (
        <ClueDialog
          open={currentClue ? true : false}
          setSquareState={setSquareState}
          clue={currentClue.clue}
        />
      )}
    </div>
  );
}
