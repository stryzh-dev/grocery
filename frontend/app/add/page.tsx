'use client';

import GroceryForm from '@/components/GroceryForm';
import { useAddGrocery } from '@/hooks/useGroceries';
import { useRouter } from 'next/navigation';

const AddPage = () => {
  const addGrocery = useAddGrocery();
  const router = useRouter();

  const handleSubmit = (title: string, amount: number) => {
    addGrocery.mutate({ title, amount, bought: false });
    router.push('/');
  };

  return (
    <div className="p-4">
      <GroceryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddPage;
