import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

interface Props {
  className?: string;
}

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {},
  banner: {
    height: 700,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('md')]: {
      height: 300,
    }
  },
  content: {
    position: 'relative',
    zIndex: 1,
    color: palette.common.white,
    fontWeight: 'bold',
  },
}));

const Banner: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.banner}>
        <Image
          placeholder="blur"
          blurDataURL="/banner-blur.png"
          src="/banner.png"
          layout="fill"
          objectFit="cover"
          sizes="100vw"
          alt="banner"
        />
        <Container>
          <Typography variant="h3" component="h2" className={classes.content}>
            Super Flash <br /> Sale 50% Off
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
