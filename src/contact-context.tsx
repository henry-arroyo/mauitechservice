import { createContext, useContext } from "react";

export const ContactContext = createContext<{ openContact: () => void }>({
  openContact: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}
