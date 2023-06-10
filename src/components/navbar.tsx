import { names } from '@/globals/names';
import { swiftTooltip } from '@/globals/swiftBuilders';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/Io';

export default function Navbar() {
  return (
    <nav className='p-2 flex justify-between'>
      <Link href={'/'} className='flex gap-1'>
        <span className='text-xl'>{names.siteName}</span>
        <IoLogoGameControllerB className='fill-yellow-400 self-center text-xl' />
      </Link>
      <span>
        <Link href={'/jeoparty'}>Jeoparty</Link>
      </span>
      <ul
        className={`hover:cursor-not-allowed ${swiftTooltip} after:content-['in_development...'] after:whitespace-nowrap after:-translate-x-full after:rounded-tr-none`}
      >
        <FaBars className='text-2xl px-1' />
      </ul>
    </nav>
  );
}
