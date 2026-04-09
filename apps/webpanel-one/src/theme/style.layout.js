export const breakpoints = {
  phone: 767,
  tablet: 1024,
  desktop: 1599,
};

export const respondTo = {
  smOnly: `@media only screen and (max-width: ${breakpoints.phone}px)`,
  smUp: `@media only screen and (min-width: ${breakpoints.phone + 1}px)`,
  mdUp: `@media only screen and (min-width: ${breakpoints.tablet + 1}px)`,
  mdDown: `@media only screen and (max-width: ${breakpoints.tablet}px)`,
  lgUp: `@media only screen and (min-width: ${breakpoints.desktop + 1}px)`,
  lgDown: `@media only screen and (max-width: ${breakpoints.desktop}px)`,
  screenDown: (sizeInPixel) =>
    `@media only screen and (max-width: ${sizeInPixel}px)`,
  screenUp: (sizeInPixel) =>
    `@media only screen and (min-width: ${sizeInPixel}px)`,
  screenRange: (sizeInPixelL, sizeInPixelH) =>
    `@media only screen and (min-width: ${sizeInPixelL}px) and (max-width: ${sizeInPixelH}px)`,
  screenHight: (sizeInPixel) =>
    `@media only screen and (max-height: ${sizeInPixel}px)`,
};
