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
    // Pricing configuration mapping exact USD amounts to preferred localized display amounts
    // Note: Exchange rates are static. Update periodically or replace with a live FX API later.
    const priceMap: Record<number, Record<Currency, string>> = {
      135:  { USD: '$135',   EUR: '€125',   GBP: '£105',   ZAR: 'R2,500',  SZL: 'E2,500' },
      216:  { USD: '$216',   EUR: '€200',   GBP: '£170',   ZAR: 'R4,000',  SZL: 'E4,000' },
      324:  { USD: '$324',   EUR: '€300',   GBP: '£250',   ZAR: 'R6,000',  SZL: 'E6,000' },
      540:  { USD: '$540',   EUR: '€500',   GBP: '£420',   ZAR: 'R10,000', SZL: 'E10,000' },
      810:  { USD: '$810',   EUR: '€750',   GBP: '£630',   ZAR: 'R15,000', SZL: 'E15,000' },
      1081: { USD: '$1,081', EUR: '€1,000', GBP: '£845',   ZAR: 'R20,000', SZL: 'E20,000' },
      1621: { USD: '$1,621', EUR: '€1,500', GBP: '£1,265', ZAR: 'R30,000', SZL: 'E30,000' },
      // Commissions
      14:   { USD: '$14',    EUR: '€13',    GBP: '£11',    ZAR: 'R250',    SZL: 'E250' },
      22:   { USD: '$22',    EUR: '€20',    GBP: '£17',    ZAR: 'R400',    SZL: 'E400' },
      32:   { USD: '$32',    EUR: '€30',    GBP: '£25',    ZAR: 'R600',    SZL: 'E600' },
      54:   { USD: '$54',    EUR: '€50',    GBP: '£42',    ZAR: 'R1,000',  SZL: 'E1,000' }
    };

    if (priceMap[usdPrice] && priceMap[usdPrice][currency]) {
      return priceMap[usdPrice][currency];
    }

    // generic rounding for anything not explicitly mapped
    const rate = rates[currency];
    let converted = usdPrice * rate;
    
    if (currency === 'ZAR' || currency === 'SZL') {
      converted = Math.round(converted / 50) * 50;
      return `${symbols[currency]}${converted.toLocaleString()}`;
    }

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
