import { Home, Users, ArrowDown, ArrowUp, RefreshCcw, LogOut } from "lucide-react"
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom"

export function Sidebar() {
  const { pathname } = useLocation();
  function handleLogout(){
    localStorage.clear()
    window.location.href = "/"
  }
  return (
    <aside className="w-64 bg-[#020617] border-r border-white/10 p-6 flex flex-col position-fixed">

      <div className="text-xl font-bold mb-10 text-blue-400">
        NEXUS
      </div>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard"><SidebarItem icon={<Home size={18}/>} text="Home" active={pathname === "/dashboard"} /></Link>
        <Link to="/users"><SidebarItem icon={<Users size={18}/>} text="Usuários" active={pathname === "/users"} /></Link>
        <Link to="/deposit"><SidebarItem icon={<ArrowDown size={18}/>} text="Depósito" active={pathname === "/deposit"}/></Link>
        <Link to="/withdraw"><SidebarItem icon={<ArrowUp size={18}/>} text="Saque" active={pathname === "/withdraw"}/></Link>
        <Link to="/convert"> <SidebarItem icon={<RefreshCcw size={18}/>} text="Conversão" active={pathname === "/convert"} /></Link>
       
      </nav>

      <div className="mt-auto">
        <button onClick={handleLogout}><SidebarItem icon={<LogOut size={18}/>} text="Sair da conta" /></button>
      </div>

    </aside>
  )
}

function SidebarItem({icon, text, active=false}:any){
  return(
    <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer
    ${active ? "bg-blue-600/20 text-blue-400" : "text-gray-400 hover:bg-white/5"}`}>
      {icon}
      {text}
    </div>
  )
}