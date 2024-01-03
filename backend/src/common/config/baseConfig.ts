import { validateSync } from 'class-validator';
import { OnModuleInit } from '@nestjs/common';

export abstract class BaseConfig implements OnModuleInit {
  onModuleInit(): any {
    const validateErrors = validateSync(this);
    if (validateErrors.length > 0) {
      throw new Error(
        `Config ${this.constructor.name} errors: ${JSON.stringify(
          validateErrors,
        )}`,
      );
    }
  }
}
