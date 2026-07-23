import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'ZAR' | 'SZL';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  ZAR: 18.5,
  SZL: 18.5,
};

const symbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  ZAR: 'R',
  SZL: 'E',
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    // Try to auto-detect based on IP
    const detectLocation = async () => {
      try {
        const stored = localStorage.getItem('nexaflow_currency') as Currency;
        if (stored && rates[stored]) {
          setCurrency(stored);
          return;
        }

        const res = await fetch('https://get.geojs.io/v1/ip/country.json');
        const data = await res.json();
        const country = data.country;

        let detected: Currency = 'USD';
        if (country === 'SZ') detected = 'SZL';
        else if (country === 'ZA') detected = 'ZAR';
        else if (['GB'].includes(country)) detected = 'GBP';
        else if (['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'AT', 'PT', 'IE', 'FI', 'GR'].includes(country)) detected = 'EUR';

        setCurrency(detected);
      } catch (err) {
        console.error("Location detection failed", err);
      }
    };
    
    detectLocation();
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem('nexaflow_currency', c);
  };

  const formatPrice = (usdPrice: number) => {
    const rate = rates[currency];
    let converted = usdPrice * rate;

    // Special rounding to match original exact pricing for ZAR/SZL
    if (currency === 'ZAR' || currency === 'SZL') {
      if (usdPrice === 27) return `${symbols[currency]}500`;
      if (usdPrice === 80) return `${symbols[currency]}1,500`;
      if (usdPrice === 190) return `${symbols[currency]}3,500`;
      if (usdPrice === 325) return `${symbols[currency]}6,000`;
      if (usdPrice === 3) return `${symbols[currency]}50`;
      if (usdPrice === 50) return `${symbols[currency]}900`;
      
      // generic rounding
      converted = Math.round(converted / 50) * 50;
      return `${symbols[currency]}${converted.toLocaleString()}`;
    }

    // generic rounding for others
    converted = Math.round(converted);
    return `${symbols[currency]}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
