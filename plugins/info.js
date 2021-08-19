"use strict";

exports.default = (args, srcBuffer, srcMetadata) => {
  console.log(
    `width:${srcMetadata.width}, height:${srcMetadata.height}, channels:${srcMetadata.channels}`
  );
  return undefined;
};
