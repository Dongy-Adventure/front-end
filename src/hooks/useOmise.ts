import { useState, useEffect } from 'react';

interface CardData {
  number: string;
  name: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
}

interface UseOmiseResult {
  token: string;
  error: string;
  loading: boolean;
  createToken: (card: CardData) => Promise<string | null>;
}

const useOmise = (): UseOmiseResult => {
  const publicKey = 'pkey_test_635o0wylctj67t6za55'; // Replace with your actual Public Key
  const [token, setToken] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOmiseLoaded, setIsOmiseLoaded] = useState<boolean>(false);

  useEffect(() => {
    const loadOmiseScript = async () => {
      if (window.Omise) {
        setIsOmiseLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.omise.co/omise.js';
      script.async = true;

      script.onload = () => {
        if (window.Omise) {
          setIsOmiseLoaded(true);
        } else {
          setError('Omise.js did not load correctly.');
        }
      };

      script.onerror = () => {
        setError('Failed to load Omise.js');
      };

      document.head.appendChild(script);
    };

    loadOmiseScript();
  }, []);

  const createToken = async (card: CardData): Promise<string | null> => {
    if (!isOmiseLoaded) {
      setError('Omise.js is still loading. Please try again.');
      return Promise.reject('Omise.js is still loading. Please try again.');
    }

    return new Promise((resolve, reject) => {
      setLoading(true);
      setError('');

      if (!window.Omise || typeof window.Omise.createToken !== 'function') {
        setError('Omise.js not loaded or incorrectly initialized.');
        setLoading(false);
        reject('Omise.js not loaded or incorrectly initialized.');
        return;
      }

      const Omise = window.Omise;
      Omise.setPublicKey(publicKey);

      Omise.createToken(
        'card',
        {
          number: card.number,
          name: card.name,
          expiration_month: card.expiryMonth,
          expiration_year: card.expiryYear,
          security_code: card.securityCode,
        },
        (statusCode: number, response: { id: string; message?: string }) => {
          setLoading(false);
          if (statusCode === 200) {
            setToken(response.id);
            resolve(response.id);
          } else {
            setError(response.message || 'An error occurred.');
            reject(response.message || 'An error occurred.');
          }
        }
      );
    });
  };

  return { token, error, loading, createToken };
};

export default useOmise;
