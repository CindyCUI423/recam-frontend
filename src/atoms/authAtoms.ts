import { atom } from "jotai";
import { AuthSnapshot } from "@/lib/types/auth";

export const authSnapshotAtom = atom<AuthSnapshot | null>(null);

export const tokenAtom = atom(
  (get) => get(authSnapshotAtom)?.user.token ?? null
);

export const roleAtom = atom(
  (get) => get(authSnapshotAtom)?.user.role ?? null
);

export const isAuthedAtom = atom(
  (get) => !!get(authSnapshotAtom)?.user.token
);
