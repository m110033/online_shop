import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { LinePayCurrency } from '../enums/line-pay-currency.enum';
import { Type } from 'class-transformer';
import { PackageDto } from '../modules/packages/dto/package.dto';
import { RedirectUrlsDto } from './redirect-urls.dto';

export class RequestPaymentDto {
  amount: number = 0;

  @IsEnum(LinePayCurrency, { message: 'Invalid currency' })
  @IsOptional()
  public readonly currency: LinePayCurrency = LinePayCurrency.TWD;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  public readonly orderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageDto)
  public readonly packages: PackageDto[];

  @ValidateNested()
  @Type(() => RedirectUrlsDto)
  public readonly redirectUrls: RedirectUrlsDto;
}
