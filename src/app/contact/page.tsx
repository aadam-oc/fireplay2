'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
// Si no usas `error`, elimina la declaración:
const [error, setError] = useState<string | null>(null);

// O si realmente necesitas manejar el error:
if (error) {
  return <p>Ha ocurrido un error: {error}</p>;
}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.message) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      await addDoc(collection(db, 'messages'), {
        ...form,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Error al enviar:', err);
      setError('No se pudo enviar el mensaje');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Contáctanos</h1>
      {success && <p className="text-green-600 mb-4">Mensaje enviado con éxito</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nombre"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          className="w-full border p-2 rounded"
          rows={5}
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Enviar
        </button>
      </form>
    </div>
  );
}
