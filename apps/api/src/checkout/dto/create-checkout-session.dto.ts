import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  Min
} from 'class-validator';

export class CreateCheckoutSessionDto {
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0.01)
  amount!: number;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  currency!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(160)
  customerName!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsUrl({ require_tld: false })
  successUrl!: string;

  @IsUrl({ require_tld: false })
  cancelUrl!: string;
}
