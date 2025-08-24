import { InternalServerErrorException } from '@nestjs/common';

export function hackeErrorException(error: any): never {
  console.error('Error:', error);
  throw new InternalServerErrorException(`Ocurrió un error inesperado. ${error.message}`);
}
