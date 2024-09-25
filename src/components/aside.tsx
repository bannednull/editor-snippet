import DialogNew from "./dialog-new";
import SignIn from "./sign-in";
import { Button } from "./ui/button";

export default function Aside() {
  return (
    <aside className="flex flex-col gap-2 border-r p-3 bg-muted/40">
      <div className="flex items-center">
        <img src="/logo.svg" alt="logo" className="size-7" />
        <p className="ml-2">Bakan</p>

        <DialogNew />
      </div>

      <hr className="mt-auto" />

      <div className="text-center space-y-2">
        <p className="text-muted-foreground text-xs">
          Sign in to retrieve your code snippets
        </p>
        <SignIn>
          <Button className="px-8" size="sm" variant="secondary">
            Sign in
          </Button>
        </SignIn>
      </div>
    </aside>
  );
}
