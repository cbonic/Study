'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = Number(formData.get('price'));

  if (!name || !name.trim() || Number.isNaN(price)) {
    throw new Error('商品名と価格を正しく入力してください');
  }

  console.log('商品追加:', {
    name: name.trim(),
    price,
  });

  revalidatePath('/products');
  redirect('/products');
}