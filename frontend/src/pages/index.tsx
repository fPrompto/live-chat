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
      <h1>Livechat</h1>
      <Link href='/chat'>Go to Chat</Link>
    </div>
  );
}

export default Home;
