import Link from "next/link";

const home = () => {
  return (
    <div>
      <ul className="flex flex-col">
        <Link href="/threeJS">ThreeJs</Link>
        <Link href="/posts">Posts</Link>
      </ul>
    </div>
  );
};

export default home;
