import { IsString, Length } from "class-validator";

export class ServerAddDto {
  @IsString()
  readonly guild_id: string;

  @IsString()
  readonly membershipName: string;

  @IsString({each: true})
  readonly membershipBenefit: string[];

  @IsString()
  readonly membershipUseage: string;
}