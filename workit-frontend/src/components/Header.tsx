import Icon from "./Icon";
export default function Header() {
  return (
    <header className="flex gap-4">
      <nav>
        <Icon name="nav" />
      </nav>
      <p className="font-montserrat font-medium text-sm">Workit</p>
    </header>
  );
}
