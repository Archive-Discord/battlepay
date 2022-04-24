import { IsString, Length } from "class-validator";

export class AccountAddDto {

  @IsString()
  readonly bank: string;

  @IsString()
  readonly accountNumber: string;

  @IsString()
  readonly holderName: string;
}