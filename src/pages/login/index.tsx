import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../services/auth/auth-service';
import '../globals.css';
import Spinner from '@/components/spinner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Nuevo estado para el loader
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activa el loader
    setError(null); // Limpia cualquier error previo
    try {
      const { access_token, user } = await login(email, password);

      // Guarda el token en cookies o localStorage
      document.cookie = `access_token=${access_token}; path=/`;
      localStorage.setItem('user', JSON.stringify(user));

      // Redirige al home
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false); // Desactiva el loader
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Inicio de sesión</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-rose-500 text-white rounded hover:bg-rose-600 flex items-center justify-center"
          disabled={loading} // Desactiva el botón mientras se está cargando
        >
          {loading ? (
            <Spinner />
          ) : (
            'Iniciar sesión'
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
