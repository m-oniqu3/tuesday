import { Link } from "react-router";

type Props = {
  name: string;
};

function Avatar({ name }: Props) {
  return (
    <Link
      to={`/${name}`}
      className="size-7 text-xs uppercase rounded-full bg-neutral-800 text-white flex-center"
    >
      {String(name)[0]}
    </Link>
  );
}

export default Avatar;
