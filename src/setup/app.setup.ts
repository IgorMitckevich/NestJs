import { INestApplication } from '@nestjs/common';
import { globalPrefixSetup } from './global-prefix.js';
import { pipesSetup } from './pipes-setup.js';

export function appSetup(app: INestApplication) {
  pipesSetup(app);
  // globalPrefixSetup(app);
}
