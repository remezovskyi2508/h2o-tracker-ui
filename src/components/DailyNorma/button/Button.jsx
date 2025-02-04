import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  types = 'primary',
  children,
  onClick,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={clsx(
        css.button,
        {
          [css.primary]: types === 'primary',
          [css.secondary]: types === 'secondary',
          [css.warning]: types === 'warning',
          [css.text]: types === 'text',
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={css.svgIcon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
