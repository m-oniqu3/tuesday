import { Link } from "react-router";

type Props = {
  name: string;
  className?: string;
};

function Avatar({ name, className = "" }: Props) {
  return (
    <Link
      to={`/${name}`}
      className={`size-7 text-xs uppercase rounded-full bg-neutral-800 text-white flex-center ${className}`}
    >
      {String(name)[0]}
    </Link>
  );
}

export default Avatar;
