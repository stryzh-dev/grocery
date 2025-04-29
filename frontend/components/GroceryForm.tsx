'use client';

import { useCallback, useMemo, useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Props {
  initialTitle?: string;
  initialAmount?: number;
  onSubmit: (title: string, amount: number) => void;
}
const GroceryForm =({
  initialTitle = '',
  initialAmount = 1,
  onSubmit,
}: Props) => {
  const [title, setTitle] = useState(initialTitle);
  const [amount, setAmount] = useState(initialAmount.toString());

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(title, Number(amount));
    },
    [title, amount, onSubmit],
  );

  const isValid = useMemo(() => {
    return /^\d+$/.test(amount) && Number(amount) > 0 && !!title;
  }, [amount, title]);

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center sm:p-6 p-2">
      <div className="container max-w-md bg-white sm:p-6 p-4 rounded-lg shadow-md relative w-full">
        <Link
          href="/"
          className="absolute top-5 left-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Go Back
        </Link>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-8">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {!initialTitle ? 'Add' : 'Edit'} Grocery
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Item Name
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Milk"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Amount</label>
            <Input
              type="text"
              inputMode="numeric"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d+$/.test(value)) {
                  setAmount(value);
                }
              }}
              placeholder="e.g. 2"
              required
            />
          </div>

          <Button type="submit" className="mt-2" disabled={!isValid}>
            Save
          </Button>
        </form>
      </div>
    </main>
  );
}

export default GroceryForm;