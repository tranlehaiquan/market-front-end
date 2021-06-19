import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

interface Props {
  className?: string;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    textAlign: 'center',
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    backgroundColor: palette.grey[100],
  },
}));

const Footer: React.FC<Props> = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.root}>
        <Container>
          <Typography>@Copyright Quan Tran</Typography>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
