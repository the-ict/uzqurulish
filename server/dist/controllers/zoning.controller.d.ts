import { Request, Response } from 'express';
export declare class ZoningController {
    getZoningInfo(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getZoneTypes(req: Request, res: Response): Promise<void>;
    getZoningMapData(req: Request, res: Response): Promise<void>;
    seedData(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=zoning.controller.d.ts.map