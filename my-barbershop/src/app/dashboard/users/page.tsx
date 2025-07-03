"use client"

import { fetchUsers } from "@/services/userService"
import { useEffect, useState } from "react"

interface User{
    id:number;
    name:string;
    email:string;
    roles:string;

}
const UsersPage = ()=>{
    const [users, setUsers] = useState<User[]>([])
    useEffect(()=>{
       const getUsers = async()=>{
        const data = await fetchUsers()
        setUsers(data)
        
       }
       getUsers()
    },[])

 
    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Listes des utilisateurs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Id</th>
                            <th className="py-2 px-4 border">Noms</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>(
                                <tr key={user.id} className="text-center border-t">
                                    <td className="py-2 px-4 border">{user.id}</td>
                                    <td className="py-2 px-4 border">{user.name}</td>
                                    <td className="py-2 px-4 border">{user.email}</td>
                                    <td className="py-2 px-4 border">{user.roles}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default UsersPage




















// "use client";

// import { useEffect, useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   roles: string; // simple string comme "admin" ou "user"
// }

// const UsersPage = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

//     const getUsers = async () => {
//       const storedToken = localStorage.getItem("token");
//       console.log(localStorage.getItem('token')
//     );
      

//       if (!storedToken) {
//         console.log("Aucun token trouvé");
//         setError("Vous devez être connecté pour accéder à cette ressource.");
//         setLoading(false);
//         return;
//       }

//       console.log("Token trouvé:", storedToken);

//       try {
//         const res = await fetch(`${API_URL}/users/all`, {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Erreur lors de la récupération des utilisateurs");

//         const data = await res.json();
//         console.log("Utilisateurs récupérés:", data);
//         setUsers(data);
//       } catch (err) {
//         console.error(err);
//         setError("Impossible de charger les utilisateurs");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);
//   const admins = users.filter((user) => user.roles.includes("admin"));
//   const clients = users.filter((user) => user.roles.includes("user"));
  

//   return (
//     <div className="p-6 space-y-10">
//       <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>

//       {loading ? (
//         <p>Chargement...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Admins</h2>
//             <UserTable users={admins} />
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold mb-2">Clients</h2>
//             <UserTable users={clients} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const UserTable = ({ users }: { users: User[] }) => {
//   if (users.length === 0) return <p>Aucun utilisateur.</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-200 shadow">
//         <thead>
//           <tr className="bg-gray-100">
//              <th className="py-2 px-4 border">ID</th> 
//             <th className="py-2 px-4 border">Nom</th>
//             <th className="py-2 px-4 border">Email</th>
//             <th className="py-2 px-4 border">Rôle</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id} className="text-center border-t hover:bg-gray-50">
                
//                 {
//                     //@ts-ignore
//                 user.roles.join(", ")
//                 }
//               <td className="py-2 px-4 border">{user.id}</td>
//               <td className="py-2 px-4 border">{user.name}</td>
//               <td className="py-2 px-4 border">{user.email}</td>
//               <td className="py-2 px-4 border capitalize">{user.roles}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersPage;

