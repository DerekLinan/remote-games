import { FaShareAlt } from 'react-icons/fa';

const columnStyles = 'flex flex-col flex-grow basis-0';
const specialFont =
  'font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200';

export default function StatPanel() {
  return (
    <div className='sticky gap-2 top-2 left-2 right-2 my-4 backdrop-blur backdrop-brightness-[.25] p-4 flex justify-between text-xl lg:text-2xl'>
      <div className={`${columnStyles} align-middle text-center`}>
        <div>Share this game board: </div>

        <button className='group self-center w-24 rounded flex gap-2 p-2 justify-center bg-gradient-to-br from-blue-800 to-blue-700 hover:from-yellow-800 hover:to-yellow-400 focus:bg-gradient-to-br focus:ring-2 focus:ring-white focus:ring-inset'>
          <FaShareAlt className='text-yellow-300 group-hover:text-black' />
        </button>
      </div>
      <div className={`${columnStyles} text-center`}>
        <div>Total Score</div>
        <div className={`${specialFont} text-4xl lg:text-5xl`}>300</div>
      </div>
      <div className={columnStyles}>
        <div>
          Right: <span className={specialFont}>1</span>
        </div>
        <div>
          Wrong: <span className={specialFont}>9</span>
        </div>
        <div>
          Accuracy: <span className={specialFont}>10%</span>
        </div>
      </div>
    </div>
  );
}
