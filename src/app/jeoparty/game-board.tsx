'use client';
import CategorySquare from './category-square';
import GameSquare from './game-square';
import { JeopardyCategory, JeopardyClue, SQUARESTATE } from './types';
import ClueDialog from './clue-dialog';
import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import StatPanel from './stat-panel';

type Props = {
  categories: JeopardyCategory[];
};

export default function GameBoard({ categories }: Props) {
  const [states, setstates] = useState<{
    [key: string]: SQUARESTATE;
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

  function setSquareState(correct: boolean) {
    if (!currentClue) return;
    setstates(prevStates => ({
      ...prevStates,
      [currentClue.id]: SQUARESTATE.Wrong,
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
                      state={states[id] ?? SQUARESTATE.Unplayed}
                      openDialog={() => openDialog(id, clue)}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <ClueDialog
        open={currentClue ? true : false}
        setSquareState={setSquareState}
        clue={currentClue?.clue}
      />
    </div>
  );
}
