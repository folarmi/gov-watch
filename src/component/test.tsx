import Nigeria from "@react-map/nigeria";

const Test = () => {
  return (
    <div className="flex items-center justify-center">
      <Nigeria
        // onSelect={toast}
        size={1600}
        hoverColor="#008000"
        strokeColor="#008000"
        selectColor="#008000"
        strokeWidth={1}
        type="select-single"
        hints
        onSelect={(state: string) => console.log(state)}
      />
    </div>
  );
};

export default Test;
