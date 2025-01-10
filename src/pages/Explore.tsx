import Nigeria from "@react-map/nigeria";
import { useNavigate } from "react-router-dom";
import OuterPage from "../layouts/OuterPage";
import { StateCard } from "../component/forms/StateCard";
import { mobileStateData } from "../data";

const Explore = () => {
  const navigate = useNavigate();
  return (
    <OuterPage>
      <div className="px-8">
        <p className="font-semibold text-2xl md:text-[40px] pt-4 md:pt-14">
          Exploring Nigeria: Dive Deeper with our Interactive Map
        </p>
        <p className="font-normal text-base md:text-xl py-2 md:py-5">
          Hover and click on any state to learn more about them.
        </p>
        <div className="hidden md:flex items-center justify-center">
          <Nigeria
            // onSelect={toast}
            size={7000}
            hoverColor="#008000"
            strokeColor="#008000"
            selectColor="#008000"
            strokeWidth={1}
            type="select-single"
            hints
            onSelect={(state: string) => navigate(`/explore/${state}`)}
          />
        </div>

        <section className="md:hidden">
          {mobileStateData.map(({ id, image, name }) => {
            return (
              <div
                className=""
                key={id}
                onClick={() => navigate(`/explore/${name}`)}
              >
                <StateCard flagUrl={image} stateName={name} />
              </div>
            );
          })}
        </section>
      </div>
    </OuterPage>
  );
};

export { Explore };
