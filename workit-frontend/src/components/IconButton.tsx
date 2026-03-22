import Icon, { type IconProps } from "./Icon";

interface IconButtonType extends IconProps {
  onClick: () => void;
}
export default function IconButton({
  name,
  className,
  size,
  onClick,
}: IconButtonType) {
  return (
    <button onClick={onClick}>
      <Icon name={name} className={className} size={size} />
    </button>
  );
}
