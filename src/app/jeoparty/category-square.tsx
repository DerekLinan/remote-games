import { jeopartyConsts } from './constants';

export default function CategorySquare({
  title,
  disclaimer,
}: {
  title: string;
  disclaimer?: boolean;
}) {
  let fontSize = 'text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl';

  return (
    <div
      className={`${fontSize} relative group p-2 flex justify-center bg-gradient-to-tr from-blue-950 to-gray-900 selection:bg-yellow-600`}
    >
      <p className='my-auto text-center uppercase font-extrabold'>
        {title}
        {disclaimer && (
          <span className='bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-yellow-200'>
            *
          </span>
        )}
      </p>
      <div className='absolute flex-col items-center hidden mb-6 group-hover:flex'>
        <span className='relative translate-y-1/2 p-2 text-sm md:text-base leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md'>
          <div className='absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 -mb-2 rotate-45 bg-gray-600'></div>
          {jeopartyConsts.disclaimer}
        </span>
      </div>
    </div>
  );
}
