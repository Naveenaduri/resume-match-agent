"use client";
import { Provider } from "@/components/ui/provider";

export default function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}