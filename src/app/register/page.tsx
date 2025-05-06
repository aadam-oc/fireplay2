'use client';
import { useState } from 'react';
import { auth, firestore } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, 'users', res.user.uid), {
        nombre,
        email,
        uid: res.user.uid,
      });
      toast.success('Registro exitoso');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Registrarse</button>
    </form>
  );
}
