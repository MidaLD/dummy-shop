import dayjs from "dayjs";
import { useCurrentUser } from "../features/authentication/useCurrentUser";
import ProfileRow from "../features/user/ProfileRow";
import Heading from "../ui/Heading";

function UserProfilePage() {
  const { currentUser, isLoading } = useCurrentUser();
  const fullName = `${currentUser?.firstName} ${currentUser?.lastName}`;

  if (isLoading || !currentUser) return null;

  const { email, birthDate, gender } = currentUser;
  const formattedBirthDate = dayjs(birthDate).format("DD.MM.YYYY");

  return (
    <div className="profile-container">
      <Heading>User Profile</Heading>

      <ProfileRow label="Full name:" value={fullName} />
      <ProfileRow label="Gender:" value={gender} />
      <ProfileRow label="Email:" value={email} />
      <ProfileRow label="Birth date:" value={formattedBirthDate} />
    </div>
  );
}

export default UserProfilePage;
