"use client";

import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, CreditCard, Shield, Users, Bell, Palette } from "lucide-react";

const roles = [
  { name: "Admin", description: "Full system access", color: "bg-red-100 text-red-800" },
  { name: "Manager", description: "Manage operations and reports", color: "bg-blue-100 text-blue-800" },
  { name: "Dispatcher", description: "Manage loads and drivers", color: "bg-green-100 text-green-800" },
  { name: "Driver", description: "View assigned loads", color: "bg-yellow-100 text-yellow-800" },
  { name: "HR", description: "Manage employees and payroll", color: "bg-purple-100 text-purple-800" },
  { name: "Accountant", description: "Financial reports and payroll", color: "bg-orange-100 text-orange-800" },
];

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your company profile and system preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg"><Building2 className="w-5 h-5 text-blue-600" /></div>
              <div>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Your organization details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Company Name" defaultValue={session?.user?.tenantName || ""} />
            <Input label="Admin Email" defaultValue={session?.user?.email || ""} type="email" />
            <Input label="Phone" placeholder="(555) 000-0000" />
            <Input label="Address" placeholder="123 Main St, City, State" />
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg"><CreditCard className="w-5 h-5 text-green-600" /></div>
              <div>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Your current plan and billing</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-brand-50 rounded-xl border border-brand-200 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-brand-900">Professional Plan</p>
                  <p className="text-sm text-brand-600">$149/month · Billed monthly</p>
                </div>
                <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Drivers</span><span className="font-medium">Up to 50</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">GPS Tracking</span><span className="font-medium text-green-600">Included</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Reports</span><span className="font-medium text-green-600">Advanced</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Support</span><span className="font-medium">Priority</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Upgrade Plan</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg"><Shield className="w-5 h-5 text-purple-600" /></div>
            <div>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Role-based access control for your team</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.name} className="p-4 rounded-xl border border-gray-200 hover:border-brand-300 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${role.color}`}>
                    {role.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg"><Bell className="w-5 h-5 text-orange-600" /></div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure alert preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Load status changes", "Driver alerts", "Payroll reminders", "System updates"].map((item) => (
                <label key={item} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item}</span>
                  <div className="relative">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-10 h-6 bg-gray-200 peer-checked:bg-brand-600 rounded-full transition-colors cursor-pointer" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-4 transition-transform" />
                  </div>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-50 rounded-lg"><Palette className="w-5 h-5 text-pink-600" /></div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize your dashboard theme</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Theme</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-white border-2 border-brand-600 text-sm font-medium">Light</button>
                  <button className="px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium border-2 border-transparent">Dark</button>
                  <button className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium border-2 border-transparent">System</button>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Accent Color</p>
                <div className="flex gap-2">
                  {["bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-green-500", "bg-orange-500"].map((color) => (
                    <button key={color} className={`w-8 h-8 rounded-full ${color} ${color === "bg-blue-500" ? "ring-2 ring-offset-2 ring-blue-500" : ""}`} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
