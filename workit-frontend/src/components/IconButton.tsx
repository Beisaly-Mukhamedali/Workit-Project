import Icon, { type IconProps } from "./Icon";

interface IconButtonType
  extends
    IconProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "name"> {}
export default function IconButton({
  name,
  className,
  size,
  key,
  ...rest
}: IconButtonType) {
  return (
    <button {...rest} key={key}>
      <Icon name={name} className={className} size={size} />
    </button>
  );
}
