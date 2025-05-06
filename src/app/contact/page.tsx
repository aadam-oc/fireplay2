// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { firestore } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'messages'), { name, email, message });
      alert('Mensaje enviado');
    } catch (error) {
      alert('Error al enviar el mensaje');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required className="w-full p-2 border rounded" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required className="w-full p-2 border rounded" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje" required className="w-full p-2 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
    </form>
  );
}
