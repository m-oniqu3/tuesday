import { Link } from "react-router";

type Props = {
  name: string;
  className?: string;
};

function Avatar({ name, className = "" }: Props) {
  return (
    <Link
      to={`/${name}`}
      className={`size-9 text-xs sm:text-sm md:text-md lg:text-base text-neutral-800 gray rounded-full gray  flex-center ${className}`}
    >
      {String(name)[0]}
    </Link>
  );
}

export default Avatar;
