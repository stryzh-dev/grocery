'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GroceryItem } from '@/types/grocery';

const API_URL = 'http://localhost:3001/groceries';

export const useGroceries = () => {
  return useQuery<GroceryItem[]>({
    queryKey: ['groceries'],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });
};

export const useAddGrocery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newItem: Omit<GroceryItem, 'id'>) =>
      axios.post(API_URL, newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] });
    },
  });
};

export const useUpdateGrocery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: GroceryItem) => axios.put(`${API_URL}/${item.id}`, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] });
    },
  });
};

export const useDeleteGrocery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceries'] });
    },
  });
};
