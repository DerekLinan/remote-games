'use client';
import { names, routes } from '@/globals/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars } from 'react-icons/fa';
import { IoLogoGameControllerB } from 'react-icons/io';

type LinkProps = {
  href: string;
  children?: React.ReactNode;
};

function NavLink({ href, children }: LinkProps) {
  const path = usePathname();

  if ((href === '/' && path == href) || (href !== '/' && path.startsWith(href)))
    return (
      <span className='text-yellow-400 underline underline-offset-8 decoration-sky-500'>
        {children}
      </span>
    );

  return (
    <Link href={href} className={`hover:text-yellow-400 transition-colors`}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav>
      <div className='pb-1 bg-gradient-to-r from-red-600 via-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
        <div className='bg-black p-4 text-xl flex justify-between'>
          <Link href='/' className='flex flex-shrink-0 gap-1'>
            <span className='text-2xl'>{names.siteName}</span>
            <IoLogoGameControllerB className='fill-yellow-400 text-xl' />
          </Link>
          <ul className='gap-2 hidden [@media(min-width:384px)]:flex'>
            <NavLink href='/'>About</NavLink>
            <NavLink href={routes.jeoparty}>Jeoparty</NavLink>
          </ul>
          <ul className='hover:cursor-not-allowed tooltip-aftr after:content-["in_development..."] after:whitespace-nowrap after:-translate-x-full after:rounded-tr-none'>
            <FaBars className='text-2xl px-1' />
          </ul>
        </div>
      </div>
    </nav>
  );
}
