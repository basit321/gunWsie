import { PixelRatio, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const WidthRatio = SCREEN_WIDTH / 375; /// width Screen of figma File //
const HeightRatio = SCREEN_HEIGHT / 812; /// height Screen of figma File //

const wp = (width) => {
  return PixelRatio.roundToNearestPixel(width * WidthRatio); ///  get with of view //
};

const hp = (height) => {
  return PixelRatio.roundToNearestPixel(height * HeightRatio); ///  get height of view //
};

const rfs = (fontSize) => {
  ///  get font size of text //
  return hp(fontSize);
};

export { hp, wp, rfs, SCREEN_WIDTH, SCREEN_HEIGHT };
