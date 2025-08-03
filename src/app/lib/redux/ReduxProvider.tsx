"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ReduxProviderProps {
    children: ReactNode;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  // Provider digunakan di sini, jadi import Provider valid dan dipakai
  return <Provider store={store}>{children}</Provider>;
}
