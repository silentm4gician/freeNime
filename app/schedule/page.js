import ScheduleHeader from "../../components/schedule/schedule-header";
import DailySchedule from "../../components/schedule/daily-schedule";
import { formatDate, getDaysOfWeek } from "../../lib/date-utils";

export default async function SchedulePage({ searchParams }) {
  const { date } = await searchParams;
  const currentDate = new Date();
  const selectedDate = date ? new Date(date) : currentDate;
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  //current week
  const weekDays = getDaysOfWeek(selectedDate);

  // each day of the week
  const scheduleData = await Promise.all(
    weekDays.map(async (day) => {
      const formattedDate = formatDate(day);
      const response = await fetch(
        `${baseURL}/schedule?date=${formattedDate}`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        return { date: day, animes: [] };
      }

      const data = await response.json();
      return {
        date: day,
        animes: data.success ? data.data.scheduledAnimes : [],
      };
    })
  );

  return (
    <main className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        <ScheduleHeader selectedDate={selectedDate} />

        <div className="grid grid-cols-1 gap-8">
          {scheduleData.map((daySchedule) => (
            <DailySchedule
              key={formatDate(daySchedule.date)}
              date={daySchedule.date}
              animes={daySchedule.animes}
              isToday={formatDate(daySchedule.date) === formatDate(currentDate)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
