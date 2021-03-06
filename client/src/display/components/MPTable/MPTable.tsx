import React, {useEffect, useState} from "react";
import {createStyles, Theme, useTheme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {usePreviousProps} from "../../../hooks/usePreviousProps";
import {LanguageUtils} from "../../../helpers/LanguageUtils";
import MPTableHeader from "./MPTableHeader/MPTableHeader";
import Divider from "@material-ui/core/Divider";
import MPTableRow from "./MPTableRow/MPTableRow";
import {Scrollbars} from "react-custom-scrollbars";

export type MPTableProps = MPTableDataProps & MPTableStyleProps & MPTableEventProps;

export interface MPTableDataProps {
  isEnglish: boolean;
  currentMapPolygon: MapPolygon | null;
  mapPolygons: Array<MapPolygon>;
}

export interface MPTableStyleProps {

}

export interface MPTableEventProps {
  handleTableRowClick(mapPolygon: MapPolygon | null): void;
  handleTableRowRightClick(): void;
}

export interface MPRowData {
  name: string;
  party: string;
  constituencyName: string;
  constituency: string;
  province: string;
  selected: boolean;
}

export enum MPTableSortKey {
  nameAsc = "name asc",
  partyAsc = "party asc",
  constituencyAsc = "constituency asc",
  provinceAsc = "province asc",
  nameDesc = "name desc",
  partyDesc = "party desc",
  constituencyDesc = "constituency desc",
  provinceDesc = "province desc",
  none = "none",
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
    },
    titleBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      [theme.breakpoints.up("xs")]: {
        height: "18px",
      },
      [theme.breakpoints.up("sm")]: {
        height: "20px",
      },
      [theme.breakpoints.up("md")]: {
        height: "26px",
      },
      [theme.breakpoints.up("lg")]: {
        height: "30px",
      },
    },
    titleBarTitle: {
      [theme.breakpoints.up("xs")]: {
        fontSize: "9px",
        marginLeft: "9px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "11px",
        marginLeft: "11px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "18px",
        marginLeft: "13px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "20px",
        marginLeft: "15px",
      },
    },
    titleBarWrapperLeft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "100%",
      width: "50%",
      [theme.breakpoints.up("xs")]: {
        marginTop: "4px",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "6px",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "8px",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "10px",
      },
    },
    titleBarWrapperRight: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "100%",
      width: "50%",
      [theme.breakpoints.up("xs")]: {
        marginTop: "4px",
        marginRight: "5px",
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: "6px",
        marginRight: "5px",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: "8px",
        marginRight: "5px",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: "10px",
        marginRight: "5px",
      },
    },
    inputRoot: {
      borderRadius: "3px",
      borderColor: theme.palette.text.primary,
      borderWidth: "1px",
      borderStyle: "solid",
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      [theme.breakpoints.up("xs")]: {
        width: "130px",
        marginRight: "10px",
        paddingLeft: "10px",
        height: "16px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "130px",
        marginRight: "10px",
        paddingLeft: "10px",
        height: "16px",
      },
      [theme.breakpoints.up("md")]: {
        width: "150px",
        marginRight: "10px",
        paddingLeft: "10px",
        height: "18px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "150px",
        marginRight: "10px",
        paddingLeft: "10px",
        height: "20px",
      },
    },
    inputInput: {
      padding: 0,
      [theme.breakpoints.up("xs")]: {
        fontSize: "10px",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "10px",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "12px",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "14px",
      },
    },
    iconButton: {
      [theme.breakpoints.up("xs")]: {
        width: "14px",
        height: "14px",
        margin: "2px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "20px",
        height: "20px",
        margin: "3px",
      },
      [theme.breakpoints.up("md")]: {
        width: "26px",
        height: "26px",
        margin: "5px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "30px",
        height: "30px",
        margin: "5px",
      },
    },
    icon: {
      [theme.breakpoints.up("xs")]: {
        width: "12px",
        height: "12px",
        margin: "1px",
      },
      [theme.breakpoints.up("sm")]: {
        width: "14px",
        height: "14px",
        margin: "3px",
      },
      [theme.breakpoints.up("md")]: {
        width: "18px",
        height: "18px",
        margin: "4px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "20px",
        height: "20px",
        margin: "5px",
      },
    },
    rowWrapper: {
      overflowY: "auto",
      overflowX: "hidden",
      width: "100%",
      [theme.breakpoints.up("xs")]: {
        height: "calc(100% - 40px)",
      },
      [theme.breakpoints.up("sm")]: {
        height: "calc(100% - 44px)",
      },
      [theme.breakpoints.up("md")]: {
        height: "calc(100% - 58px)",
      },
      [theme.breakpoints.up("lg")]: {
        height: "calc(100% - 71px)",
      },
    },
    rowInnerWrapper: {
      width: "100%",
      height: "max-content",
    }
  }),
);

