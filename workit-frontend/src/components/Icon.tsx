import NavIcon from "../assets/icons/nav-icon.svg?react";
import DoneIcon from "../assets/icons/done-icon.svg?react";
import DoneCheckedIcon from "../assets/icons/doneChecked-icon.svg?react";
import ShowMoreIcon from "../assets/icons/showMore-icon.svg?react";
import AddTask from "../assets/icons/add-task.svg?react";
import Bell from "../assets/icons/bell.svg?react";
import Calendar from "../assets/icons/calendar.svg?react";
import Clock from "../assets/icons/clock.svg?react";
import Habits from "../assets/icons/habits.svg?react";
import Settings from "../assets/icons/settings.svg?react";
import Tasks from "../assets/icons/tasks.svg?react";
import Teams from "../assets/icons/teams.svg?react";

const icons = {
  nav: NavIcon,
  done: DoneIcon,
  doneChecked: DoneCheckedIcon,
  showMore: ShowMoreIcon,
  addTask: AddTask,
  bell: Bell,
  calendar: Calendar,
  clock: Clock,
  habits: Habits,
  settings: Settings,
  tasks: Tasks,
  teams: Teams,
};

export interface IconProps {
  name: keyof typeof icons;
  key?: string;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 16, className }: IconProps) {
  const SvgIcon = icons[name];
  return (
    <SvgIcon width={size} height={size} className={`shrink-0 ${className}`} />
  );
}
