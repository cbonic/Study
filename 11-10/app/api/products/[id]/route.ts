import { NextRequest, NextResponse } from 'next/server';

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'ノートPC', price: 120000 },
  { id: 2, name: 'マウス', price: 3000 },
  { id: 3, name: 'キーボード', price: 8000 },
];

type Params = {
  params: {
    id: string;
  };
};

export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { id } = params;

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    return NextResponse.json(
      { error: '商品が見つかりません' },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}