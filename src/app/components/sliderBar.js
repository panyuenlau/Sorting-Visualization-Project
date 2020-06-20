import { withStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';

export const SliderBar = withStyles({
    root: {
      color: '#b30086',
      height: 5,
      width: '40%',
    },
    thumb: {
      height: 15,
      width: 15,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -4,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 5,
      borderRadius: 4,
    },
    rail: {
      height: 5,
      borderRadius: 4,
    },
})(Slider);
