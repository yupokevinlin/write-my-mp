import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import Typography from "@material-ui/core/Typography";

export type LoadingPageProps = LoadingPageDataProps & LoadingPageStyleProps & LoadingPageEventProps;

export interface LoadingPageDataProps {
  text?: string;
}

export interface LoadingPageStyleProps {
  width: Breakpoint;
}

export interface LoadingPageEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingPage: {
      position: "absolute",
      left: 0,
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      zIndex: theme.zIndex.tooltip + 100,
      height: "100%",
      top: 0,
    },
    text: {
      marginBottom: "50px",
    },
    progress: {
      color: "#d61820",
    },
  }),
);

const LoadingPage: React.FC<LoadingPageProps> = (props) => {
  const classes = useStyles();

  const {
    width,
    text,
  } = props;

  const isXs: boolean = /xs/.test(width);
  const isSm: boolean = /sm/.test(width);
  const isMd: boolean = /md/.test(width);
  const size: number = isXs ? 50 : isSm ? 60 : isMd ? 70 : 80;

  if (!!text) {
    return (
      <div className={classes.loadingPage}>
        <Typography className={classes.text} variant={"h5"}>
          {
            text
          }
        </Typography>
        <CircularProgress className={classes.progress} size={size} disableShrink/>
      </div>
    );
  } else {
    return (
      <div className={classes.loadingPage}>
        <CircularProgress className={classes.progress} size={size} disableShrink/>
      </div>
    );
  }
};

export default LoadingPage;

