'use client';

import { useRouter, useParams } from 'next/navigation';
import { useGroceries, useUpdateGrocery } from '@/hooks/useGroceries';
import GroceryForm from '@/components/GroceryForm';

const EditPage = () => {
  const { id } = useParams();
  const { data } = useGroceries();
  const updateGrocery = useUpdateGrocery();
  const router = useRouter();

  const grocery = data?.find((item) => item.id === Number(id));

  if (!grocery) return <div>Loading...</div>;

  const handleSubmit = (title: string, amount: number) => {
    updateGrocery.mutate({ ...grocery, title, amount });
    router.push('/');
  };

  return (
    <div className="p-4">
      <GroceryForm
        initialTitle={grocery.title}
        initialAmount={grocery.amount}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditPage;
