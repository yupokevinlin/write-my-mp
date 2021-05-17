import React, {useState} from "react";
import {createStyles, Theme, useTheme, withWidth} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import Paper from "@material-ui/core/Paper";
import ESRIMap from "../components/ESRIMap/ESRIMap";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import LoadingPageTransparent from "./statelessPages/LoadingPageTransparent";
import {XYCoord} from "../components/ESRIMap/types";
import MPInformation from "../components/MPInformation/MPInformation";
import MPContactInformation from "../components/MPContactInformation/MPContactInformation";

export type HomePageProps = HomePageDataProps & HomePageStyleProps & HomePageEventProps;

export interface HomePageDataProps {
  mapPolygons: Array<MapPolygon>;
  isEnglish: boolean;
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
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      height: "100%",
      width: "100%",
    },
    esriContainer: {
      height: "100%",
      width: "50%",
    },
    informationContainer: {
      height: "100%",
      width: "50%",
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
        width: "calc(100% - 30px)",
        margin: "15px",
      },
    }
  }),
);

const HomePage: React.FC<HomePageProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    mapPolygons,
    isEnglish,
    width,
  } = props;

  const [isESRIMapLoaded, setIsESRIMapLoaded] = useState<boolean>(false);
  const [currentMapPolygon, setCurrentMapPolygon] = useState<MapPolygon | null>(null);
  const [currentPosition, setCurrentPosition] = useState<XYCoord>({x: -1, y: -1,});

  const handleLoadComplete = (): void => {
    setIsESRIMapLoaded(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({x: position.coords.longitude, y: position.coords.latitude,});
      });
    }
  };

  const handleMapPolygonClick = (mapPolygon: MapPolygon | null): void => {
    setCurrentMapPolygon(mapPolygon);
  };

  const handleUnableToFindPolygonAtCurrentPosition = (): void => {

  };

  return (
    <div className={classes.root}>
      <div className={classes.esriContainer}>
        <ESRIMap initComplete={isESRIMapLoaded} mapPolygons={mapPolygons} currentPosition={currentPosition} initialBaseMap={"topo"} width={width} handleMapPolygonClick={handleMapPolygonClick} handleLoadComplete={handleLoadComplete} handleUnableToFindPolygonAtCurrentPosition={handleUnableToFindPolygonAtCurrentPosition}/>
        <LoadingPageTransparent isLoading={!isESRIMapLoaded}/>
      </div>
      <div className={classes.informationContainer}>
        <Paper className={classes.mpInformationContainer} square elevation={3}>
          <MPInformation currentMapPolygon={currentMapPolygon} isEnglish={isEnglish}/>
          <MPContactInformation currentMapPolygon={currentMapPolygon} isEnglish={isEnglish}/>
        </Paper>
      </div>
    </div>
  );
};

export default withWidth()(HomePage);

