"use client"

import { icons, LogOut, Settings, ShoppingCart, User, X, Menu, ShirtIcon, HouseIcon, ContactIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"


import classNames from "classnames"
import { useRouter } from "next/navigation"

const menuItems=[
    {name:"Accueil", href:"/dashboard", icon:HouseIcon},
    {name:"Commandes", href:"/dashboard/orders", icon:ShoppingCart},
    {name:"Users", href:"/dashboard/users", icon:User},
    {name:"Produits", href:"/dashboard/products", icon:ShirtIcon },
    {name:"Parametres", href:"/dashboard/settings", icon:Settings},
    {name:"Contact", href:"/dashboard/contact", icon:ContactIcon},
    // {name:"ajoutProduits", href:"/dashboard/addProducts", icon:ShirtIcon},
 
]
export default function DashboardLayout({children}:{children:React.ReactNode}){
const [sidebarOpen, setSidebarOpen]= useState(false)
const pathname = usePathname()
const router = useRouter()

const handleLogout=()=>{
    localStorage.removeItem("adminToken")
    router.push('/dashboard/admin')
}

 

   

return(

    <div className="flex min-h-screen">
        <aside className={classNames(
            "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gray-900 text-white transition-all",
            sidebarOpen ? "translate-x-0":"-translate-x-64 md:translate-x-0"
        )}>
            <div className="flex items-center justify-between p-4">
                <h1 className="text-lg font-semibold">Mon tableau de bord</h1>
                <button className="md:hidden" onClick={()=>setSidebarOpen(false)}>
                    <X className="w-6 h-6"/>
                </button>
            </div>
            <nav className="flex-1 p-4 space-y-4">
                    {menuItems.map((item)=>(
                        <Link 
                        key={item.href} 
                        href={item.href}
                        className={classNames(
                            "flex items-center gap-3 p-2 rounded-md hover:bg-gray-700",
                            pathname === item.href ? "bg-gray-700":""
                        )}
                        >
                        <item.icon className="w-5 h-5"/>  
                        {item.name} 
                    </Link>
                ))}
            </nav>
            <div className="p-4">
                <button 
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-red-400 hover:bg-red-600 hover:text-white rounded-md">
                    <LogOut className="w-5 h-5 mr-2" />
                    Deconnexion
                </button>
            </div>
        </aside>
        <div className="flex-1 md:ml-64 bg-gray-100 min-h-screen">
            <header className="flex items-center justify-between p-4 bg-white shadow-md">
                <button className="md:hidden" onClick={()=>setSidebarOpen(!sidebarOpen)}>
                    <Menu className="w-6 h-6"/>
                </button>
                <h2 className="text-xl font-semibold">Dashboard</h2>
            </header>
            <main className="p-6">{children}</main>
        </div>
    </div>

)
}