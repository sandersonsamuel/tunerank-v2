import { User } from "firebase/auth";
import { proxy } from "valtio";

type UserState = {
  data: User | null
}

export const userState = proxy<UserState>({
  data: null
})