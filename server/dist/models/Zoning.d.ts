import { Model, Optional } from 'sequelize';
interface IZoning {
    id: number;
    location: string;
    zoneType: 'residential' | 'commercial' | 'industrial';
    maxHeight?: number;
    maxFloors?: number;
    minGreenSpace?: number;
    restrictions?: string;
    coordinates?: number[][];
    createdAt: Date;
}
interface ZoningCreationAttributes extends Optional<IZoning, 'id' | 'createdAt'> {
}
declare class Zoning extends Model<IZoning, ZoningCreationAttributes> implements IZoning {
    id: number;
    location: string;
    zoneType: 'residential' | 'commercial' | 'industrial';
    maxHeight?: number;
    maxFloors?: number;
    minGreenSpace?: number;
    restrictions?: string;
    createdAt: Date;
}
export default Zoning;
//# sourceMappingURL=Zoning.d.ts.map