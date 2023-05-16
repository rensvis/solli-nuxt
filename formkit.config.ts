import { generateClasses } from "@formkit/themes";
// import { arrowDown, arrowUp, check, circle, close, down, fileDoc, spinner, star, trash, date, left, right, } from "@formkit/icons"
import theme from "./formkit/theme";

const config = {
  config: {
    // pass our theme object to generateClasses
    classes: generateClasses(theme),
  },
  iconLoaderUrl: (iconName: string) =>
    `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/${iconName}.svg`,

  // icons: {
  //   // include supporting icons from @formkit/icons
  //   arrowDown,
  //   arrowUp,
  //   close,
  //   checkboxDecorator: check,
  //   fileItem: fileDoc,
  //   fileRemove: close,
  //   noFiles: fileDoc,
  //   radioDecorator: circle,
  //   select: down,
  //   spinner,
  //   star,
  //   trash,
  //   date,
  //   left,
  //   right,
  // }
};

export default config;
