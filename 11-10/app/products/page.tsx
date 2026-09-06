import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    'http://localhost:3000/api/products',
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('商品一覧の取得に失敗しました');
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main>
      <h1>商品一覧</h1>

      <p>
        <Link href="/products/new">商品を追加</Link>
      </p>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
            {' - '}
            {product.price}円
          </li>
        ))}
      </ul>
    </main>
  );
}