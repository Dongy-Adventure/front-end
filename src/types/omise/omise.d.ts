// hooks/useOmise/types/omise/omise.d.ts
export interface OmiseCard {
  number: string;
  name: string;
  expiration_month: string;
  expiration_year: string;
  security_code: string;
}

export interface OmiseTokenResponse {
  id: string;
  message?: string;
}

export interface Omise {
  setPublicKey: (key: string) => void;
  createToken: (
    t: string,
    card: OmiseCard,
    callback: (statusCode: number, response: OmiseTokenResponse) => void
  ) => void;
}

declare global {
  interface Window {
    Omise?: Omise;
  }
}
