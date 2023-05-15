/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/button-has-type */

import { Metadata } from 'next';
import { ReactNode } from 'react';

interface SideBarProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Controle Financeiro',
};

export default function ControlLayout({ children }: SideBarProps) {
  return (
    <>
      {children}
    </>
  );
}
