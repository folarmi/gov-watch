import Nigeria from "@react-map/nigeria";
import { useNavigate } from "react-router-dom";
import OuterPage from "../layouts/OuterPage";

const Explore = () => {
  const navigate = useNavigate();
  return (
    <OuterPage>
      <div className="px-8">
        <p className="font-semibold text-[40px] pt-14">
          Exploring Nigeria: Dive Deeper with our Interactive Map
        </p>
        <p className="font-normal text-xl py-5">
          Hover and click on any state to learn more about them.
        </p>
        <div className="flex items-center justify-center">
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
      </div>
    </OuterPage>
  );
};

export { Explore };
