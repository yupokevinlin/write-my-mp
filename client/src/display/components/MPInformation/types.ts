export const getPartyColor = (party: string): string => {
  switch (party) {
    case "Liberal":
    case "Libéral": {
      return "#ed2e38";
    }
    case "Conservative":
    case "Conservateur": {
      return "#002395";
    }
    case "Bloc Québécois": {
      return "#0088ce";
    }
    case "NDP": {
      return "#ff5800";
    }
    case "Green Party":
    case "Parti Vert": {
      return "#427730";
    }
    case "Independent":
    case "Indépendant": {
      return "#c0c0c0";
    }
    default: {
      return "#ffffff";
    }
  }
};

export const getPartyBackgroundColor = (party: string, isRow: boolean): string => {
  switch (party) {
    case "Liberal":
    case "Libéral": {
      return "#ed2e3815";
    }
    case "Conservative":
    case "Conservateur": {
      return "#00239515";
    }
    case "Bloc Québécois": {
      return "#0088ce15";
    }
    case "NDP": {
      return "#ff580015";
    }
    case "Green Party":
    case "Parti Vert": {
      return "#42773015";
    }
    case "Independent":
    case "Indépendant": {
      return "#c0c0c025";
    }
    default: {
      return isRow ? "#00000015" : "#fff";
    }
  }
};
