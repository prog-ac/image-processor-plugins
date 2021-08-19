"use strict";

exports.default = (args, srcBuffer, srcMetadata) => {
  const dstBuffer = Buffer.alloc(
    srcMetadata.width * srcMetadata.height * srcMetadata.channels
  );
  const dstMetaData = Object.assign({}, srcMetadata);
  const size = Number(args["-s"]);

  for (let y = 0; y < srcMetadata.height; y++) {
    for (let x = 0; x < srcMetadata.width; x++) {
      let count = 0;
      let ar = 0,
        ag = 0,
        ab = 0,
        aa = 0;
      for (let yy = y - size; yy <= y + size; yy++) {
        for (let xx = x - size; xx <= x + size; xx++) {
          if (
            xx >= 0 &&
            yy >= 0 &&
            xx < srcMetadata.width &&
            yy < srcMetadata.height
          ) {
            count++;
            const index = (yy * srcMetadata.width + xx) * srcMetadata.channels;
            ar += srcBuffer[index + 0];
            ag += srcBuffer[index + 1];
            ab += srcBuffer[index + 2];
            aa += srcBuffer[index + 3];
          }
        }
      }
      const index = (y * srcMetadata.width + x) * srcMetadata.channels;
      dstBuffer[index + 0] = ar / count;
      dstBuffer[index + 1] = ag / count;
      dstBuffer[index + 2] = ab / count;
      dstBuffer[index + 3] = aa / count;
    }
  }
  return {
    buffer: dstBuffer,
    width: srcMetadata.width,
    height: srcMetadata.height,
    channels: srcMetadata.channels,
  };
};
