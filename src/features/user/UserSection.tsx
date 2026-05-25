import { useCurrentUser } from "../authentication/useCurrentUser";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";

function UserSection() {
  const { currentUser, isLoading } = useCurrentUser();
  if (isLoading) return null;
  return currentUser ? <UserMenu currentUser={currentUser} /> : <LoginButton />;
}

export default UserSection;
