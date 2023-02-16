import * as bcrypt from 'bcrypt';
import crypto from 'crypto';

export class Crypto {
  static async encrypt(text: string) {
    return await bcrypt.hash(text, 10);
  }

  static async compare(text: string, hashedText: string) {
    return await bcrypt.compare(text, hashedText);
  }

  static async md5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex');
  }
}
