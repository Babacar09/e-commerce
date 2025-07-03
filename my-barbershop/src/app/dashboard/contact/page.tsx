"use client"
import { useEffect, useState } from 'react';

type Message={
    id: number;
    name:string
    message:string;
    email:string;
    createdAt:string

}
export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/contact-message')
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (

       <div className="p-6">
            <h1 className="text-center font-bold text-3xl">Messages recu</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md">
                        <thead>

                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">Id</th> 
                                <th className="py-2 px-4 border">Noms</th>
                                <th className="py-2 px-4 border">Emails</th>
                                <th className="py-2 px-4 border">Messages</th>
                                <th className="py-2 px-4 border">Dates</th>
                            </tr>
                        </thead>
                            <tbody>
                                {messages.map((msg)=>(
                                    <tr key={msg.id}>
                                             <td className="py-4 px-6 border text-xl font-bold">{msg.id}</td>
                                             <td className="py-4 px-6 border text-xl font-bold">{msg.name}</td>
                                             <td className="py-4 px-6 border text-xl font-bold">{msg.email}</td>
                                             <td className="py-4 px-6 border text-xl font-bold">{msg.message}</td>
                                             <td className="py-4 px-6 border text-xl font-bold">{msg.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                    
                    </table>
                </div>

        </div>      
    // <div>
    //   <h1>Messages reçus</h1>
    //   {messages.length === 0 ? (
    //     <p>Aucun message reçu pour l'instant.</p>
    //   ) : (
    //     <ul>
    //       {messages.map((msg, index) => (
    //         <li key={index}>
    //           <strong>{msg.name}</strong> ({msg.email}) : {msg.message}
    //           <br />
    //           <small>{new Date(msg.createdAt).toLocaleString()}</small>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
}
