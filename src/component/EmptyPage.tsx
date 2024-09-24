const EmptyPage = () => {
  return (
    <div className="flex items-center justify-center h-screen  my-3">
      <div className="w-1/2">
        <img src="./emptyPage.svg" alt="emptyPageImage" />
      </div>
      {/* <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          No Data Available
        </h1>
        <p className="text-gray-500 mt-2">Please check back later.</p>
      </div> */}
    </div>
  );
};

export default EmptyPage;
