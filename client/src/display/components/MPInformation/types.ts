export const getPartyColor = (party: string): string => {
  switch (party) {
    case "Liberal": {
      return "#ed2e38";
    }
    case "Conservative": {
      return "#002395";
    }
    case "Bloc Québécois": {
      return "#0088ce";
    }
    case "NDP": {
      return "#ff5800";
    }
    case "Green Party": {
      return "#427730";
    }
    case "Independent": {
      return "#c0c0c0";
    }
    default: {
      return "#ffffff";
    }
  }
};
