import { join } from 'path';
import { homedir } from 'os';
import crypto from 'crypto';

const cryptoAlgo = 'aes-256-cbc';
export const sproutDirectory = join(homedir(), 'sprout');
export const sproutJsonFile = '.sprout.json';
export const sproutPathFile = join(sproutDirectory, sproutJsonFile);

export const writeConfig = (username, password) => {
  const secretKey = crypto.randomBytes(16).toString('hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(cryptoAlgo, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    username,
    password: {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    },
    secretKey,
  };
};

export const readConfig = ({ username, password, secretKey }) => {
  const decipher = crypto.createDecipheriv(
    cryptoAlgo,
    Buffer.from(secretKey),
    Buffer.from(password.iv, 'hex')
  );

  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(password.content, 'hex')),
    decipher.final(),
  ]);

  return {
    username,
    password: decryptedPassword.toString(),
  };
};
