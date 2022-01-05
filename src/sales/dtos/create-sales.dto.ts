import { IsNotEmpty } from "class-validator";

export class CreateSalesDto {
  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  price: number;
}