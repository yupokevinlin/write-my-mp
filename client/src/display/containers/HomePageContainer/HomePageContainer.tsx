import React, {useEffect} from "react";
import {createStyles, Theme, useTheme, withWidth} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import HomePage from "../../pages/HomePage";
import {AppActionTypes, AppState} from "../../../state/global/App/types";
import {Store} from "../../../state/store";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {AppAction} from "../../../state/global/App/actions";
import LoadingPage from "../../pages/statelessPages/LoadingPage";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

export type HomePageContainerProps = HomePageContainerDataProps & HomePageContainerStyleProps & HomePageContainerEventProps;

export interface HomePageContainerDataProps {

}

export interface HomePageContainerStyleProps {
  width: Breakpoint;
}

export interface HomePageContainerEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  }),
);

const HomePageContainer: React.FC<HomePageContainerProps> = (props) => {
  const appState: AppState = useSelector<Store, AppState>(store => store.app, shallowEqual);
  const appDispatch: Dispatch<AppAction> = useDispatch<Dispatch<AppAction>>();

  const theme: Theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    appDispatch({
      type: AppActionTypes.INIT,
    });
  }, []);

  const {
    width,
  } = props;

  if (appState.isInitComplete) {
    return (
      <HomePage mapPolygons={appState.mapPolygons}/>
    );
  } else {
    return (
      <LoadingPage width={width} text={"Loading data... Please wait."}/>
    )
  }
};

export default withWidth()(HomePageContainer);

