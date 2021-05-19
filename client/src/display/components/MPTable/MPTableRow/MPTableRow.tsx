import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MPRowData} from "../MPTable";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {getPartyBackgroundColor, getPartyColor} from "../../MPInformation/types";

export type MPTableRowProps = MPTableRowDataProps & MPTableRowStyleProps & MPTableRowEventProps;

export interface MPTableRowDataProps {
 data: MPRowData;
}

export interface MPTableRowStyleProps {

}

export interface MPTableRowEventProps {
  handleClick(constituency: string): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
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
    cell: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: "15px",
        fontSize: "12px",
      },
    },
    name: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(30% - 15px)",
      },
    },
    partyWrapper: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(20% - 15px)",
        marginLeft: "15px",
        fontSize: "12px",
      },
    },
    partyText: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "12px",
      },
    },
    partySquare: {
      borderRadius: "3px",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        height: "12px",
        width: "12px",
        marginTop: "9px",
        marginBottom: "9px",
        marginRight: "9px",
      },
    },
    party: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(20% - 15px)",
      },
    },
    constituency: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(25% - 15px)",
      },
    },
    province: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {

      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(25% - 15px)",
      },
    },
  }),
);

const MPTableRow: React.FC<MPTableRowProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    data,
    handleClick,
  } = props;

  const handleRowClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleClick(data.constituency);
  };

  return (
    <React.Fragment>
      <div className={classes.root} style={{backgroundColor: data.selected ? getPartyBackgroundColor(data.party, true) : theme.palette.background.paper}} onClick={handleRowClick}>
        <Typography className={`${classes.cell} ${classes.name}`}>
          {
            data.name
          }
        </Typography>
        <div className={classes.partyWrapper}>
          <div className={classes.partySquare} style={{backgroundColor: getPartyColor(data.party)}}/>
          <Typography className={classes.partyText}>
            {
              data.party
            }
          </Typography>
        </div>
        <Typography className={`${classes.cell} ${classes.constituency}`}>
          {
            data.constituencyName
          }
        </Typography>
        <Typography className={`${classes.cell} ${classes.province}`}>
          {
            data.province
          }
        </Typography>
      </div>
      <Divider orientation={"horizontal"}/>
    </React.Fragment>
  );
};

export default MPTableRow;

