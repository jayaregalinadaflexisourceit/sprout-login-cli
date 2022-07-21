import { existsSync, writeFileSync, rmSync } from 'fs';
import { sproutPathFile, writeConfig } from './config.js';

export default ({ username, password }) => {
  if (existsSync(sproutPathFile)) {
    rmSync(sproutPathFile);
  }

  writeFileSync(
    sproutPathFile,
    JSON.stringify(writeConfig(username, password), null, 2)
  );
};
