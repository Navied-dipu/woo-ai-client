import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";


const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 w-full min-w-0 overflow-x-hidden">{children}</div>
    </div>
  );
};

export default DashboardLayout;