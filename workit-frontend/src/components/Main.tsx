import { useState } from "react";
import type { TaskType } from "../types/types";
import Icon from "./Icon";
import IconButton from "./IconButton";

export default function Main() {
  const TasksData = [
    {
      date: "2026-03-22",
      tasks: [
        { content: "Позвонить в банк по поводу кредита", time: "09:00" },
        { content: "Купить продукты на неделю", time: "11:30" },
        { content: "Тренировка в спортзале", time: "14:00" },
        { content: "Починить кран на кухне", time: "17:00" },
        { content: "Посмотреть сериал с женой", time: "21:00" },
      ],
    },
    {
      date: "2026-03-16",
      tasks: [
        { content: "Встреча с клиентом по проекту", time: "10:00" },
        { content: "Оплатить коммунальные услуги", time: "12:00" },
        { content: "Забрать ребёнка из школы", time: "15:30" },
        { content: "Записаться к стоматологу", time: "16:00" },
      ],
    },
    {
      date: "2026-03-17",
      tasks: [
        { content: "Код-ревью pull request от Алексея", time: "09:30" },
        { content: "Обед с другом", time: "13:00" },
        { content: "Купить подарок на день рождения", time: "15:00" },
        { content: "Онлайн-курс по TypeScript", time: "19:00" },
        { content: "Приготовить ужин", time: "20:00" },
      ],
    },
    {
      date: "2026-03-18",
      tasks: [
        { content: "Стендап с командой", time: "09:30" },
        { content: "Написать отчёт за неделю", time: "11:00" },
        { content: "Пробежка в парке", time: "13:30" },
        { content: "Позвонить маме", time: "17:00" },
        { content: "Почитать книгу перед сном", time: "22:00" },
      ],
    },
    {
      date: "2026-03-19",
      tasks: [
        { content: "Деплой новой версии приложения", time: "10:00" },
        { content: "Поход в IKEA за полкой", time: "14:00" },
        { content: "Ужин с родителями", time: "19:30" },
      ],
    },
  ];
  function createDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  const today = createDay(new Date());
  const yesterday = createDay(new Date());
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = createDay(new Date(today));
  tomorrow.setDate(today.getDate() + 1);
  function isSame(a: Date, b: Date) {
    return (
      a.getFullYear() == b.getFullYear() &&
      a.getMonth() == b.getMonth() &&
      a.getDate() == b.getDate()
    );
  }
  function categorizedTasks() {
    const emptyCategories = {
      Overdue: [] as TaskType[],
      Today: [] as TaskType[],
      Tomorrow: [] as TaskType[],
      Future: [] as TaskType[],
    };
    if (!TasksData) return emptyCategories;
    return TasksData.reduce((acc, itemTask) => {
      const date = new Date(itemTask.date);
      if (isSame(date, today)) {
        acc.Today.push(...itemTask.tasks);
      } else if (isSame(date, tomorrow)) {
        acc.Tomorrow.push(...itemTask.tasks);
      } else if (isSame(date, yesterday)) {
        const yesterdayTasks = itemTask.tasks.map((item) => ({
          ...item,
          time: item.time + " (Yesterday)",
        }));
        acc.Overdue.push(...yesterdayTasks);
      } else if (date.toISOString() < today.toISOString()) {
        acc.Overdue.push(...itemTask.tasks);
      } else {
        acc.Future.push(...itemTask.tasks);
      }
      return acc;
    }, emptyCategories);
  }
  const entries = Object.entries(categorizedTasks());
  const [isShown, setIsShown] = useState<string[]>([
    "Overdue",
    "Today",
    "Tomorrow",
  ]);
  return (
    <main className="mt-4 flex flex-col">
      <p className="font-montserrat text-center font-medium text-base mb-4">
        Tasks
      </p>
      {entries.map(([category, tasks]) => (
        <section key={category} className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
            <IconButton
              name="showMore"
              size={12}
              onClick={() =>
                setIsShown(
                  isShown.includes(category)
                    ? isShown.filter((item) => item != category)
                    : [...isShown, category],
                )
              }
              className="cursor-pointer"
            />
            <p
              className={`${
                category == "Overdue"
                  ? "text-[#FF8A8A]"
                  : category == "Today"
                    ? "text-[#74FFC5]"
                    : category == "Tomorrow"
                      ? "text-[#6B78CD]"
                      : "text-[#EF51D5]"
              } text-sm font-montserrat`}
            >
              {category}
            </p>
          </div>
          {isShown.includes(category) && (
            <div className="flex flex-col gap-1">
              {tasks.map((itemTask) => (
                <div className="flex gap-2">
                  <Icon name="done" size={12} />
                  <div>
                    <p className="font-roboto text-xs">{itemTask.content}</p>
                    <div className="flex gap-1">
                      <Icon name="clock" size={8} />
                      <p className="font-roboto text-[6px] text-[#7DE484]">
                        {itemTask.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
