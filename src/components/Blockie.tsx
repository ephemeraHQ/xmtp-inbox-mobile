/* eslint-disable no-bitwise */
import React, {FC, useMemo} from 'react';
import Svg, {Circle, ClipPath, Defs, Rect} from 'react-native-svg';

interface BlockieProps {
  address: string;
  size: number;
}
interface Options {
  seed: string;
  size: number;
  scale: number;
  color: string;
  bgcolor: string;
  spotcolor: string;
}
const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed: string) {
  for (var i = 0; i < randseed.length; i++) {
    randseed[i] = 0;
  }
  for (var i = 0; i < seed.length; i++) {
    randseed[i % 4] =
      (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
  }
}

export function buildBlockieOpts(opts: Partial<Options>): Options {
  var newOpts: Partial<Options> = {};

  newOpts.seed =
    opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16);

  seedrand(newOpts.seed);

  newOpts.size = opts.size || 8;
  newOpts.scale = opts.scale || 4;
  newOpts.color = opts.color || createColor();
  newOpts.bgcolor = opts.bgcolor || createColor();
  newOpts.spotcolor = opts.spotcolor || createColor();

  return newOpts as Options;
}

function rand(): number {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  var t = randseed[0] ^ (randseed[0] << 11);

  randseed[0] = randseed[1];
  randseed[1] = randseed[2];
  randseed[2] = randseed[3];
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
}

function createColor(): string {
  //saturation is the whole color spectrum
  var h = Math.floor(rand() * 360);
  //saturation goes from 40 to 100, it avoids greyish colors
  var s = rand() * 60 + 40 + '%';
  //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  var l = (rand() + rand() + rand() + rand()) * 25 + '%';

  var color = 'hsl(' + h + ',' + s + ',' + l + ')';
  return color;
}

function createImageData(size: number): number[] {
  const width = size; // Only support square icons for now
  const height = size;

  const dataWidth = Math.ceil(width / 2);
  const mirrorWidth = width - dataWidth;

  const data = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand() * 2.3);
    }
    const r = row.slice(0, mirrorWidth);
    r.reverse();
    row = row.concat(r);

    for (var i = 0; i < row.length; i++) {
      data.push(row[i]);
    }
  }

  return data;
}

export const Blockie: FC<BlockieProps> = ({address, size: propSize}) => {
  const {size, scale, bgcolor, color, spotcolor} = useMemo(() => {
    return buildBlockieOpts({
      seed: address.toLocaleLowerCase(),
      size: propSize,
    });
  }, [address, propSize]);

  const imageData = useMemo(() => {
    return createImageData(size);
  }, [size]);

  const radius = (size * scale) / 2;
  return (
    <Svg height={size * scale} width={size * scale} fill={bgcolor}>
      <Defs>
        <ClipPath id="clip">
          <Circle r={radius} cx={radius} cy={radius} />
        </ClipPath>
      </Defs>
      {imageData.map((pixel, index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const fill = pixel === 1 ? color : spotcolor;
        return (
          <Rect
            key={index}
            x={col * scale}
            y={row * scale}
            width={scale}
            height={scale}
            fill={fill}
            clipPath="url(#clip)"
          />
        );
      })}
    </Svg>
  );
};
