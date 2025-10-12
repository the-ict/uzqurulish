import path from 'path';
import fs from 'fs';

export class FileService {
  async saveFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExtension}`;
    const filePath = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads', fileName);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Save file
    await fs.promises.writeFile(filePath, file.buffer);
    
    return `/uploads/${fileName}`;
  }
  
  async deleteFile(fileUrl: string): Promise<void> {
    const filePath = path.join(process.cwd(), fileUrl);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  }
}