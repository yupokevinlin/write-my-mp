import React, {useState} from "react";
import {createStyles, Theme, useTheme, withWidth} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import ESRIMap from "../components/ESRIMap/ESRIMap";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import LoadingPageTransparent from "./statelessPages/LoadingPageTransparent";

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
    esriContainer: {
      height: "100%",
      width: "100%",
    }
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

  const handleLoadComplete = (): void => {
    setIsESRIMapLoaded(true);
  };

  const handleMapPolygonClick = (mapPolygon: MapPolygon): void => {
    console.log(mapPolygon);
  };

  return (
    <div className={classes.root}>
      <div className={classes.esriContainer}>
        <ESRIMap initComplete={isESRIMapLoaded} mapPolygons={mapPolygons} initialBaseMap={"topo"} width={width} handleMapPolygonClick={handleMapPolygonClick} handleLoadComplete={handleLoadComplete}/>
        <LoadingPageTransparent isLoading={!isESRIMapLoaded}/>
      </div>
    </div>
  );
};

export default withWidth()(HomePage);

