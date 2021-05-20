import React from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export type MPTableHeaderCellProps = MPTableHeaderCellDataProps & MPTableHeaderCellStyleProps & MPTableHeaderCellEventProps;

export interface MPTableHeaderCellDataProps {
  isEnglish: boolean;
  type: MPTableHeaderCellType;
  sortType: MPTableHeaderSortType;
}

export interface MPTableHeaderCellStyleProps {
  handleSortTypeChange(type: MPTableHeaderCellType, sortType: MPTableHeaderSortType): void;
}

export interface MPTableHeaderCellEventProps {

}

export interface MPTableHeaderCellData {
  type: MPTableHeaderCellType;
  sortType: MPTableHeaderSortType;
}

export enum MPTableHeaderSortType {
  asc = "Ascending",
  desc = "Descending",
  none = "None",
}


export enum MPTableHeaderCellType {
  name = "Name",
  party = "Political Affiliation",
  constituency = "Constituency",
  province = "Province/Territory",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      cursor: "pointer",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {
        marginLeft: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        marginLeft: "15px",
      },
    },
    name: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {
        width: "calc(30% - 13px)",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(30% - 15px)",
      },
    },
    party: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {
        width: "calc(20% - 13px)",
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
        width: "calc(25% - 13px)",
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
        width: "calc(25% - 13px)",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(25% - 15px)",
      },
    },
    text: {
      pointerEvents: "none",
      userSelect: "none",
      fontWeight: "bold",
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "12px",
      },
    },
    icon: {
      [theme.breakpoints.up("xs")]: {

      },
      [theme.breakpoints.up("sm")]: {

      },
      [theme.breakpoints.up("md")]: {
        height: "12px",
        width: "12px",
        margin: "9px 4px"
      },
      [theme.breakpoints.up("lg")]: {
        height: "12px",
        width: "12px",
        margin: "9px 4px"
      },
    },
  }),
);

const MPTableHeaderCell: React.FC<MPTableHeaderCellProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    type,
    sortType,
    handleSortTypeChange,
  } = props;

  const getTypeText = (type: MPTableHeaderCellType, isEnglish: boolean): string => {
    if (isEnglish) {
      return type;
    } else {
      switch (type) {
        case MPTableHeaderCellType.name: {
          return "Nom";
        }
        case MPTableHeaderCellType.party: {
          return "Affiliation politique";
        }
        case MPTableHeaderCellType.constituency: {
          return "Circonscription";
        }
        case MPTableHeaderCellType.province: {
          return "Province/Territoire";
        }
      }
    }
  };

  const renderIcon = (sortType: MPTableHeaderSortType): React.ReactElement => {
    switch (sortType) {
      case MPTableHeaderSortType.asc: {
        return <ArrowUpwardIcon className={classes.icon}/>;
      }
      case MPTableHeaderSortType.desc: {
        return <ArrowDownwardIcon className={classes.icon}/>;
      }
      case MPTableHeaderSortType.none: {
        return <div className={classes.icon}/>;
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    switch (sortType) {
      case MPTableHeaderSortType.none: {
        handleSortTypeChange(type, MPTableHeaderSortType.asc);
        break;
      }
      case MPTableHeaderSortType.asc: {
        handleSortTypeChange(type, MPTableHeaderSortType.desc);
        break;
      }
      case MPTableHeaderSortType.desc: {
        handleSortTypeChange(type, MPTableHeaderSortType.none);
        break;
      }
    }
  };

  return (
    <div className={clsx(classes.root, {
      [classes.name]: type === MPTableHeaderCellType.name,
      [classes.party]: type === MPTableHeaderCellType.party,
      [classes.constituency]: type === MPTableHeaderCellType.constituency,
      [classes.province]: type === MPTableHeaderCellType.province,
    })} onClick={handleClick}>
      <Typography className={classes.text}>
        {
          getTypeText(type, isEnglish)
        }
      </Typography>
      {
        renderIcon(sortType)
      }
    </div>
  );
};

export default MPTableHeaderCell;

