import { useState } from "react";
import type { TaskType } from "../types/types";
import Icon from "./Icon";
import IconButton from "./IconButton";

export default function Main() {
  const TasksData = [
    {
      content: "Позвонить в банк по поводу кредита",
      datetime: "2026-04-22T09:00:00",
    },
    { content: "Купить продукты на неделю", datetime: "2026-03-22T11:30:00" },
    { content: "Тренировка в спортзале", datetime: "2026-03-22T14:00:00" },
    { content: "Починить кран на кухне", datetime: "2026-03-22T17:00:00" },
    { content: "Посмотреть сериал с женой", datetime: "2026-03-22T21:00:00" },

    {
      content: "Встреча с клиентом по проекту",
      datetime: "2026-03-16T10:00:00",
    },
    {
      content: "Оплатить коммунальные услуги",
      datetime: "2026-03-16T12:00:00",
    },
    { content: "Забрать ребёнка из школы", datetime: "2026-03-16T15:30:00" },
    { content: "Записаться к стоматологу", datetime: "2026-03-16T16:00:00" },

    {
      content: "Код-ревью pull request от Алексея",
      datetime: "2026-03-17T09:30:00",
    },
    { content: "Обед с другом", datetime: "2026-03-17T13:00:00" },
    {
      content: "Купить подарок на день рождения",
      datetime: "2026-03-17T15:00:00",
    },
    { content: "Онлайн-курс по TypeScript", datetime: "2026-03-17T19:00:00" },
    { content: "Приготовить ужин", datetime: "2026-03-17T20:00:00" },

    { content: "Стендап с командой", datetime: "2026-03-18T09:30:00" },
    { content: "Написать отчёт за неделю", datetime: "2026-03-18T11:00:00" },
    { content: "Пробежка в парке", datetime: "2026-03-18T13:30:00" },
    { content: "Позвонить маме", datetime: "2026-03-18T17:00:00" },
    { content: "Почитать книгу перед сном", datetime: "2026-03-18T22:00:00" },

    {
      content: "Деплой новой версии приложения",
      datetime: "2026-03-19T10:00:00",
    },
    { content: "Поход в IKEA за полкой", datetime: "2026-03-19T14:00:00" },
    { content: "Ужин с родителями", datetime: "2026-03-19T19:30:00" },
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
      const date = new Date(itemTask.datetime.split("T")[0]);
      if (isSame(date, today)) {
        acc.Today.push(itemTask);
      } else if (isSame(date, tomorrow)) {
        acc.Tomorrow.push(itemTask);
      } else if (isSame(date, yesterday)) {
        const yesterdayTask = {
          ...itemTask,
          datetime: `${itemTask.datetime} (Yesterday)`,
        };
        acc.Overdue.push(yesterdayTask);
      } else if (date.toISOString() < today.toISOString()) {
        acc.Overdue.push(itemTask);
      } else {
        acc.Future.push(itemTask);
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
        <section key={category} className="flex flex-col">
          <div className="flex gap-2 items-center mb-1">
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
                <div>
                  <div className="flex gap-2">
                    <Icon name="done" size={12} />
                    <div>
                      <p className="font-roboto text-xs">{itemTask.content}</p>
                      <div className="flex gap-1">
                        <Icon name="clock" size={8} />
                        <p className="font-roboto text-[6px] text-[#7DE484]">
                          {category != "Future"
                            ? itemTask.datetime.split("T")[1].slice(0, 5)
                            : itemTask.datetime
                                .split("T")[0]
                                .replaceAll("-", ".") +
                              " " +
                              itemTask.datetime.split("T")[1].slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-1 rounded-lg text-[#182639]" />
                </div>
              ))}
              <button className="rounded-2xl bg-[#232E3C] font-roboto text-[10px] text-[#BEBEBE] p-0.5 cursor-pointer">
                Add task
              </button>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
