import React from 'react'
import {
  Checkbox,
  Fab,
  Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, withStyles } from '@material-ui/core/styles'

const greenColor = "#0cca98";
const darkGreen = "#0fa37c";
const redColor = "#f5564e";
const darkRed = "#dd4747";
const whiteColor = "#f6f6f6";
const blueColor = "#0278ae";
const darkBlue = "#28518a";



//Customized components
const GreenCheckbox = withStyles({
  root: {
    color: darkGreen,
    '&$checked': {
      color: darkGreen,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const AddButton = withStyles({
  root: {
    border: 'none',
    backgroundColor: greenColor,
    color: whiteColor,
    '&:hover': {
      backgroundColor: whiteColor,
      color: greenColor
    },
  }
})(Fab);

const OkButton = withStyles({
  root: {
    backgroundColor: greenColor,
    color: whiteColor,
    '&:hover': {
      background: darkGreen
    }
  }
})(Fab);

const CancelButton = withStyles({
  root: {
    backgroundColor: redColor,
    color: whiteColor,
    '&:hover': {
      background: darkRed
    }
  }
})(Fab);

const EditCheckedButton = withStyles({
  root: {
    border: 'none',
    backgroundColor: blueColor,
    color: whiteColor,
    '&:hover': {
      backgroundColor: darkBlue,
    },
  }
})(Fab);

const EditUncheckedButton = withStyles({
  root: {
    border: 'none',
    backgroundColor: greenColor,
    color: whiteColor,
    '&:hover': {
      backgroundColor: darkGreen,
    },
  }
})(Fab);

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResponseMessage = ({ type, content, openStatus, handleClose }) => {
  return (
    <Snackbar
      open={ openStatus }
      autoHideDuration={ 4000 }
      onClose={ handleClose }
    >
      <Alert onClose={ handleClose } severity={ type } >
        { content }
      </Alert>
    </Snackbar>
  )
}

//Apply styles for components
const useMarkCheckboxStyles = makeStyles({
  label: {
    fontSize: "0.9rem",
    paddingLeft: "1rem",
    color: darkGreen
  }
});

const useBlankCheckboxStyles = makeStyles({
  label: {
    fontSize: "0.9rem",
    paddingLeft: "1rem",
    color: blueColor
  }
});

const checkedStyle = {
  textDecoration: "line-through",
  color: darkGreen,
  fontWeight:"bolder",
  overflowWrap: "break-word",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}

const uncheckedStyle = {
  color: blueColor,
  fontWeight:"bolder",
  overflowWrap: "break-word",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}

export {
  GreenCheckbox,
  AddButton,
  CancelButton,
  OkButton,
  EditCheckedButton,
  EditUncheckedButton,
  ResponseMessage,
  useMarkCheckboxStyles,
  useBlankCheckboxStyles,
  checkedStyle,
  uncheckedStyle,
}