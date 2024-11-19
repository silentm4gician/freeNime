import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold text-purple-400 hover:text-purple-500 duration-150 italic flex items-center gap-2"
    >
      <img
        src="/dmgicon.png"
        alt="FreeNime Icon"
        className="w-[54px] border-2 border-purple-400 rounded-full hover:border-purple-500 duration-150"
      />
      FreeNime
    </Link>
  );
}
