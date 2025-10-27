export default function Button({ text }: { text: string }) {

  return (
    <button className="bg-blue-300 rounded-3xl px-4 content-center text-center pt-2.5 pb-3 cursor-pointer hover:bg-blue-400 active:bg-blue-300 transition duration-300 text-foreground font-bold text-[1.125rem]">{text}</button>
  );
}
