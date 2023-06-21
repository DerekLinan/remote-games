export default function CategorySquare({ title }: { title: string }) {
  let fontSize = 'text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl';

  return (
    <div
      className={`${fontSize} p-2 flex justify-center bg-gradient-to-tr from-blue-950 to-gray-900 selection:bg-yellow-600`}
    >
      <p className='my-auto text-center uppercase font-extrabold'>{title}</p>
    </div>
  );
}
