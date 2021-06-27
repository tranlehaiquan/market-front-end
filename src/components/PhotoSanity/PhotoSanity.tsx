import { useNextSanityImage } from 'next-sanity-image';
import React from 'react';
import get from 'lodash/get';
import { SanityPhoto } from 'src/types/sanity-data';
import client from 'sanity/client';
import Image, { ImageProps } from 'next/image';

type PhotoSanityProps = {
  className?: string;
  image?: SanityPhoto;
} & Omit<ImageProps, 'src'>;

const PhotoSanity: React.FC<PhotoSanityProps> = ({
  image,
  className,
  placeholder = 'blur',
  layout,
  ...rest
}) => {
  const imageProps = useNextSanityImage(client, { ...image });
  const blurDataURL = get(image, 'asset.metadata.lqip', '');

  if (layout === 'intrinsic' || layout === 'fixed') {
    return (
      <Image
        {...imageProps}
        placeholder={'blur'}
        blurDataURL={blurDataURL}
        layout={layout}
        sizes={rest.sizes}
        alt={rest.alt}
      />
    );
  }

  if (layout === 'fill') {
    return (
      <Image
        src={imageProps.src}
        loader={imageProps.loader}
        layout="fill"
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes={rest.sizes}
        objectFit={rest.objectFit}
        alt={rest.alt}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      layout="responsive"
      sizes={rest.sizes}
      placeholder="blur"
      blurDataURL={blurDataURL}
      alt={rest.alt}
    />
  );
};

export default PhotoSanity;
