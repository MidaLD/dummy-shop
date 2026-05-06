type ProfileRowProps = {
  label: string;
  value: string;
};

function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <div className="profile-row">
      <p className="profile-label">{label}</p>
      <p className="profile-value">{value}</p>
    </div>
  );
}

export default ProfileRow;
