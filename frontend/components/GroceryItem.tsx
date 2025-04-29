'use client';

import { GroceryItem as GroceryItemType } from '@/types/grocery';
import { useUpdateGrocery, useDeleteGrocery } from '@/hooks/useGroceries';
import { Checkbox } from '@ui/Checkbox';
import { Button } from './ui/Button';

interface Props {
  item: GroceryItemType;
}

const GroceryItem = ({ item }: Props) => {
  const updateGrocery = useUpdateGrocery();
  const deleteGrocery = useDeleteGrocery();

  const toggleBought = () => {
    updateGrocery.mutate({ ...item, bought: !item.bought });
  };

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox checked={item.bought} onCheckedChange={toggleBought} />
        <span className={item.bought ? 'line-through' : ''}>
          {item.title} ({item.amount})
        </span>
      </div>
      <div className="flex gap-2">
        <a href={`/edit/${item.id}`} className="text-blue-500">
          Edit
        </a>
        <Button
          onClick={() => deleteGrocery.mutate(item.id)}
          className="text-red-500"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default GroceryItem;
