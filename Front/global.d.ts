declare global {
    interface MercadoPago {
      setPublishableKey: (key: string) => void;
      checkout: {
        render: (options: { container: string, label: string }) => void;
      };
    }
  
    interface Window {
      MercadoPago: MercadoPago;
    }
  }
  
  export {};
  