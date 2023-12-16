export class Api {
  static readonly baseUrl = 'https://verkehr.autobahn.de/o/autobahn';
  static readonly autobahnList = Api.baseUrl + '/';
  static roadWorksList = (roadId: string) => Api.baseUrl + `/${roadId}/services/roadworks`;
  static roadWork = (roadworkId: string) => Api.baseUrl + `/details/roadworks/${roadworkId}`;
  static lorryParkingList = (roadId: string) => Api.baseUrl + `/${roadId}/services/parking_lorry`;
  static warningsList = (roadId: string) => Api.baseUrl + `/${roadId}/services/warning`;
  static closuresList = (roadId: string) => Api.baseUrl + `/${roadId}/services/closure`;
}
