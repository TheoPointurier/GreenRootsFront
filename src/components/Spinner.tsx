import { CircleLoader } from "react-spinners";

function Spinner() {
  return (
    <section className="flex justify-center items-center h-auto m-[30vh]">
    <CircleLoader
      color="#6A9C89"
      size={50}
    />
    </section>
  );
}

export default Spinner;