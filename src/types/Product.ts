import Category from '@/types/Category';

type Product = {
    id: number,
    title: string,
    slug: string,
    price: number,
    description: string,
    category: Category
    images: Array<string>,
    creationAt: string,
    updatedAt: string
};

export default Product;