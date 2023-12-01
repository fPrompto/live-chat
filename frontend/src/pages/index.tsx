import Link from 'next/link';

function Home() {
  return (
    <div>
      <h1>Livechat</h1>
      <Link href='/chat'>Go to Chat</Link>
    </div>
  );
}

export default Home;
