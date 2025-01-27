import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
