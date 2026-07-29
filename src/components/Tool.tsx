/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  tool: {
    name: string;
    handler: () => void;
    icon: any;
    disabled?: boolean;
  };
};

function Tool(props: Props) {
  const { tool } = props;

  const Icon = tool.icon;

  return (
    <button
      key={tool.name}
      className="rounded-full size-9 flex justify-center items-center gray cursor-pointer transition duration-200 ease-in-out hover:bg-primary-light  "
      disabled={tool.disabled}
      onClick={tool.handler}
    >
      <Icon className="size-3.5 text-neutral-800/60 " />
    </button>
  );
}

export default Tool;
