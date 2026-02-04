import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const companies = [
  "Bequik Information Solutions, Inc.",
  "ABBE Consult NetSuite Services",
  "ABBE Technology Solutions, Inc.",
];

const departments = [
  "Sales Department",
  "Engineering Department",
  "Marketing Department",
  "Finance Department",
  "HR Department",
  "Managed Services",
  "Admin Department",
  "Project Management Department",
  "Executive Department",
  "Sales - Ms. Cathy",
  "Management",
  "Admin - Ms. Cathy",
  "Admin - Ms. Mae",
  "ABBEConsult - Ms. Mae",
  "ABBE Consult",
];

export default function Profile() {
  const [fullName, setFullName] = useState("Renier");
  const [email, setEmail] = useState("renier@abbe.com.ph");
  const [company, setCompany] = useState("ABBE Technology Solutions, Inc.");
  const [department, setDepartment] = useState("Engineering Department");

  const handleSave = () => {
    // Handle save logic
    console.log("Profile saved");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Profile Card */}
          <Card className="lg:col-span-1 lg:h-fit">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <Avatar className="w-32 h-32 border-4 border-primary/20">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                    R
                  </AvatarFallback>
                </Avatar>
              </div>
              <h2 className="text-2xl font-bold text-foreground">{fullName}</h2>
              <p className="text-muted-foreground mt-1">{email}</p>
            </CardContent>
          </Card>

          {/* Account Details Card */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Account Details</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-100 text-gray-600 border-gray-200"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Select value={company} onValueChange={setCompany}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((comp) => (
                        <SelectItem key={comp} value={comp}>
                          {comp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department Name</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSave}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
