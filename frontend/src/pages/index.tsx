import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push('/login');
  }, []);

  return (
    <div>
      <span>Carregando...</span>
    </div>
  );
}

export default Home;
