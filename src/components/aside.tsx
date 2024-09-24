import DialogNew from "./dialog-new";

export default function Aside() {
  return (
    <aside className="border-r px-3 py-2">
      <div className="flex items-center gap-2">
        <img src="/icon.svg" alt="logo" className="size-8" />
        <DialogNew />
      </div>
    </aside>
  );
}
