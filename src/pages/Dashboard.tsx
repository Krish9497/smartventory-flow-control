
import { AreaChart, BarChart, Battery, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/features/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 6390 },
  { name: "Sun", sales: 3490 },
];

const profitData = [
  { name: "Jan", profit: 2400 },
  { name: "Feb", profit: 1398 },
  { name: "Mar", profit: 9800 },
  { name: "Apr", profit: 3908 },
  { name: "May", profit: 4800 },
  { name: "Jun", profit: 3800 },
];

const lowStockItems = [
  { id: 1, name: "Samsung Galaxy A52", category: "Electronics", current: 3, min: 5 },
  { id: 2, name: "Nike Air Max", category: "Footwear", current: 2, min: 10 },
  { id: 3, name: "Logitech MX Master", category: "Computer Accessories", current: 4, min: 8 },
  { id: 4, name: "Sony Headphones", category: "Audio", current: 1, min: 5 },
];

export default function Dashboard() {
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your inventory dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Items"
          value="1,234"
          icon={<Package className="h-4 w-4" />}
          description="Across 12 categories"
        />
        <StatCard
          title="Total Sales"
          value="₹24,500"
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ value: 15, isPositive: true }}
          description="vs. last week"
        />
        <StatCard
          title="Profit Margin"
          value="32%"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
          description="vs. last month"
        />
        <StatCard
          title="Low Stock"
          value="12"
          icon={<Battery className="h-4 w-4" />}
          trend={{ value: 3, isPositive: false }}
          description="items need attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AreaChart className="h-5 w-5 text-smartventory-purple" />
              Sales Chart
            </CardTitle>
            <CardDescription>Your daily sales for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#9b87f5"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-smartventory-green" />
              Profit Tracker
            </CardTitle>
            <CardDescription>Monthly profit trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#22c55e" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-smartventory-red" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Items that need to be restocked soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left font-medium">Item</th>
                    <th className="px-4 py-3 text-left font-medium">Category</th>
                    <th className="px-4 py-3 text-right font-medium">Current Stock</th>
                    <th className="px-4 py-3 text-right font-medium">Min Stock</th>
                    <th className="px-4 py-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3 text-left">{item.name}</td>
                      <td className="px-4 py-3 text-left text-muted-foreground">{item.category}</td>
                      <td className="px-4 py-3 text-right">{item.current}</td>
                      <td className="px-4 py-3 text-right">{item.min}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.current <= item.min / 2 ? "bg-smartventory-red/20 text-smartventory-red" : "bg-smartventory-yellow/20 text-smartventory-yellow"
                        }`}>
                          {item.current <= item.min / 2 ? "Critical" : "Low"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
