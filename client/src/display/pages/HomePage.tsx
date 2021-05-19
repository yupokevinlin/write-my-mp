import React, {useState} from "react";
import {createStyles, Snackbar, Theme, useTheme, withWidth} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import Paper from "@material-ui/core/Paper";
import ESRIMap from "../components/ESRIMap/ESRIMap";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import LoadingPageTransparent from "./statelessPages/LoadingPageTransparent";
import {XYCoord} from "../components/ESRIMap/types";
import MPInformation from "../components/MPInformation/MPInformation";
import MPTable from "../components/MPTable/MPTable";
import TopBar from "../components/TopBar/TopBar";
import Alert from "@material-ui/lab/Alert";

export type HomePageProps = HomePageDataProps & HomePageStyleProps & HomePageEventProps;

export interface HomePageDataProps {
  mapPolygons: Array<MapPolygon>;
}

export interface HomePageStyleProps {
  width: Breakpoint;
}

export interface HomePageEventProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
    },
    esriMapPaper: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "500px",
        width: "calc(50% - 15px)",
        marginLeft: "15px",
        marginRight: 0,
        marginTop: "15px",
        marginBottom: "15px",
      },
    },
    esriMapInformationContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "530px",
        width: "100%",
      },
    },
    mpInformationContainer: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "500px",
        width: "calc(50% - 30px)",
        margin: "15px",
      },
    },
    mpTableContainer: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "calc(100% - 595px)",
        width: "calc(100% - 30px)",
        marginLeft: "15px",
        marginRight: "15px",
        marginBottom: "15px",
      },
    },
    alert: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
      },
    },
    alertMessage: {
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
      },
    },
    alertIcon: {
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",
      },
    },
    snackBar: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        transform: "translate(-50%, 20px)",
      },
    },
  }),
);

const HomePage: React.FC<HomePageProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    mapPolygons,
    width,
  } = props;

  const [isESRIMapLoaded, setIsESRIMapLoaded] = useState<boolean>(false);
  const [currentMapPolygon, setCurrentMapPolygon] = useState<MapPolygon | null>(null);
  const [tableSelectedRegionGeometry, setTableSelectedRegionGeometry] = useState<Array<Array<[number, number]>>>([]);
  const [currentPosition, setCurrentPosition] = useState<XYCoord>({x: -1, y: -1,});
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [unableToFindPolygon, setUnableToFindPolygon] = useState<boolean>(false);

  const handleLoadComplete = (): void => {
    setIsESRIMapLoaded(true);
  };

  const handleMapPolygonClick = (mapPolygon: MapPolygon | null): void => {
    setCurrentMapPolygon(mapPolygon);
  };

  const handleTableRowClick = (mapPolygon: MapPolygon | null): void => {
    setCurrentMapPolygon(mapPolygon);
    setTableSelectedRegionGeometry(mapPolygon.geometry);
  };

  const handleTableRowRightClick = (): void => {
    setCurrentMapPolygon(null);
    setTableSelectedRegionGeometry([]);
  };

  const handleUnableToFindPolygonAtCurrentPosition = (): void => {
    setUnableToFindPolygon(true);
  };

  const handleSnackbarClose = (): void => {
    setUnableToFindPolygon(false);
  };

  const handleLanguageChange = (isEnglish: boolean): void => {
    setIsEnglish(isEnglish);
  };

  const handleFindMP = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({x: position.coords.longitude, y: position.coords.latitude,});
      });
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TopBar handleLanguageChange={handleLanguageChange}/>
        <div className={classes.esriMapInformationContainer}>
          <Paper className={classes.esriMapPaper} square elevation={3}>
            <ESRIMap initComplete={isESRIMapLoaded} isEnglish={isEnglish} mapPolygons={mapPolygons} currentPosition={currentPosition} initialBaseMap={"topo"} tableSelectedRegionGeometry={tableSelectedRegionGeometry} width={width} handleMapPolygonClick={handleMapPolygonClick} handleLoadComplete={handleLoadComplete} handleUnableToFindPolygonAtCurrentPosition={handleUnableToFindPolygonAtCurrentPosition}/>
            <LoadingPageTransparent isLoading={!isESRIMapLoaded}/>
          </Paper>
          <Paper className={classes.mpInformationContainer} square elevation={3}>
            <MPInformation currentMapPolygon={currentMapPolygon} isEnglish={isEnglish} isESRIMapLoaded={isESRIMapLoaded} handleFindMPClick={handleFindMP}/>
          </Paper>
        </div>
        <Paper className={classes.mpTableContainer} square elevation={3}>
          <MPTable mapPolygons={mapPolygons} isEnglish={isEnglish} currentMapPolygon={currentMapPolygon} handleTableRowClick={handleTableRowClick} handleTableRowRightClick={handleTableRowRightClick}/>
        </Paper>
      </div>
      <Snackbar className={classes.snackBar} open={unableToFindPolygon} autoHideDuration={5000} anchorOrigin={{vertical: "top", horizontal: "center"}} onClose={handleSnackbarClose}>
        <Alert classes={{
          root: classes.alert,
          message: classes.alertMessage,
          icon: classes.alertIcon,
        }} severity={"error"}>
          {
            "Your IP location does not match a constituency"
          }
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default withWidth()(HomePage);

