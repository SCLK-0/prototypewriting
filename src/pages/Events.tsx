import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, MapPin, Clock, Users } from "lucide-react";

// Dummy events data
const upcomingEvents = [
  {
    id: 1,
    title: "Company Town Hall Meeting",
    date: "2026-02-10",
    time: "10:00 AM - 12:00 PM",
    location: "Main Conference Room",
    type: "Meeting",
    attendees: 150,
  },
  {
    id: 2,
    title: "Team Building Activity",
    date: "2026-02-14",
    time: "1:00 PM - 5:00 PM",
    location: "Outdoor Pavilion",
    type: "Social",
    attendees: 45,
  },
  {
    id: 3,
    title: "Quarterly Performance Review",
    date: "2026-02-20",
    time: "9:00 AM - 11:00 AM",
    location: "HR Office",
    type: "Review",
    attendees: 5,
  },
  {
    id: 4,
    title: "Training: Leadership Skills",
    date: "2026-02-25",
    time: "2:00 PM - 4:00 PM",
    location: "Training Room B",
    type: "Training",
    attendees: 20,
  },
  {
    id: 5,
    title: "Company Anniversary Celebration",
    date: "2026-03-01",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Ballroom Hotel",
    type: "Celebration",
    attendees: 200,
  },
];

const holidays = [
  { date: "2026-02-25", name: "EDSA People Power Revolution Anniversary" },
  { date: "2026-04-09", name: "Araw ng Kagitingan" },
  { date: "2026-04-17", name: "Maundy Thursday" },
  { date: "2026-04-18", name: "Good Friday" },
  { date: "2026-05-01", name: "Labor Day" },
  { date: "2026-06-12", name: "Independence Day" },
];

const getEventBadgeColor = (type: string) => {
  switch (type) {
    case "Meeting":
      return "bg-blue-600 hover:bg-blue-700";
    case "Social":
      return "bg-green-600 hover:bg-green-700";
    case "Review":
      return "bg-purple-600 hover:bg-purple-700";
    case "Training":
      return "bg-primary hover:bg-primary/90";
    case "Celebration":
      return "bg-pink-600 hover:bg-pink-700";
    default:
      return "bg-muted hover:bg-muted/90";
  }
};

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Highlight dates with events - ensure proper date parsing
  const eventDates = upcomingEvents.map(e => {
    const date = new Date(e.date);
    // Reset time to avoid timezone issues
    date.setHours(0, 0, 0, 0);
    return date;
  });
  
  const holidayDates = holidays.map(h => {
    const date = new Date(h.date);
    // Reset time to avoid timezone issues
    date.setHours(0, 0, 0, 0);
    return date;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Events</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-2">
          {/* Calendar - More Compact Version */}
          <Card className="w-full lg:col-span-4">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarDays className="w-4 h-4 text-primary" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="w-full flex justify-center lg:justify-start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0 p-0 scale-110 lg:scale-95 origin-center lg:origin-top [&_table]:w-auto [&_table]:mx-auto lg:[&_table]:mx-0 [&_td]:p-0 [&_td]:text-center [&_th]:p-1 [&_th]:text-xs [&_th]:text-center [&_button]:h-7 [&_button]:w-7 [&_button]:text-xs [&_.rdp-months]:flex [&_.rdp-months]:justify-center [&_.rdp-nav]:scale-75"
                  modifiers={{
                    event: eventDates,
                    holiday: holidayDates,
                  }}
                  modifiersStyles={{
                    event: { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))', borderRadius: '50%' },
                    holiday: { backgroundColor: 'hsl(0 84% 60%)', color: 'white', borderRadius: '50%' },
                  }}
                />
              </div>
              
              {/* Compact Legend */}
              <div className="mt-3 pt-3 border-t space-y-2">
                <p className="text-xs font-semibold">Legend</p>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span>Event</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Holiday</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="w-full lg:col-span-8">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <Badge className={`${getEventBadgeColor(event.type)} text-white`}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} attendees
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Holidays */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Holidays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {holidays.map((holiday, index) => (
                <div 
                  key={index}
                  className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {new Date(holiday.date).getDate()}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{holiday.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(holiday.date).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
