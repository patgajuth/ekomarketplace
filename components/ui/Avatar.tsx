import { ProfilIcon } from "../icons";

type AvatarProps = {
  src?: string;
};

function Avatar({ src }: AvatarProps) {
  return (
    <div className="flex w-10 h-10 rounded-full justify-center items-center border-2 border-[var(--textColor-tertiary)] bg-[var(--color-primary)] overflow-hidden">
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <ProfilIcon className="text-[var(--color-tile)] text-xl" />
      )}
    </div>
  );
}
export default Avatar;
