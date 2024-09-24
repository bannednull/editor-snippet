import DialogNew from "./dialog-new";

export default function Aside() {
  return (
    <aside className="flex flex-col gap-2 border-r px-3 py-2 bg-muted/40">
      <div className="flex items-center">
        <img src="/icon.svg" alt="logo" className="size-8" />
        <p className="ml-2">Bakan</p>

        <DialogNew />
      </div>
    </aside>
  );
}
