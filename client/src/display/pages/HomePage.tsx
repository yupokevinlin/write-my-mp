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
import Modal from "@material-ui/core/Modal";
import InfoPage from "../components/InfoPage/InfoPage";

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
      "@media (min-width: 0px) and (max-width: 599px) and (min-height: 0px) and (max-height: 599px)": {
        overflowY: "auto",
        height: "max-content",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
    },
    esriMapPaper: {
      [theme.breakpoints.up("xs")]: {
        height: "220px",
        width: "calc(100% - 18px)",
        marginLeft: "9px",
        marginRight: "9px",
        marginBottom: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "250px",
        width: "calc(100% - 22px)",
        marginLeft: "11px",
        marginRight: "11px",
        marginBottom: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "400px",
        width: "calc(40% - 13px)",
        marginLeft: "13px",
        marginRight: 0,
        marginTop: "13px",
        marginBottom: "13px",
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
      alignItems: "flex-start",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {
        "@media (min-height: 0px) and (max-height: 599px)": {
          height: "max-content",
        },
        "@media (min-height: 600px)": {
          height: "459px",
        },
        flexDirection: "column-reverse",
        height: "459px",
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        height: "603px",
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        height: "426px",
        width: "100%",
      },
      [theme.breakpoints.up("lg")]: {
        height: "530px",
        width: "100%",
      },
    },
    mpInformationContainer: {
      [theme.breakpoints.up("xs")]: {
        height: "230px",
        width: "calc(100% - 18px)",
        margin: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "320px",
        width: "calc(100% - 22px)",
        margin: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "400px",
        width: "calc(60% - 26px)",
        margin: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "500px",
        width: "calc(50% - 30px)",
        margin: "15px",
      },
    },
    mpTableContainer: {

      [theme.breakpoints.up("xs")]: {
        "@media (min-height: 0px) and (max-height: 599px)": {
          height: "350px",
        },
        "@media (min-height: 600px)": {
          height: "calc(100% - 459px)",
        },
        width: "calc(100% - 18px)",
        marginLeft: "9px",
        marginRight: "9px",
        marginBottom: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "calc(100% - 625px)",
        width: "calc(100% - 22px)",
        marginLeft: "11px",
        marginRight: "11px",
        marginBottom: "11px",
      },
      [theme.breakpoints.up("md")]: {
        height: "calc(100% - 483px)",
        width: "calc(100% - 26px)",
        marginLeft: "13px",
        marginRight: "13px",
        marginBottom: "13px",
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
        height: "18px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "18px",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
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
        fontSize: "10px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "11px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
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
        fontSize: "14px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",
      },
    },
    snackBar: {
      [theme.breakpoints.up("xs")]: {
        transform: "translate(0, 22px)",
      },
      [theme.breakpoints.up("sm")]: {
        transform: "translate(-50%, 18px)",
      },
      [theme.breakpoints.up("md")]: {
        transform: "translate(-50%, 30px)",
      },
      [theme.breakpoints.up("lg")]: {
        transform: "translate(-50%, 40px)",
      },
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [isInfoDisplayed, setIsInfoDisplayed] = useState<boolean>(false);

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

  const handleUnselectMP = (): void => {
    setCurrentMapPolygon(null);
    setTableSelectedRegionGeometry([]);
  };

  const handleUnableToFindPolygonAtCurrentPosition = (): void => {
    setSnackbarMessage(isEnglish ? "Your IP address does not match a constituency" : "Votre adresse IP ne correspond pas ?? une circonscription");
  };

  const handleSnackbarClose = (): void => {
    setSnackbarMessage("");
  };

  const handleLanguageChange = (isEnglish: boolean): void => {
    setIsEnglish(isEnglish);
  };

  const handleFindMP = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({x: position.coords.longitude, y: position.coords.latitude,});
      });
    } else {
      setSnackbarMessage(isEnglish ? "Geolocation is not supported" : "La localisation n'est pas prise en charge");
    }
  };

  const handleDisplayInfo = (): void => {
    setIsInfoDisplayed(true);
  };

  const handleCloseModal = (): void => {
    setIsInfoDisplayed(false);
  };

  const handleESRIMapSearchComplete = (lat: number, lon: number): void => {
    setCurrentPosition({x: lon, y: lat,});
  };

  const apiKey: string = "AAPK8b6c99cca90340a3bec495c6b1d5f003Xn-pWi99zIvlftE-XFYNAF5woruB6OXMAxkSyZAeLgzGYkno1HfeF5gK1_JRnuiv";

  return (
    <React.Fragment>
      <div className={classes.root}>
        <TopBar handleLanguageChange={handleLanguageChange} handleDisplayInfo={handleDisplayInfo}/>
        <div className={classes.esriMapInformationContainer}>
          <Paper className={classes.esriMapPaper} square elevation={3}>
            <ESRIMap initComplete={isESRIMapLoaded} isEnglish={isEnglish} enableAddressSearch={true} mapPolygons={mapPolygons} currentPosition={currentPosition} initialBaseMap={"topo"} tableSelectedRegionGeometry={tableSelectedRegionGeometry} width={width} apiKey={apiKey} handleMapPolygonClick={handleMapPolygonClick} handleLoadComplete={handleLoadComplete} handleUnableToFindPolygonAtCurrentPosition={handleUnableToFindPolygonAtCurrentPosition} handleSearchComplete={handleESRIMapSearchComplete}/>
            <LoadingPageTransparent isLoading={!isESRIMapLoaded}/>
          </Paper>
          <Paper className={classes.mpInformationContainer} square elevation={3}>
            <MPInformation currentMapPolygon={currentMapPolygon} isEnglish={isEnglish} isESRIMapLoaded={isESRIMapLoaded} width={width} handleFindMPClick={handleFindMP} handleClose={handleUnselectMP}/>
          </Paper>
        </div>
        <Paper className={classes.mpTableContainer} square elevation={3}>
          <MPTable mapPolygons={mapPolygons} isEnglish={isEnglish} currentMapPolygon={currentMapPolygon} handleTableRowClick={handleTableRowClick} handleTableRowRightClick={handleUnselectMP}/>
        </Paper>
      </div>
      <Snackbar className={classes.snackBar} open={snackbarMessage !== ""} autoHideDuration={5000} anchorOrigin={{vertical: "top", horizontal: "center"}} onClose={handleSnackbarClose}>
        <Alert classes={{
          root: classes.alert,
          message: classes.alertMessage,
          icon: classes.alertIcon,
        }} severity={"error"}>
          {
            snackbarMessage
          }
        </Alert>
      </Snackbar>
      <Modal className={classes.modal} open={isInfoDisplayed} onClose={handleCloseModal}>
        <InfoPage isEnglish={isEnglish}/>
      </Modal>
    </React.Fragment>
  );
};

export default withWidth()(HomePage);

