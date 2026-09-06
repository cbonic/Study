import { notFound } from 'next/navigation';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({
  params,
}: Props) {
  const { id } = params;

  const res = await fetch(
    `http://localhost:3000/api/products/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  return (
    <main>
      <h1>商品詳細</h1>

      <p>ID: {product.id}</p>
      <p>商品名: {product.name}</p>
      <p>価格: {product.price}円</p>

      <Link href="/products">商品一覧に戻る</Link>
    </main>
  );
}