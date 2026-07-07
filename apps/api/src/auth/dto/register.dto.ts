import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @IsString()
  @IsNotEmpty()
  businessType!: string;

  @IsString()
  @Matches(/^[A-Z]{2}$/, {
    message: 'country must be a two-letter ISO country code, for example US or IN'
  })
  country!: string;

  @IsString()
  @Matches(/^[A-Z]{3}$/, {
    message: 'currency must be a three-letter ISO currency code, for example USD or INR'
  })
  currency!: string;
}