const MPTable: React.FC<MPTableProps> = (props) => {
  const theme: Theme = useTheme();
  const classes = useStyles();

  const {
    isEnglish,
    mapPolygons,
    currentMapPolygon,
    handleTableRowClick,
    handleTableRowRightClick,
  } = props;

  const [searchString, setSearchString] = useState<string>("");
  const [baseData, setBaseData] = useState<Array<MPRowData>>([]);
  const [data, setData] = useState<Array<MPRowData>>([]);
  const [sortKey, setSortKey] = useState<MPTableSortKey>(MPTableSortKey.none);

  const prevProps: MPTableProps = usePreviousProps<MPTableProps>(props);
  useEffect(() => {
    if (prevProps) {
      if (prevProps.mapPolygons !== mapPolygons || prevProps.isEnglish !== isEnglish) {
        const newBaseData: Array<MPRowData> = mapPolygons.map((mapPolygon) => {
          const isVacant: boolean = mapPolygon.mpData.party === "Vacant";
          const name: string = isVacant ? (isEnglish ? "This seat is vacant" : "Ce si??ge est vacant") : (isEnglish ? (`${!!mapPolygon.mpData.title ? `The ${mapPolygon.mpData.title.replace("Hon.", "Honourable")} ` : ""}${mapPolygon.mpData.firstName} ${mapPolygon.mpData.lastName}`) : (`${!!mapPolygon.mpData.title ? `L'${mapPolygon.mpData.title.replace("Hon.", "honorable")} `.replace("L'Right", "Le tr??s") : ""}${mapPolygon.mpData.firstName} ${mapPolygon.mpData.lastName}`));
          const party: string = isVacant ? "Vacant" : (isEnglish ? mapPolygon.mpData.party : LanguageUtils.getFrenchPartyFromParty(mapPolygon.mpData.party));
          const constituencyName: string = (isEnglish ? mapPolygon.constituency : mapPolygon.constituencyFrench).replace(/???/g, "-").replace(/-/g, " - ");
          const province: string = isEnglish ? mapPolygon.mpData.province : LanguageUtils.getFrenchProvinceFromProvince(mapPolygon.mpData.province);
          const selected: boolean = isVacant ? false : mapPolygon.constituency === currentMapPolygon?.constituency;
          return {
            name: name,
            province: province,
            party: party,
            constituencyName: constituencyName,
            constituency: mapPolygon.constituency,
            selected: selected,
          }
        });
        setBaseData(newBaseData);
        const newData: Array<MPRowData> = getSortedData(getFilteredData(newBaseData, searchString), sortKey);
        setData(newData);
      }
      if (prevProps.currentMapPolygon !== currentMapPolygon) {
        const newBaseData: Array<MPRowData> = setSelected(baseData, currentMapPolygon);
        setBaseData(newBaseData);
        const newData: Array<MPRowData> = getSortedData(getFilteredData(newBaseData, searchString), sortKey);
        setData(newData);
      }
    }
  }, [mapPolygons, currentMapPolygon, isEnglish]);

  const setSelected = (dataToSelect: Array<MPRowData>, currentMapPolygon: MapPolygon | null): Array<MPRowData> => {
    if (!!currentMapPolygon) {
      return dataToSelect.map(e => {
        if (e.constituency === currentMapPolygon.constituency) {
          return {
            ...e,
            selected: true,
          };
        } else {
          return {
            ...e,
            selected: false,
          };
        }
      });
    } else {
      return dataToSelect.map(e => ({
        ...e,
        selected: false,
      }));
    }
  };

  const getFilteredData = (dataToFilter: Array<MPRowData>, filterString: string): Array<MPRowData> => {
    if (filterString === "") {
      return dataToFilter;
    } else {
      const lowerCaseFilterString: string = filterString.toLowerCase();
      return dataToFilter.filter(e => e.name.toLowerCase().includes(lowerCaseFilterString) || e.province.toLowerCase().includes(lowerCaseFilterString) || e.constituency.toLowerCase().includes(lowerCaseFilterString) || e.party.toLowerCase().includes(lowerCaseFilterString));
    }
  };

  const getSortedData = (dataToSort: Array<MPRowData>, sortKey: MPTableSortKey): Array<MPRowData> => {
    switch (sortKey) {
      case MPTableSortKey.none:
      case MPTableSortKey.nameAsc: {
        return dataToSort.sort((a, b) => {
          const aName: string = a.name.replace("The Honourable", "").replace("L'honorable", "").replace("The Right Honourable", "").replace("Le tr??s honorable", "").trim();
          const bName: string = b.name.replace("The Honourable", "").replace("L'honorable", "").replace("The Right Honourable", "").replace("Le tr??s honorable", "").trim();
          if (aName === bName) {
            return 0;
          }
          if (aName === "This seat is vacant" || aName === "Ce si??ge est vacant") {
            return 1;
          }
          if (bName === "This seat is vacant" || bName === "Ce si??ge est vacant") {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }
          if (aName < bName) {
            return -1;
          }
        });
      }
      case MPTableSortKey.nameDesc: {
        return dataToSort.sort((a, b) => {
          const aName: string = a.name.replace("The Honourable", "").replace("L'honorable", "").replace("The Right Honourable", "").replace("Le tr??s honorable", "").trim();
          const bName: string = b.name.replace("The Honourable", "").replace("L'honorable", "").replace("The Right Honourable", "").replace("Le tr??s honorable", "").trim();
          if (aName === bName) {
            return 0;
          }
          if (aName === "This seat is vacant" || aName === "Ce si??ge est vacant") {
            return -1;
          }
          if (bName === "This seat is vacant" || bName === "Ce si??ge est vacant") {
            return 1;
          }
          if (aName > bName) {
            return -1;
          }
          if (aName < bName) {
            return 1;
          }
        });
      }
      case MPTableSortKey.constituencyAsc: {
        return dataToSort.sort((a, b) => {
          if (a.constituency > b.constituency) {
            return 1;
          } else if (a.constituency < b.constituency) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      case MPTableSortKey.constituencyDesc: {
        return dataToSort.sort((a, b) => {
          if (a.constituency > b.constituency) {
            return -1;
          } else if (a.constituency < b.constituency) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      case MPTableSortKey.provinceAsc: {
        return dataToSort.sort((a, b) => {
          if (a.province > b.province) {
            return 1;
          } else if (a.province < b.province) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      case MPTableSortKey.provinceDesc: {
        return dataToSort.sort((a, b) => {
          if (a.province > b.province) {
            return -1;
          } else if (a.province < b.province) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      case MPTableSortKey.partyAsc: {
        return dataToSort.sort((a, b) => {
          if (a.party > b.party) {
            return 1;
          } else if (a.party < b.party) {
            return -1;
          } else {
            return 0;
          }
        });
      }
      case MPTableSortKey.partyDesc: {
        return dataToSort.sort((a, b) => {
          if (a.party > b.party) {
            return -1;
          } else if (a.party < b.party) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchString: string = e.target.value;
    setSearchString(searchString);
    setData(getSortedData(getFilteredData(baseData, searchString), sortKey));
  };

  const handleSortChange = (key: MPTableSortKey): void => {
    setSortKey(key);
    if (searchString !== "") {
      setData(getSortedData(getFilteredData(baseData, searchString), key));
    } else {
      setData(getSortedData(baseData, key));
    }
  };

  const handleMPRowClick = (constituency: string): void => {
    const matchingMapPolygon: MapPolygon | null = mapPolygons.find(mapPolygon => mapPolygon.constituency === constituency);
    handleTableRowClick(matchingMapPolygon);
  };

  const handleMPRowRightClick = (e: React.MouseEvent<HTMLElement>): void => {
    handleTableRowRightClick();
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={classes.root} onContextMenu={handleMPRowRightClick}>
      <div className={classes.titleBar}>
        <div className={classes.titleBarWrapperLeft}>
          <Typography className={classes.titleBarTitle}>
            {
              isEnglish ? "Current Members of Parliament" : "Les D??put??s Actuelles"
            }
          </Typography>
        </div>
        <div className={classes.titleBarWrapperRight}>
          <div className={classes.iconButton}>
            <SearchIcon className={classes.icon}/>
          </div>
          <InputBase
            placeholder={isEnglish ? "Search..." : "Recherchez..."}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <MPTableHeader isEnglish={isEnglish} handleSortKeyChange={handleSortChange}/>
      <Divider orientation={"horizontal"}/>
      <div className={classes.rowWrapper}>
        <Scrollbars>
          <div className={classes.rowInnerWrapper}>
            {
              data.map(row => (
                <MPTableRow key={row.constituency} data={row} handleClick={handleMPRowClick}/>
              ))
            }
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default MPTable;

