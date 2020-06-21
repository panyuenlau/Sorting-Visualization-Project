const ORIGINAL_COLOR = "#00bcd4";
const COMPARING_COLOR = "red";
const MAX_ANIMATION_MS = 100;

export const playAnimations = (
  animations,
  sortedArray,
  callback,
  animationSpeed,
  timerIds
) => {
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName("array-bar");
    const isComparing =
      animations[i][0] === "compare1" || animations[i][0] === "compare2";

    if (isComparing) {
      const color =
        animations[i][0] === "compare1" ? COMPARING_COLOR : ORIGINAL_COLOR;

      const [, barOneInx, barTwoInx] = animations[i];

      const barOneStyle = arrayBars[barOneInx].style;
      const barTwoStyle = arrayBars[barTwoInx].style;

      let t = setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;

        if (i === animations.length - 1) callback(sortedArray);
      }, i * (MAX_ANIMATION_MS + 1 - animationSpeed));

      timerIds.push(t);
    } else {
      let t = setTimeout(() => {
        const [, barInx, barHeight] = animations[i];

        const barStyle = arrayBars[barInx].style;
        barStyle.height = `${barHeight * 0.1}vh`;

        if (i === animations.length - 1) callback(sortedArray);
      }, i * (MAX_ANIMATION_MS + 1 - animationSpeed));

      timerIds.push(t);
    }
  }
};
