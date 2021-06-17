import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import { Product } from "src/types/sanity-data";
import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import client from "sanity/client";
import Img from "next/image";
import omit from "lodash/omit";
import get from "lodash/get";

interface Props extends Product {
  className?: string;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    border: "2px solid #F6F6F6",
    borderRadius: spacing(0.5),
  },
  info: {
    padding: spacing(1.5),
    textAlign: "center",
  },
  title: {
    color: "#223263",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "27px",
  },
  price: {
    color: "#40BFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  salePrice: {
    color: "#9098B1",
    fontWeight: "bold",
    fontSize: 14,
    textDecoration: "line-through",
  },
  percent: {
    color: "#FB7181",
    fontWeight: "bold",
    fontSize: 14,
  },
}));

const ProductItem: React.FC<Props> = ({ title, price, salePrice, images }) => {
  const image = { ...images[0] };
  const imageProps = useNextSanityImage(client, omit(image));
  const classes = useStyles();
  const blurURL = get(image, "asset.metadata.lqip", "");

  return (
    <div className={classes.root}>
      <div style={{ position: "relative", paddingTop: "90%" }}>
        <Img
          src={imageProps.src}
          loader={imageProps.loader}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 600px): 100vw, 600px"
          placeholder="blur"
          blurDataURL={blurURL}
        />
      </div>
      <div className={classes.info}>
        <Typography className={classes.title}>{title}</Typography>
        <Typography>
          <span className={classes.price}>{price}$</span>{" "}
          {salePrice && (
            <>
              <span className={classes.salePrice}>{salePrice}$</span>{" "}
              <span className={classes.percent}>
                {Math.round((salePrice / price) * 100)}%
              </span>
            </>
          )}
        </Typography>
      </div>
    </div>
  );
};

export default ProductItem;
