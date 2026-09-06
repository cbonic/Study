import { createProduct } from '@/app/actions/productActions';

export default function NewProductPage() {
  return (
    <main>
      <h1>商品を追加</h1>

      <form action={createProduct}>
        <div>
          <label htmlFor="name">商品名</label>
          <input
            id="name"
            name="name"
            type="text"
            required
          />
        </div>

        <div>
          <label htmlFor="price">価格（円）</label>
          <input
            id="price"
            name="price"
            type="number"
            required
          />
        </div>

        <button type="submit">追加</button>
      </form>
    </main>
  );
}