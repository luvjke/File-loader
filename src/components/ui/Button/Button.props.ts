import { ReactNode } from 'react';
import { To } from 'react-router-dom';

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  version: 'unfilled' | 'filled' | 'outline' | 'custom' | 'pagination' | 'advanced';
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  tag?: 'link' | 'button';
  href?: To;
  state?: any;
}
