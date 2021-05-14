import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop"

export type LoadingPageTransparentProps = LoadingPageTransparentDataProps & LoadingPageTransparentStyleProps & LoadingPageTransparentEventProps;

export interface LoadingPageTransparentDataProps {
  isLoading: boolean;
}

export interface LoadingPageTransparentStyleProps {

}

export interface LoadingPageTransparentEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: 1,
      position: "relative",
      top: "-100%",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    progress: {
      color: theme.palette.background.paper,
    }
  }),
);

const LoadingPageTransparent: React.FC<LoadingPageTransparentProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isLoading,
  } = props;

  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress className={classes.progress}/>
    </Backdrop>
  );
};

export default LoadingPageTransparent;

