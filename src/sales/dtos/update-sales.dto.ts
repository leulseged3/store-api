import { IsNotEmpty } from "class-validator";

export class UpdateSalesDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  isApproved: boolean;
}