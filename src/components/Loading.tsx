import loading from "../assets/icons/loading.svg";

function Loading() {
  return (
    <figure className="absolute-center h-full">
      <img src={loading} alt="Gooey Balls" />
    </figure>
  );
}

export default Loading;
