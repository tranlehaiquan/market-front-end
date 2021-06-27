import { makeStyles, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import clsx from 'clsx';

const RATING = [1, 2, 3, 4, 5] as const;

interface Props {
  className?: string;
  ratingAvg: typeof RATING[number];
  ratingTotal: number;
}

const useStyles = makeStyles(({ spacing, palette }) => ({
  star: {
    color: palette.grey[400],
  },
  ratingAct: {
    color: '#FFC600',
  },
  rating: {
    display: 'flex',
  },
  stars: {
    marginRight: spacing(1),
  },
}));

const Rating: React.FC<Props> = ({ className, ratingAvg, ratingTotal }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.rating}>
        <div className={classes.stars}>
          {RATING.map((i, idx) => (
            <StarIcon
              key={idx}
              className={clsx(
                classes.star,
                ratingAvg >= ratingAvg && classes.ratingAct
              )}
            />
          ))}
        </div>
        <Typography>{ratingTotal} reviews</Typography>
      </div>
    </div>
  );
};

export default Rating;
