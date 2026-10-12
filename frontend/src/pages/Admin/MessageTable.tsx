// src/pages/Admin/MessageTable.tsx
import type { Message } from "../../types";

interface Props {
  messages: Message[];
  onDeleteMessage: (id: number) => Promise<void>;
}

export default function MessageTable({ messages, onDeleteMessage }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Messages Contact</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Téléphone</th>
            <th className="p-2">Sujet</th>
            <th className="p-2">Message</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id} className="border-b">
              <td className="p-2">{msg.name}</td>
              <td className="p-2">{msg.email}</td>
              <td className="p-2">{msg.phone || "-"}</td>
              <td className="p-2">{msg.subject}</td>
              <td className="p-2">{msg.message}</td>
              <td className="p-2">
                <button onClick={() => onDeleteMessage(msg.id)} className="bg-red-600 text-white px-2 py-1 rounded">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
