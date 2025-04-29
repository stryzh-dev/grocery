'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDeleteGrocery,
  useGroceries,
  useUpdateGrocery,
} from '@/hooks/useGroceries';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@ui/Table';
import { Button } from '@ui/Button';

const GroceryList = () => {
  const { data, isLoading } = useGroceries();
  const deleteGrocery = useDeleteGrocery();
  const updateGrocery = useUpdateGrocery();
  const router = useRouter();

  const sortedData = useMemo(() => {
    if (!data) return [];
    return data.slice().sort((a, b) => Number(a.bought) - Number(b.bought));
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-hidden">
      <Table className="border border-gray-200 rounded-md shadow-sm min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Bought</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow
              key={item.id}
              className={item.bought ? 'bg-green-50 text-gray-500' : ''}
            >
              <TableCell
                className={`text-center break-words max-w-[50px] whitespace-pre-wrap ${
                  item.bought && 'line-through'
                }`}
              >
                {item.title}
              </TableCell>
              <TableCell
                className={`text-center ${item.bought && 'line-through'}`}
              >
                {item.amount}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      item.bought
                        ? 'bg-green-100 border-green-500 text-green-700 hover:bg-green-150'
                        : 'bg-green-150 border-gray-300 text-gray-600 hover:bg-green-200'
                    }`}
                    onClick={() =>
                      !item.bought &&
                      updateGrocery.mutate({ ...item, bought: true })
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      !item.bought
                        ? 'bg-red-100 border-red-500 text-red-700 hover:bg-red-150'
                        : 'bg-red-50 border border-gray-300 text-gray-600 hover:bg-red-100'
                    }`}
                    onClick={() =>
                      item.bought &&
                      updateGrocery.mutate({ ...item, bought: false })
                    }
                  >
                    No
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-2">
                  <Button
                    className="px-2 py-1 text-sm font-medium border border-blue-400 text-blue-600 rounded-md bg-blue-50 hover:bg-blue-100"
                    onClick={() => router.push(`/edit/${item.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="px-2 py-1 text-sm font-medium border border-red-400 text-red-600 rounded-md bg-red-50 hover:bg-red-100"
                    onClick={() => deleteGrocery.mutate(item.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GroceryList;
