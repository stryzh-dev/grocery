import GroceryList from '@/components/GroceryList';
import { Button } from '@ui/Button';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center sm:p-6 p-2">
      <div className="container max-w-2xl bg-white sm:p-6 p-2 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
            Grocery List
          </h1>
          <Link href="/add">
            <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition">
              + Add Grocery
            </Button>
          </Link>
        </div>
        <GroceryList />
      </div>
    </main>
  );
}

export default Home;