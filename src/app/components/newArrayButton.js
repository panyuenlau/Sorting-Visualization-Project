import React from "react";
import { Component } from "react";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";

const marks = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 200,
    label: "200",
  },
];

export default class NewArrayButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      maxWidth: "sm",
    };
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { open, maxWidth } = this.state;
    const { value, setArraySize, resetArray } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.handleClickOpen()}
        >
          {" "}
          New Array{" "}
        </Button>

        <Dialog
          fullWidth={true}
          maxWidth={maxWidth}
          open={open}
          onClose={() => this.handleClose()}
        >
          <DialogTitle>{"New Array Size"}</DialogTitle>

          <DialogContent className="slider-container">
            <Slider
              marks={marks}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              value={value}
              onChange={setArraySize}
              min={10}
              max={200}
            ></Slider>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                this.handleClose();
                resetArray();
              }}
            >
              Generate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
