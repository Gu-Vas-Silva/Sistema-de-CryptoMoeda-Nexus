import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Users } from "./pages/Users.tsx";
import { Deposit } from "./pages/Deposit.tsx";
import { WithDraw } from "./pages/Withdraw.tsx";
import { Convert } from "./pages/Convert.tsx";

export function App(){
  return(
    <div>
      <nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/login" element={<SignIn />} />
          <Route path="/users" element={<Users/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdraw" element={<WithDraw/>} />
          <Route path="/convert" element={<Convert/>} />
          <Route path="" element={<h1>Página não encontrada</h1>}/>
        </Routes>
      </nav>
    </div>
  )
}