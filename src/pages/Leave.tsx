import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Dummy data for leave credits
const leaveCredits = [
  { type: "Vacation Leave", entitled: 12.0, remaining: 11.0 },
  { type: "Emergency Leave", entitled: 3.0, remaining: 2.5 },
  { type: "Sick Leave", entitled: 5.0, remaining: 4.0 },
  { type: "Bereavement Leave", entitled: 3.0, remaining: 3.0 },
  { type: "Paternity Leave", entitled: 7.0, remaining: 7.0 },
  { type: "Maternity Leave", entitled: 0.0, remaining: 0.0 },
  { type: "Leave Without Pay", entitled: "∞", remaining: "∞" },
];

// Dummy data for leave applications
const leaveApplications = [
  { id: 370, type: "Emergency Leave", status: "approve", dateSubmitted: "2025-01-06", format: "Whole Day", startDate: "01/03/2025", endDate: "01/03/2025", reason: "Providing assistance for my younger sibling's checkup at the Lung Center in Quezon City." },
  { id: 445, type: "Emergency Leave", status: "approve", dateSubmitted: "2025-01-10", format: "Whole Day", startDate: "01/10/2025", endDate: "01/10/2025", reason: "Family emergency" },
  { id: 491, type: "Vacation Leave", status: "approve", dateSubmitted: "2025-01-15", format: "Whole Day", startDate: "01/20/2025", endDate: "01/22/2025", reason: "Family vacation" },
  { id: 500, type: "Emergency Leave", status: "approve", dateSubmitted: "2025-01-18", format: "Half Day", startDate: "01/18/2025", endDate: "01/18/2025", reason: "Medical appointment" },
  { id: 538, type: "Sick Leave", status: "approve", dateSubmitted: "2025-01-25", format: "Whole Day", startDate: "01/25/2025", endDate: "01/25/2025", reason: "Flu symptoms" },
];

const leaveTypes = [
  "Vacation Leave",
  "Emergency Leave",
  "Sick Leave",
  "Bereavement Leave",
  "Paternity Leave",
  "Maternity Leave",
  "Leave Without Pay",
];

const leaveFormats = ["Whole Day", "Half Day - AM", "Half Day - PM"];

export default function Leave() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<typeof leaveApplications[0] | null>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);

  const handleView = (leave: typeof leaveApplications[0]) => {
    setSelectedLeave(leave);
    setShowViewDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Leave Credits</h1>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Add Leave
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Leave Credits Card */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Entitled</TableHead>
                    <TableHead className="font-semibold">Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveCredits.map((credit) => (
                    <TableRow key={credit.type}>
                      <TableCell className="font-medium">{credit.type}</TableCell>
                      <TableCell>{credit.entitled}</TableCell>
                      <TableCell>{credit.remaining}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Leave Applications Card */}
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveApplications.map((leave) => (
                    <TableRow key={leave.id}>
                      <TableCell>{leave.id}</TableCell>
                      <TableCell>{leave.type}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600 hover:bg-green-700 text-white">
                          {leave.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => handleView(leave)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          View <Eye className="w-4 h-4 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-center sm:justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-foreground text-background" : ""}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Leave Dialog */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto left-4 right-4 w-auto translate-x-0 sm:left-1/2 sm:right-auto sm:w-full sm:-translate-x-1/2 rounded-lg">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Leave Application Details
              </DialogTitle>
            </DialogHeader>
            {selectedLeave && (
              <div className="space-y-6">
                {/* Status Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Application #{selectedLeave.id}</h3>
                    <p className="text-sm text-muted-foreground">Submitted on {selectedLeave.dateSubmitted}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-sm font-medium">
                    Approved
                  </Badge>
                </div>

                {/* Main Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Leave Type</label>
                      <p className="text-base font-medium text-foreground mt-1">{selectedLeave.type}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Format</label>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-3 h-3 rounded ${selectedLeave.format === 'Whole Day' ? 'bg-red-500' : 'border-2 border-red-500'}`} />
                        <p className="text-base font-medium text-foreground">{selectedLeave.format}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Start Date</label>
                      <p className="text-base font-medium text-foreground mt-1">{selectedLeave.startDate}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">End Date</label>
                      <p className="text-base font-medium text-foreground mt-1">{selectedLeave.endDate}</p>
                    </div>
                  </div>
                </div>

                {/* Reason Section */}
                <div className="pt-4 border-t">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reason</label>
                  <p className="text-sm text-foreground mt-2 leading-relaxed">{selectedLeave.reason}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button variant="outline" onClick={() => setShowViewDialog(false)}>
                    Close
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Download
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Leave Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto left-4 right-4 w-auto translate-x-0 sm:left-1/2 sm:right-auto sm:w-full sm:-translate-x-1/2 rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Leave Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="Whole Day" value="Whole Day">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded" />
                      <span>Whole Day</span>
                    </div>
                  </SelectItem>
                  <SelectItem key="Half Day - AM" value="Half Day - AM">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-500 rounded" />
                      <span>Half Day - AM</span>
                    </div>
                  </SelectItem>
                  <SelectItem key="Half Day - PM" value="Half Day - PM">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-red-500 rounded" />
                      <span>Half Day - PM</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">to</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex-1 justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Textarea placeholder="State your reason" className="min-h-24" />

              {/* Date Legend */}
              <div className="space-y-2">
                <p className="text-sm font-semibold">Date Legend</p>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-foreground rounded" />
                    <span>Holiday or Event Day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded" />
                    <span>Whole Day Leave</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 border-2 border-red-500 rounded" />
                    <span>Half Day Leave</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Important: A date previously filed for half-day leave can now be updated or amended to reflect another half-day leave under any leave type. Please ensure the leave is properly recorded and updated in the system to reflect the changes.
                </p>
              </div>

              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
                  APPLY
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
