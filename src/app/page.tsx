import { links, routes } from '@/globals/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

const refs = {
  jeoparty: 'jeoparty',
};

function NavLink({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        'text-yellow-100 hover:text-yellow-400 hover:underline transition-colors' +
        ` ${className}`
      }
      target={external ? '_blank' : '_self'}
    >
      {children}
      {external && (
        <FaExternalLinkAlt className='ml-1 inline opacity-50 text-xs' />
      )}
    </Link>
  );
}

function GameSection({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={title} className='w-full max-w-screen-lg'>
      <h2 className='text-2xl md:text-3xl my-4 first-letter:capitalize'>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-6 gap-6 text-lg md:text-xl'>
      <section className='flex flex-col gap-4 max-w-screen-lg'>
        <h1 className='text-3xl md:text-4xl my-4'>
          Play games online and remotely!
        </h1>
        <p className='indent-4'>
          Remote games is a hobby website designed to host the various games I
          make as they are developed. It is made with NextJS, Tailwind, and
          Prisma. Since this is just a small and free project hosted on Vercel,
          it is not intended for mass traffic or usage. Feel free to{' '}
          <NavLink href={routes.contact}>contact me</NavLink> with
          bugs/comments/ideas/etc.
        </p>
        <h3 className='text-xl md:text-2xl'>
          Learn more about the games below:
        </h3>
        <ul className='list-outside list-disc ml-6'>
          <li>
            <NavLink href={'#' + refs.jeoparty}>Jeoparty</NavLink>
          </li>
        </ul>
      </section>
      <GameSection title={refs.jeoparty}>
        <figure className='float-right md:ml-4 pb-4 md:pb-0 text-center'>
          <Image
            src='/jeoparty.png'
            height={300}
            width={400}
            alt='Picture of the Jeoparty game board'
          />
          <figcaption className='hidden md:inline text-base italic'>
            Jeoparty gameboard
          </figcaption>
        </figure>
        <p className='indent-4'>
          Jeoparty is a mimic of Jeopardy adapted to a single player web format.
          The clues come from{' '}
          <NavLink href={links.jservice} external>
            jService.io
          </NavLink>
          . In the future I hope to have gameboard sharing, remote multiplayer,
          and personally made clues.
        </p>
      </GameSection>
    </main>
  );
}
