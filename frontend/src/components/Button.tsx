export default function Button({ text }: { text: string }) {
  return (
    <button className="cursor-pointer content-center rounded-3xl bg-blue-300 px-4 pt-2.5 pb-3 text-center text-[1.125rem] font-bold text-foreground transition duration-300 hover:bg-blue-400 active:bg-blue-300">
      {text}
    </button>
  );
}
