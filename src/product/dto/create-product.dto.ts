import { Category } from "src/category/entities/category.entity";

export class CreateProductDto {
    title: string;
    price: number;
    category: Category
}
