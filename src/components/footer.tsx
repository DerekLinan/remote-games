import { links, names, routes } from '@/globals/constants';
import Link from 'next/link';
import { IoLogoGameControllerB } from 'react-icons/Io';
import {
  FaFolder,
  FaGithub,
  FaLinkedin,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const iconStyle = 'text-xl';

type ColumnProps = {
  children?: React.ReactNode;
};

type LinkProps = {
  link: string;
  children?: React.ReactNode;
  notExternal?: Boolean;
};

function Column({ children }: ColumnProps) {
  return <span className='flex flex-col gap-1 items-center'>{children}</span>;
}

function FooterLink({ children, link, notExternal }: LinkProps) {
  return (
    <Link
      href={link}
      className='flex gap-1 text-yellow-100 hover:text-yellow-400 group/link transition-colors'
      target={notExternal ? '_self' : '_blank'}
      {...(notExternal ? undefined : { rel: 'noopener noreferrer' })}
    >
      {children}
      {!notExternal && (
        <FaExternalLinkAlt className='opacity-50 text-xs group-hover/link:text-sm' />
      )}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className='p-2 pb-10 flex flex-col sm:flex-row justify-around'>
      <Column>
        <span className='flex text-xl gap-1'>
          {names.siteName}
          <IoLogoGameControllerB className='fill-yellow-400 text-xl' />
        </span>
        <FooterLink link={routes.about} notExternal>
          About
        </FooterLink>
      </Column>
      <Column>
        <FooterLink link={links.projectGitHub}>Source Code</FooterLink>
      </Column>
      <Column>
        <p>By Derek Linan, 2023</p>
        <div className='flex gap-1 hover:cursor-not-allowed tooltip-aftr after:content-["in_development..."] after:whitespace-nowrap after:-translate-x-full after:-translate-y-1'>
          <FaFolder className={iconStyle} />
          Portfolio
        </div>
        <FooterLink link={links.linkedIn}>
          <FaLinkedin className={iconStyle} />
          LinkedIn
        </FooterLink>
        <FooterLink link={links.myGitHub}>
          <FaGithub className={iconStyle} />
          GitHub
        </FooterLink>
      </Column>
    </footer>
  );
}
