import { Bell } from "lucide-react"

export function Topbar({user}:any) {

  return (
    <div className="h-16 border-b border-white/10 flex items-center justify-end px-8">
      <div className="flex items-center gap-6">
        <Bell className="text-gray-400"/>
        <div className="flex items-center gap-2">
          <div className="text-right text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-gray-400 text-xs">
              {user?.email}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            {user?.name[0]}
          </div>
        </div>

      </div>

    </div>
  )
}