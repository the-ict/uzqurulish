import { axiosClient } from "../configs/api";

export interface IZoningInfo {
  zone: {
    id?: number;
    location: string;
    zoneType: 'residential' | 'commercial' | 'industrial';
    maxHeight?: number;
    maxFloors?: number;
    minGreenSpace?: number;
    restrictions?: string;
  };
  nearbyFacilities: Array<{
    name: string;
    type: string;
    distance: string;
  }>;
}

export interface IZoneType {
  name: string;
  type: string;
  maxHeight: number;
  maxFloors: number;
  minGreenSpace: number;
  description: string;
}

class ZoningFunctions {
  public async getZoningInfo(location: string): Promise<IZoningInfo> {
    try {
      const response = await axiosClient.get(`/zoning/info?location=${encodeURIComponent(location)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getZoneTypes(): Promise<IZoneType[]> {
    try {
      const response = await axiosClient.get('/zoning/types');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getZoningMapData(): Promise<any[]> {
    try {
      const response = await axiosClient.get('/zoning/map');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ZoningFunctions;