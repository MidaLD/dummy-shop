import dayjs from "dayjs";
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiBriefcase,
  HiAcademicCap,
  HiCreditCard,
  HiCurrencyDollar,
} from "react-icons/hi2";
import { useCurrentUser } from "../features/authentication/useCurrentUser";


function UserProfilePage() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <LoadingSpinner />;
  if (!currentUser) return null;

  const {
    firstName,
    lastName,
    maidenName,
    username,
    image,
    role,
    email,
    phone,
    age,
    gender,
    birthDate,
    bloodGroup,
    height,
    weight,
    eyeColor,
    hair,
    address,
    company,
    university,
    bank,
    crypto,
  } = currentUser;

  const fullName = `${firstName} ${lastName}`;
  const formattedBirth = birthDate
    ? dayjs(birthDate).format("MMM D, YYYY")
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* ── Hero header ───────────────────────────────────────────── */}
      <div className="mb-6 overflow-hidden rounded-2xl shadow-sm">
        {/* Solid-color banner with avatar + identity text on top */}
        <div className="bg-slate-700 px-6 py-6">
          <div className="flex flex-wrap items-center gap-5">
            <div className="shrink-0">
              {image ? (
                <img
                  src={image}
                  alt={fullName}
                  className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-600 ring-4 ring-white/20">
                  <HiUser className="h-10 w-10 text-slate-300" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold text-white">{fullName}</h1>
                {maidenName && (
                  <span className="text-sm text-slate-300">({maidenName})</span>
                )}
                {role && (
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium capitalize text-white">
                    {role}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-slate-300">@{username}</p>
            </div>
          </div>
        </div>

        {/* Contact row on white strip below */}
        <div className="flex flex-wrap gap-4 border border-t-0 border-slate-100 bg-white px-6 py-4 text-sm text-slate-600 rounded-b-2xl">
          {email && (
            <span className="flex items-center gap-1.5">
              <HiEnvelope className="h-4 w-4 shrink-0 text-slate-400" />
              {email}
            </span>
          )}
          {phone && (
            <span className="flex items-center gap-1.5">
              <HiPhone className="h-4 w-4 shrink-0 text-slate-400" />
              {phone}
            </span>
          )}
        </div>
      </div>

      {/* ── Info grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Personal Details */}
        <ProfileCard icon={<HiUser className="h-4 w-4" />} title="Personal Details">
          <InfoRow label="Age" value={age} />
          <InfoRow
            label="Gender"
            value={gender && <span className="capitalize">{gender}</span>}
          />
          <InfoRow label="Date of Birth" value={formattedBirth} />
          <InfoRow label="Blood Group" value={bloodGroup} />
          <InfoRow label="Height" value={height ? `${height} cm` : null} />
          <InfoRow label="Weight" value={weight ? `${weight} kg` : null} />
          <InfoRow label="Eye Color" value={eyeColor} />
          {hair && (
            <InfoRow label="Hair" value={`${hair.color} · ${hair.type}`} />
          )}
        </ProfileCard>

        {/* Address */}
        {address && (
          <ProfileCard icon={<HiMapPin className="h-4 w-4" />} title="Home Address">
            <InfoRow label="Street" value={address.address} />
            <InfoRow
              label="City"
              value={
                address.city
                  ? `${address.city}${address.stateCode ? `, ${address.stateCode}` : ""}`
                  : null
              }
            />
            <InfoRow label="Postal Code" value={address.postalCode} />
            <InfoRow label="Country" value={address.country} />
          </ProfileCard>
        )}

        {/* Work */}
        {company && (
          <ProfileCard icon={<HiBriefcase className="h-4 w-4" />} title="Work">
            <InfoRow label="Company" value={company.name} />
            <InfoRow label="Title" value={company.title} />
            <InfoRow label="Department" value={company.department} />
            {company.address?.city && (
              <InfoRow
                label="Office"
                value={`${company.address.city}, ${company.address.country}`}
              />
            )}
          </ProfileCard>
        )}

        {/* Education */}
        {university && (
          <ProfileCard
            icon={<HiAcademicCap className="h-4 w-4" />}
            title="Education"
          >
            <InfoRow label="University" value={university} />
          </ProfileCard>
        )}

        {/* Banking */}
        {bank && (
          <ProfileCard
            icon={<HiCreditCard className="h-4 w-4" />}
            title="Banking"
          >
            <InfoRow label="Card Type" value={bank.cardType} />
            <InfoRow label="Expires" value={bank.cardExpire} />
            <InfoRow label="Currency" value={bank.currency} />
            <InfoRow label="IBAN" value={bank.iban} />
          </ProfileCard>
        )}

        {/* Crypto */}
        {crypto && (
          <ProfileCard
            icon={<HiCurrencyDollar className="h-4 w-4" />}
            title="Crypto"
          >
            <InfoRow label="Coin" value={crypto.coin} />
            <InfoRow label="Network" value={crypto.network} />
            <InfoRow
              label="Wallet"
              value={
                <span className="break-all font-mono text-xs">
                  {crypto.wallet}
                </span>
              }
            />
          </ProfileCard>
        )}

      </div>
    </div>
  );
}

// ── Internal helpers ───────────────────────────────────────────────────────────

type ProfileCardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function ProfileCard({ icon, title, children }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-slate-500">
        {icon}
        <h2 className="text-xs font-semibold uppercase tracking-wide">
          {title}
        </h2>
      </div>
      <dl className="space-y-2.5">{children}</dl>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

function InfoRow({ label, value }: InfoRowProps) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div className="flex items-start gap-3 text-sm">
      <dt className="w-28 shrink-0 text-xs font-medium text-slate-400">
        {label}
      </dt>
      <dd className="min-w-0 text-slate-700">{value}</dd>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <svg
        className="h-7 w-7 animate-spin text-slate-300"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </div>
  );
}

export default UserProfilePage;
