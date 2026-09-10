import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1 className="font-semibold text-3xl">Dashboard</h1>
      <Outlet/>
    </div>
  )
}

export default Dashboard;