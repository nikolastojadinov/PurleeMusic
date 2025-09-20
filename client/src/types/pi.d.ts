// Pi Network SDK global type declaration
// See: https://developers.minepi.com/docs/pi-platform-sdk

declare global {
  interface Window {
    Pi?: {
      authenticate: (
        scopes: string[],
        onSuccess: (auth: any) => void,
        onIncomplete: (error: any) => void
      ) => void;
      // Add other Pi SDK methods if needed
    };
  }
}

export {};
