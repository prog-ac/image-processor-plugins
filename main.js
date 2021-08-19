"use strict";

const sharp = require("sharp");
const parseArgs = (args) => {
  const ret = {};
  for (let arg of args) {
    if (arg.indexOf("-") === 0 && args.length > args.indexOf(arg) + 1) {
      ret[arg] = args[args.indexOf(arg) + 1];
    }
  }
  return ret;
};
async function main() {
  try {
    // コマンドがあるかをチェック
    if (process.argv < 3) {
      console.error("No command or No source image error.");
      return -1;
    }
    // コマンドライン引数をパース
    const args = parseArgs(process.argv);
    // 元イメージの読みこみ
    const src = sharp(process.argv[2]);
    const srcBuffer = await src.raw().toBuffer();
    const srcMetadata = await src.metadata();

    // pluginの読み込み＆実行
    const plugin = require(`./plugins/${process.argv[3]}`);
    const result = plugin.default(args, srcBuffer, srcMetadata);
    // 出力
    if (
      result &&
      result.width * result.height * result.channels &&
      result.buffer &&
      args["-o"]
    ) {
      await sharp(result.buffer, {
        raw: {
          width: result.width,
          height: result.height,
          channels: result.channels,
        },
      }).toFile(args["-o"]);
    }
  } catch (err) {
    console.error(err);
  }
}
main();
