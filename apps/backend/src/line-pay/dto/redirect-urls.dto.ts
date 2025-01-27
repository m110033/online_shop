import { IsNotEmpty, IsString } from 'class-validator';

export class RedirectUrlsDto {
  @IsString()
  @IsNotEmpty()
  confirmUrl: string;

  @IsString()
  @IsNotEmpty()
  cancelUrl: string;
}
