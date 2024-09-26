import { useFetcherWithReset } from "@/hooks/useUtils";
import React from "react";
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

export default function SignIn() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sign, setSign] = React.useState(true);

  const fetcher = useFetcherWithReset<{ error: string; message: string }>();
  const url = sign ? "/login" : "/register";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-8"
          size="sm"
          variant="secondary"
          onClick={() => {
            setSign(true);
            fetcher.reset();
          }}
        >
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full">
        <DialogHeader>
          <DialogTitle>{sign ? "Sign in" : "Sign up"}</DialogTitle>
          <DialogDescription>Retrieve your snippets</DialogDescription>
        </DialogHeader>

        <fetcher.Form className="space-y-2" method="post" action={url}>
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

          {fetcher.data?.error && (
            <p className="text-sm text-red-500">{fetcher.data?.error}</p>
          )}

          {fetcher.data?.message && (
            <p className="text-sm text-green-500">{fetcher.data?.message}</p>
          )}

          <p className="text-xs text-muted-foreground">
            {sign ? "Don't have an account ?" : "Already have an account ?"}
            <Button
              type="button"
              className="h-auto p-0 text-blue-500 ml-2"
              variant="link"
              onClick={() => {
                setSign((state) => !state);
                fetcher.reset();
              }}
            >
              {sign ? "Sign up it's free !" : "Sign in it's free !"}
            </Button>
          </p>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
