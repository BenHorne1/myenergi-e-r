import TextEditor from "./components/TextEditor";

export default function SendJSON() {
  return (
    <div className="ml-16 min-h-screen min-w-full bg-zinc-700">
      <div className="bg-zinc-800 mb-2 shadow-md ">
        <h1 className="mx-2 text-white bg-zinc-800 font-bold shadow-md">
          Send
        </h1>
      </div>
      <TextEditor />
    </div>
  );
}
