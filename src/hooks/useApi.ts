import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const request = async <T>(
    method: 'get' | 'post',
    url: string,
    data?: any,
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      console.log('Request URL:', `https://api.id.magiclab.space${url}`);
      console.log('Request Body:', data);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`https://api.id.magiclab.space${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text().catch(() => '');
        const errorMessage = errorData || `HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      // Проверяем, есть ли тело ответа
      const text = await response.text();
      const result = text ? JSON.parse(text) : null;
      setLoading(false);
      return result as T | null;
    } catch (err: any) {
      console.error('API error:', err.message);
      setError(err.message || 'An error occurred');
      setLoading(false);
      throw err;
    }
  };

  return { request, loading, error };
};