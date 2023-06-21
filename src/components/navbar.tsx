import { names, routes } from '@/globals/constants';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/Io';

type LinkProps = {
  href: string;
  className?: string;
  children?: React.ReactNode;
};

function NavLink({ href, className, children }: LinkProps) {
  return (
    <Link
      href={href}
      className={`hover:text-yellow-400 transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className='p-2 flex justify-between'>
      <Link href={'/'} className='flex gap-1'>
        <span className='text-xl'>{names.siteName}</span>
        <IoLogoGameControllerB className='fill-yellow-400 text-xl' />
      </Link>
      <span className='flex gap-2'>
        <NavLink href={routes.about}>About</NavLink>
        <NavLink href={routes.jeoparty}>Jeoparty</NavLink>
      </span>
      <ul className='hover:cursor-not-allowed tooltip-aftr after:content-["in_development..."] after:whitespace-nowrap after:-translate-x-full after:rounded-tr-none'>
        <FaBars className='text-2xl px-1' />
      </ul>
    </nav>
  );
}
