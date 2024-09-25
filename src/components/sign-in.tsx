import React from "react";
import { useFetcher } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function SignIn({ children }: { children: React.ReactNode }) {
  const [sign, setSign] = React.useState(true);

  const fetcher = useFetcher();
  const url = sign ? "/login" : "/register";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>{sign ? "Sign in" : "Sign up"}</DialogTitle>
          <DialogDescription>Retrieve your snippets</DialogDescription>
        </DialogHeader>
        <fetcher.Form className="space-y-1" method="post" action={url}>
          {!sign && (
            <>
              <label className="block" htmlFor="name">
                User name
              </label>
              <Input type="text" name="name" id="name" />
            </>
          )}

          <label className="block" htmlFor="email">
            Email
          </label>
          <Input type="text" name="email" id="email" />

          <label className="block" htmlFor="password">
            Password
          </label>
          <Input type="password" name="password" id="password" />

          {!sign && (
            <>
              <label className="block" htmlFor="repeat">
                Repeat password
              </label>
              <Input type="password" name="repassword" id="repeat" />
            </>
          )}

          <Button type="submit" size="sm">
            Send {fetcher.state === "submitting" && "⏳"}
          </Button>

          <p className="text-xs text-muted-foreground">
            {sign ? "Don't have an account ?" : "Already have an account ?"}
            <Button
              type="button"
              className="h-auto p-0 text-blue-500 ml-2"
              variant="link"
              onClick={() => setSign((state) => !state)}
            >
              {sign ? "Sign up it's free !" : "Sign in it's free !"}
            </Button>
          </p>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
