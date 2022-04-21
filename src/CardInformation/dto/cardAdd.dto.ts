import { IsString, Length } from "class-validator";

export class addCardDto {
  @IsString()
  @Length(2, 2)
  readonly cardPassword: string;

  @IsString()
  @Length(3, 3)
  readonly cardCvc: string;

  @IsString()
  @Length(2, 2)
  readonly cardExpirationMonth: string;

  @IsString()
  @Length(2, 2)
  readonly cardExpirationYear: string;

  @IsString()
  readonly cardNumber: string;
}