import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
});

class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: this.props.valueFromParent,
    };
  }

  static componentWillReceiveProps(props) {
    return {
      files: this.props.valueFromParent,
    };
  }

  handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      this.setState((state) => ({
        files: allfiles,
      }));
    }
    e.preventDefault();
    this.props.uploadedImages(allfiles);
  };

  isObject(variable) {
    return typeof variable === "object" && variable !== null;
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <input
          accept="image/*, video/mp4"
          className={classes.input}
          id="icon-button-file"
          type="file"
          multiple
          onChange={this.handlerFile.bind(this)}
        />
        <label htmlFor="icon-button-file">
          Choose images:
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {this.state.files.map((file, key) => {
          return (
            <div key={key}>
              <img
                style={{
                  float: "left",
                  width: "300px",
                  height: "auto",
                  marginLeft: "70px",
                }}
                src={this.isObject(file) ? URL.createObjectURL(file) : file}
                alt={this.isObject(file) ? file.name : ""}
                class="img-thumbnail"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(UploadImages);
