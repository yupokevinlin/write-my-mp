import {NextFunction, Request, Response} from "express";
import {MapService} from "./MapService";

export namespace MapEndpoints {
  export const getMayLayer0Polygons = (req: Request, rsp: Response, next: NextFunction): any => {
    try {
      rsp.send(MapService.getMapPolygons());
    } catch (e) {
      next(e);
    }
  };
}
