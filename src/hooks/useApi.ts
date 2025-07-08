'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const request = async <T>(method: string, url: string, data?: any): Promise<T> => {
    setLoading(true);
    setError(null);
    try {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.id.magiclab.space';
      console.log('Request URL:', `${baseUrl}${url}`);
      const response = await fetch(`${baseUrl}${url}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });
      console.log('Response status:', response.status);
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: `HTTP error! status: ${response.status}` };
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Response text:', text);
      return text ? JSON.parse(text) as T : ({} as T);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the server');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
}