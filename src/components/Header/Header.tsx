import { makeStyles, Container, Link as LinkNative } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  className?: string;
}

const useStyles = makeStyles(({ spacing, typography, palette, breakpoints }) => ({
  root: {
    paddingTop: spacing(3.25),
    paddingBottom: spacing(3.25),
  },
  logo: {
    flex: '0 0 135px',
    maxWidth: 135,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    marginLeft: 'auto',
    [breakpoints.down('md')]: {
      display: 'none',
    }
  },
  navItem: {
    padding: spacing(2),
    textDecoration: 'none',
    fontSize: typography.pxToRem(18),
    color: palette.common.black,
    '&:hover': {
      color: palette.primary.main,
    },
  },
}));

const LINKS = [
  {
    _id: '1',
    label: 'Home',
    href: '/',
  },
  {
    _id: '2',
    label: 'Bags',
    href: '/testing',
  },
  {
    _id: '3',
    label: 'SNEAKERS',
    href: '/?a=1232',
  },
  {
    _id: '4',
    label: 'BELT',
    href: '/?a=12322',
  },
  {
    _id: '5',
    label: 'CONTACT',
    href: '/?a=1232322',
  },
];

const Header: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.content}>
          <div className={classes.logo}>
            <Link href="/" passHref>
              <a>
                <Image
                  layout="responsive"
                  width="135px"
                  height="44px"
                  src="/logo.png"
                  sizes="100vw"
                  alt="logo"
                />
              </a>
            </Link>
          </div>
          <nav className={classes.nav}>
            {LINKS.map(({ _id, href, label }) => (
              <Link key={_id} href={href} passHref>
                <LinkNative className={classes.navItem}>
                  {label.toUpperCase()}
                </LinkNative>
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
