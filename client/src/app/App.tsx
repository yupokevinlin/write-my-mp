import React, {useEffect} from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {Provider} from "react-redux";
import {configureStore} from "../state/store";
import {makeStyles} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import {ThemeProvider} from "@material-ui/styles";
import HomePageContainer from "../display/containers/HomePageContainer/HomePageContainer";

export type AppProps = AppDataProps & AppStyleProps & AppEventProps;

export interface AppDataProps {

}

export interface AppStyleProps {

}

export interface AppEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
    },
  }),
);

export namespace AppStore {
  export const store = configureStore();
}

const getInitialMaterialUITheme = (): Theme => {
  let theme = createMuiTheme({
    palette: {
      secondary: {
        light: "#de464c",
        main: "#d61820",
        dark: "#951016",
        contrastText: "#fff",
      }
    },
  });
  theme = responsiveFontSizes(theme);
  return theme;
};

const App: React.FC<AppProps> = (props) => {
  const classes = useStyles();

  const {

  } = props;

  return (
    <ThemeProvider theme={getInitialMaterialUITheme()}>
      <Provider store={AppStore.store}>
        <div className={classes.app}>
          <HomePageContainer/>
        </div>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

