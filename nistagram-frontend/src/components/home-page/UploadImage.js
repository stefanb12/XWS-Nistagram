import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function UploadImage(props) {
  const classes = useStyles();
  const [files, setFile] = useState([]);

  const handlerFile = (e) => {
    let allfiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      allfiles.push(e.target.files[i]);
    }
    if (allfiles.length > 0) {
      setFile(allfiles);
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        multiple
        onChange={handlerFile}
      />
      <label htmlFor="icon-button-file" style={{ marginLeft: "150px" }}>
        Choose images:
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {files.map((file, key) => {
        return (
          <div key={key}>
            <img
              style={{
                float: "left",
                width: "300px",
                height: "auto",
                marginLeft: "70px",
              }}
              src={URL.createObjectURL(file)}
              alt={file.name}
              class="img-thumbnail"
            />
          </div>
        );
      })}
    </div>
  );
}
