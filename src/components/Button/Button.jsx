import styles from './Button.module.scss';

export const Button = ({ type = 'button', label, onClick, disabled = false }) => {
  return (
    <button type={type} className={styles['button']} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
};
