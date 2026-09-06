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

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.name || body.price == null) {
    return NextResponse.json(
      { error: 'name と price は必須です' },
      { status: 400 }
    );
  }

  const newProduct: Product = {
    id: Date.now(),
    name: body.name,
    price: Number(body.price),
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}