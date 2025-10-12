"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileService {
    async saveFile(file) {
        const fileExtension = path_1.default.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
        const filePath = path_1.default.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads', fileName);
        // Create directory if it doesn't exist
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        // Save file
        await fs_1.default.promises.writeFile(filePath, file.buffer);
        return `/uploads/${fileName}`;
    }
    async deleteFile(fileUrl) {
        const filePath = path_1.default.join(process.cwd(), fileUrl);
        if (fs_1.default.existsSync(filePath)) {
            await fs_1.default.promises.unlink(filePath);
        }
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map