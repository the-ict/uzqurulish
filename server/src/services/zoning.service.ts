import models from "../models";
import { Op } from 'sequelize';

export class ZoningService {
  async getZoningByLocation(location: string): Promise<any> {
    const zoningData = await models.Zoning.findOne({
      where: { location: { [Op.iLike]: `%${location}%` } }
    });

    if (!zoningData) {
      return {
        id: null,
        location,
        zoneType: 'residential',
        maxHeight: 15,
        maxFloors: 3,
        minGreenSpace: 30,
        restrictions: 'Default residential zoning restrictions'
      };
    }

    return zoningData.toJSON();
  }

  async getNearbyFacilities(location: string): Promise<any[]> {
    // Mock nearby facilities - in production, this could use external APIs
    return [
      { name: "Maktab", type: "education", distance: "500m" },
      { name: "Kasalxona", type: "healthcare", distance: "1.2km" },
      { name: "Bozor", type: "commercial", distance: "300m" },
      { name: "Bekat", type: "transport", distance: "200m" },
    ];
  }

  async getAllZoneTypes(): Promise<any[]> {
    // Try to get zone types from database first
    try {
      const zoneTypes = await models.Zoning.findAll({
        attributes: [
          [models.sequelize.fn('DISTINCT', models.sequelize.col('zone_type')), 'zoneType']
        ],
        raw: true
      });

      if (zoneTypes && zoneTypes.length > 0) {
        // Return real zone types with their characteristics
        const result = [];
        for (const zone of zoneTypes) {
          const sampleData = await models.Zoning.findOne({
            where: { zoneType: zone.zoneType },
            limit: 1
          });

          if (sampleData) {
            const data = sampleData.toJSON();
            result.push({
              name: zone.zoneType === 'residential' ? "Aholi punktlari" :
                    zone.zoneType === 'commercial' ? "Tijorat zonasi" : "Sanoat zonasi",
              type: zone.zoneType,
              maxHeight: data.maxHeight ? parseFloat(data.maxHeight.toString()) : (zone.zoneType === 'residential' ? 15 : zone.zoneType === 'commercial' ? 20 : 25),
              maxFloors: data.maxFloors || (zone.zoneType === 'residential' ? 3 : zone.zoneType === 'commercial' ? 5 : 2),
              minGreenSpace: data.minGreenSpace ? parseFloat(data.minGreenSpace.toString()) : (zone.zoneType === 'residential' ? 30 : zone.zoneType === 'commercial' ? 20 : 10),
              description: data.restrictions || (zone.zoneType === 'residential' ? "Faqat uy-joy binolari" :
                        zone.zoneType === 'commercial' ? "Ofis va do'konlar" : "Ishlab chiqarish korxonalari")
            });
          }
        }
        return result;
      }
    } catch (error) {
      console.error('Error fetching zone types from database:', error);
    }

    // Fallback to default zone types
    return [
      {
        name: "Aholi punktlari",
        type: "residential",
        maxHeight: 15,
        maxFloors: 3,
        minGreenSpace: 30,
        description: "Faqat uy-joy binolari"
      },
      {
        name: "Tijorat zonasi",
        type: "commercial",
        maxHeight: 20,
        maxFloors: 5,
        minGreenSpace: 20,
        description: "Ofis va do'konlar"
      },
      {
        name: "Sanoat zonasi",
        type: "industrial",
        maxHeight: 25,
        maxFloors: 2,
        minGreenSpace: 10,
        description: "Ishlab chiqarish korxonalari"
      }
    ];
  }

  async getZoningMapData(): Promise<any[]> {
    // Get real zoning data from database
    try {
      const zoningData = await models.Zoning.findAll();

      if (zoningData && zoningData.length > 0) {
        return zoningData
          .filter(zone => {
            const data = zone.toJSON();
            return data.coordinates && Array.isArray(data.coordinates) && data.coordinates.length > 0;
          })
          .map((zone, index) => {
            const data = zone.toJSON();
            return {
              id: data.id || index + 1,
              name: `${data.location} - ${data.zoneType === 'residential' ? 'Residential' :
                       data.zoneType === 'commercial' ? 'Commercial' : 'Industrial'}`,
              zoneType: data.zoneType,
              coordinates: data.coordinates || [],
              color: data.zoneType === 'residential' ? '#3B82F6' :
                     data.zoneType === 'commercial' ? '#10B981' : '#F59E0B'
            };
          });
      }
    } catch (error) {
      console.error('Error fetching zoning map data from database:', error);
    }

    // Fallback to mock data if no real data available
    return [
      {
        id: 1,
        name: 'Mirzo Ulug\'bek tumani - Residential',
        zoneType: 'residential',
        coordinates: [
          [41.2995, 69.2401],
          [41.3200, 69.2401],
          [41.3200, 69.2800],
          [41.2995, 69.2800],
          [41.2995, 69.2401]
        ],
        color: '#3B82F6'
      },
      {
        id: 2,
        name: 'Yunusobod tumani - Commercial',
        zoneType: 'commercial',
        coordinates: [
          [41.2800, 69.2200],
          [41.3000, 69.2200],
          [41.3000, 69.2500],
          [41.2800, 69.2500],
          [41.2800, 69.2200]
        ],
        color: '#10B981'
      },
      {
        id: 3,
        name: 'Sergeli tumani - Industrial',
        zoneType: 'industrial',
        coordinates: [
          [41.2000, 69.1800],
          [41.2300, 69.1800],
          [41.2300, 69.2200],
          [41.2000, 69.2200],
          [41.2000, 69.1800]
        ],
        color: '#F59E0B'
      }
    ];
  }

  async seedZoningData(): Promise<void> {
    const sampleData = [
      {
        location: 'Toshkent, Mirzo Ulug\'bek tumani',
        zoneType: 'residential',
        maxHeight: 15,
        maxFloors: 3,
        minGreenSpace: 30,
        restrictions: 'Faqat uy-joy binolari',
        coordinates: [
          [41.2995, 69.2401],
          [41.3200, 69.2401],
          [41.3200, 69.2800],
          [41.2995, 69.2800],
          [41.2995, 69.2401]
        ]
      },
      {
        location: 'Toshkent, Yunusobod tumani',
        zoneType: 'commercial',
        maxHeight: 20,
        maxFloors: 5,
        minGreenSpace: 20,
        restrictions: 'Tijorat faoliyati uchun',
        coordinates: [
          [41.2800, 69.2200],
          [41.3000, 69.2200],
          [41.3000, 69.2500],
          [41.2800, 69.2500],
          [41.2800, 69.2200]
        ]
      },
      {
        location: 'Toshkent, Sergeli tumani',
        zoneType: 'industrial',
        maxHeight: 25,
        maxFloors: 2,
        minGreenSpace: 10,
        restrictions: 'Sanoat faoliyati uchun',
        coordinates: [
          [41.2000, 69.1800],
          [41.2300, 69.1800],
          [41.2300, 69.2200],
          [41.2000, 69.2200],
          [41.2000, 69.1800]
        ]
      }
    ];

    for (const data of sampleData) {
      const [zoningRecord, created] = await models.Zoning.findOrCreate({
        where: { location: data.location },
        defaults: data as any
      });

      // If record exists but doesn't have coordinates, update it
      if (!created && !zoningRecord.toJSON().coordinates) {
        await zoningRecord.update({ coordinates: data.coordinates });
      }
    }
  }
}