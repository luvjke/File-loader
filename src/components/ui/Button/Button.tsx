import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { ButtonProps } from './Button.props';
import styles from './Button.module.scss';

export const Button = ({
  onClick,
  disabled,
  label,
  icon,
  version,
  tag = 'button',
  href,
  state,
}: ButtonProps) => {
  const buttonClassNames = classNames(
    styles.button,
    version && styles[version],
    icon && styles.icon_button
  );
  return tag === 'button' ? (
    <button className={buttonClassNames} onClick={onClick} disabled={disabled}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  ) : (
    <Link to={href ?? ''} className={buttonClassNames} state={state}>
      {label}
    </Link>
  );
};
