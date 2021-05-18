export namespace LanguageUtils {
  export const getFrenchProvinceFromProvince = (province: string): string => {
    switch (province) {
      case "British Columbia": {
        return "Colombie-Britannique";
      }
      case "Alberta": {
        return "Alberta";
      }
      case "Saskatchewan": {
        return "Saskatchewan";
      }
      case "Manitoba": {
        return "Manitoba";
      }
      case "Ontario": {
        return "Ontario";
      }
      case "Quebec": {
        return "Québec";
      }
      case "New Brunswick": {
        return "Nouveau-Brunswick";
      }
      case "Prince Edward Island": {
        return "Île-du-Prince-Édouard";
      }
      case "Nova Scotia": {
        return "Nouvelle-Écosse";
      }
      case "Newfoundland and Labrador": {
        return "Terre-Neuve-et-Labrador";
      }
      case "Yukon": {
        return "Yukon";
      }
      case "Northwest Territories": {
        return "Territoires du Nord-Ouest";
      }
      case "Nunavut": {
        return "Nunavut";
      }
      default: {
        return "";
      }
    }
  };

  export const getFrenchPartyFromParty = (party: string): string => {
    switch (party) {
      case "Liberal": {
        return "Libéral";
      }
      case "Conservative": {
        return "Conservateur";
      }
      case "Bloc Québécois": {
        return "Bloc Québécois";
      }
      case "NDP": {
        return "NDP";
      }
      case "Green Party": {
        return "Parti Vert";
      }
      case "Independent": {
        return "Indépendant";
      }
      case "Vacant": {
        return "Vacant";
      }
      default: {
        return party;
      }
    }
  };
}
