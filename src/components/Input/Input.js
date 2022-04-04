import styles from './styles.module.css';
import React from 'react';

/* eslint-disable react/prop-types */
export const Input = ({
  value,
  label,
  errorMessage,
  onValueUpdated,
  required = true,
}) => {
  return (
    <div className={styles.main}>
      <input
        value={value}
        placeholder={label}
        required={required}
        onChange={e => onValueUpdated(e.target.value)}
      />

      {!!errorMessage && (
        <div data-testid="error" className={styles.error}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
