"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoningController = void 0;
const zoning_service_1 = require("../services/zoning.service");
const zoningService = new zoning_service_1.ZoningService();
class ZoningController {
    async getZoningInfo(req, res) {
        try {
            const { location } = req.query;
            if (!location || typeof location !== 'string') {
                return res.status(400).json({ error: 'Location is required and must be a string' });
            }
            const zoningData = await zoningService.getZoningByLocation(location);
            const nearbyFacilities = await zoningService.getNearbyFacilities(location);
            res.json({
                zone: zoningData,
                nearbyFacilities
            });
        }
        catch (error) {
            console.error('Error fetching zoning info:', error);
            res.status(500).json({ error: 'Failed to fetch zoning information' });
        }
    }
    async getZoneTypes(req, res) {
        try {
            const zoneTypes = await zoningService.getAllZoneTypes();
            res.json(zoneTypes);
        }
        catch (error) {
            console.error('Error fetching zone types:', error);
            res.status(500).json({ error: 'Failed to fetch zone types' });
        }
    }
    async getZoningMapData(req, res) {
        try {
            const mapData = await zoningService.getZoningMapData();
            res.json(mapData);
        }
        catch (error) {
            console.error('Error fetching zoning map data:', error);
            res.status(500).json({ error: 'Failed to fetch zoning map data' });
        }
    }
    async seedData(req, res) {
        try {
            await zoningService.seedZoningData();
            res.json({ message: 'Zoning data seeded successfully' });
        }
        catch (error) {
            console.error('Error seeding zoning data:', error);
            res.status(500).json({ error: 'Failed to seed zoning data' });
        }
    }
}
exports.ZoningController = ZoningController;
//# sourceMappingURL=zoning.controller.js.map