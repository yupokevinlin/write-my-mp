import React, {useState} from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MPTableSortKey} from "../MPTable";
import MPTableHeaderCell, {
  MPTableHeaderCellData,
  MPTableHeaderCellType,
  MPTableHeaderSortType
} from "./MPTableHeaderCell/MPTableHeaderCell";

export type MPTableHeaderProps = MPTableHeaderDataProps & MPTableHeaderStyleProps & MPTableHeaderEventProps;

export interface MPTableHeaderDataProps {
  isEnglish: boolean;
}

export interface MPTableHeaderStyleProps {

}

export interface MPTableHeaderEventProps {
  handleSortKeyChange(key: MPTableSortKey): void;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.up("xs")]: {
        marginTop: "3px",
        height: "18px",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "3px",
        height: "20px",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "5px",
        height: "26px",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "5px",
        height: "30px",
      },
    },
  }),
);

const MPTableHeader: React.FC<MPTableHeaderProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    handleSortKeyChange,
  } = props;

  const [mpTableHeaderData, setMpTableHeaderData] = useState<Array<MPTableHeaderCellData>>([
    {
      type: MPTableHeaderCellType.name,
      sortType: MPTableHeaderSortType.none,
    },
    {
      type: MPTableHeaderCellType.party,
      sortType: MPTableHeaderSortType.none,
    },
    {
      type: MPTableHeaderCellType.constituency,
      sortType: MPTableHeaderSortType.none,
    },
    {
      type: MPTableHeaderCellType.province,
      sortType: MPTableHeaderSortType.none,
    },
  ]);

  const handleSortTypeChange = (type: MPTableHeaderCellType, sortType: MPTableHeaderSortType): void => {
    setMpTableHeaderData(prevState => prevState.map(state => {
      if (state.type === type) {
        return {
          ...state,
          sortType: sortType,
        }
      } else {
        return {
          ...state,
          sortType: MPTableHeaderSortType.none,
        }
      }
    }));
    switch (type) {
      case MPTableHeaderCellType.name: {
        handleSortKeyChange(sortType === MPTableHeaderSortType.none ? MPTableSortKey.none : (sortType === MPTableHeaderSortType.asc ? MPTableSortKey.nameAsc : MPTableSortKey.nameDesc));
        break;
      }
      case MPTableHeaderCellType.party: {
        handleSortKeyChange(sortType === MPTableHeaderSortType.none ? MPTableSortKey.none : (sortType === MPTableHeaderSortType.asc ? MPTableSortKey.partyAsc : MPTableSortKey.partyDesc));
        break;
      }
      case MPTableHeaderCellType.constituency: {
        handleSortKeyChange(sortType === MPTableHeaderSortType.none ? MPTableSortKey.none : (sortType === MPTableHeaderSortType.asc ? MPTableSortKey.constituencyAsc : MPTableSortKey.constituencyDesc));
        break;
      }
      case MPTableHeaderCellType.province: {
        handleSortKeyChange(sortType === MPTableHeaderSortType.none ? MPTableSortKey.none : (sortType === MPTableHeaderSortType.asc ? MPTableSortKey.provinceAsc : MPTableSortKey.provinceDesc));
        break;
      }
    }
  };

  return (
    <div className={classes.root}>
      {
        mpTableHeaderData.map((data) => (
          <MPTableHeaderCell key={data.type} isEnglish={isEnglish} type={data.type} sortType={data.sortType} handleSortTypeChange={handleSortTypeChange}/>
        ))
      }
    </div>
  );
};

export default MPTableHeader;

