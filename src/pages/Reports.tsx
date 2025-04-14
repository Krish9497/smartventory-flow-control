
import { useState } from 'react';
import {
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  List,
  Download,
  Filter,
  ChevronDown,
  Calendar
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/features/StatCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Sample data for charts
const salesData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 9000, profit: 5400 },
  { name: 'Apr', sales: 5000, profit: 3000 },
  { name: 'May', sales: 8000, profit: 4800 },
  { name: 'Jun', sales: 3500, profit: 2100 },
  { name: 'Jul', sales: 7000, profit: 4200 },
];

const inventoryTrends = [
  { name: 'Electronics', value: 3500 },
  { name: 'Clothing', value: 2100 },
  { name: 'Food & Beverages', value: 1200 },
  { name: 'Health', value: 800 },
  { name: 'Furniture', value: 500 },
];

const COLORS = ['#8B5CF6', '#7E69AB', '#6E59A5', '#22c55e', '#0ea5e9'];

const inventoryHistory = [
  { date: '2023-03-01', added: 150, sold: 120, stock: 430 },
  { date: '2023-04-01', added: 200, sold: 180, stock: 450 },
  { date: '2023-05-01', added: 250, sold: 220, stock: 480 },
  { date: '2023-06-01', added: 180, sold: 190, stock: 470 },
  { date: '2023-07-01', added: 220, sold: 230, stock: 460 },
  { date: '2023-08-01', added: 280, sold: 240, stock: 500 },
];

// Best-selling items data
const bestSellingItems = [
  { id: 1, name: 'Samsung Galaxy S21', category: 'Electronics', sold: 142, revenue: 9229858 },
  { id: 2, name: 'Nike Air Max', category: 'Clothing', sold: 98, revenue: 1175902 },
  { id: 3, name: 'Sony WH-1000XM4', category: 'Electronics', sold: 75, revenue: 2099925 },
  { id: 4, name: 'Logitech MX Master', category: 'Electronics', sold: 63, revenue: 629937 },
  { id: 5, name: 'Dettol Hand Sanitizer', category: 'Health & Beauty', sold: 210, revenue: 48300 },
];

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [reportType, setReportType] = useState("all");
  
  return (
    <div className="content-container">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Analyze your business performance</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 sm:flex-none gap-1">
              <Filter className="h-4 w-4" />
              {reportType === "all" ? "All Reports" : reportType === "sales" ? "Sales Reports" : reportType === "inventory" ? "Inventory Reports" : "Profit Reports"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setReportType("all")}>All Reports</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportType("sales")}>Sales Reports</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportType("inventory")}>Inventory Reports</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setReportType("profit")}>Profit Reports</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex-1 sm:flex-none gap-1">
              <Calendar className="h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                "Date Range"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <Button className="flex-1 sm:flex-none gap-1">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
      
      {/* Summary stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Sales"
          value="₹25,67,483"
          icon={<BarChartIcon className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Total Profit"
          value="₹7,34,892"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Inventory Value"
          value="₹18,43,290"
          icon={<List className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
          description="vs. previous period"
        />
        <StatCard
          title="Profit Margin"
          value="28.6%"
          icon={<PieChartIcon className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
          description="vs. previous period"
        />
      </div>
      
      {/* Report tabs */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Trends</TabsTrigger>
          <TabsTrigger value="profit">Profit Analysis</TabsTrigger>
        </TabsList>
        
        {/* Sales Analysis Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-primary" />
                Sales Overview
              </CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => ["₹" + value.toLocaleString(), "Sales"]} />
                    <Legend />
                    <Bar dataKey="sales" name="Sales (₹)" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performing products by units sold</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {bestSellingItems.slice(0, 5).map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-smartventory-${index === 0 ? 'purple' : index === 1 ? 'blue' : index === 2 ? 'green' : index === 3 ? 'yellow' : 'red'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.sold} units</p>
                        <p className="text-xs text-muted-foreground">₹{item.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryTrends}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {inventoryTrends.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => ["₹" + value.toLocaleString(), "Revenue"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-primary" />
                Inventory History
              </CardTitle>
              <CardDescription>Monthly changes in inventory levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={inventoryHistory}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="stock" name="Total Stock" stroke="#9b87f5" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="added" name="Items Added" stroke="#22c55e" />
                    <Line type="monotone" dataKey="sold" name="Items Sold" stroke="#ea384c" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Distribution</CardTitle>
                <CardDescription>Current inventory value by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={inventoryTrends}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {inventoryTrends.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => ["₹" + value.toLocaleString(), "Value"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Items</CardTitle>
                <CardDescription>Items that need to be restocked soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-2 py-2 text-left font-medium">Item</th>
                        <th className="px-2 py-2 text-left font-medium">Category</th>
                        <th className="px-2 py-2 text-right font-medium">Current</th>
                        <th className="px-2 py-2 text-right font-medium">Min</th>
                        <th className="px-2 py-2 text-right font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 1, name: "Sony WH-1000XM4", category: "Electronics", current: 5, min: 10 },
                        { id: 2, name: "Nike Air Max", category: "Clothing", current: 8, min: 15 },
                        { id: 3, name: "Samsung Galaxy S21", category: "Electronics", current: 3, min: 5 },
                        { id: 4, name: "Hand Sanitizer", category: "Health", current: 10, min: 20 },
                      ].map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="px-2 py-2 text-left">{item.name}</td>
                          <td className="px-2 py-2 text-left text-muted-foreground">{item.category}</td>
                          <td className="px-2 py-2 text-right">{item.current}</td>
                          <td className="px-2 py-2 text-right">{item.min}</td>
                          <td className="px-2 py-2 text-right">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.current <= item.min / 2 
                                ? "bg-smartventory-red/20 text-smartventory-red" 
                                : "bg-smartventory-yellow/20 text-smartventory-yellow"
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
        </TabsContent>
        
        {/* Profit Analysis Tab */}
        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Profit Trends
              </CardTitle>
              <CardDescription>Monthly profit and sales comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => ["₹" + value.toLocaleString()]} />
                    <Legend />
                    <Area type="monotone" dataKey="sales" name="Sales (₹)" stroke="#9b87f5" fill="#9b87f5" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="profit" name="Profit (₹)" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Profitable Products</CardTitle>
                <CardDescription>Products with highest profit margins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { id: 1, name: "Sony WH-1000XM4", category: "Electronics", margin: 21.4, profit: 142000 },
                    { id: 2, name: "Nike Air Max", category: "Clothing", margin: 29.2, profit: 98000 },
                    { id: 3, name: "iPhone 13 Pro", category: "Electronics", margin: 18.7, profit: 354000 },
                    { id: 4, name: "Samsung TV", category: "Electronics", margin: 15.3, profit: 189000 },
                    { id: 5, name: "Logitech Mouse", category: "Electronics", margin: 32.1, profit: 67000 },
                  ].map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white bg-smartventory-${index === 0 ? 'purple' : index === 1 ? 'blue' : index === 2 ? 'green' : index === 3 ? 'yellow' : 'red'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.margin}%</p>
                        <p className="text-xs text-muted-foreground">₹{item.profit.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profit by Category</CardTitle>
                <CardDescription>Profit contribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Electronics", profit: 580000 },
                        { name: "Clothing", profit: 320000 },
                        { name: "Food", profit: 150000 },
                        { name: "Health", profit: 210000 },
                        { name: "Home", profit: 90000 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => ["₹" + value.toLocaleString(), "Profit"]} />
                      <Bar dataKey="profit" name="Profit (₹)" fill="#22c55e" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
