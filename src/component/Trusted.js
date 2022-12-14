import React from "react";

const Trusted = () => {
  return (
    <div>
      <div className="App">
        <h1 className="text-5xl font-bold">It's All About Bikes</h1>
      </div>
      <section className="p-4 lg:p-8 text-gray-100">
        <div className="container mx-auto space-y-12">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQuP9pT5dFnY7T9zfOBiYK0bpA1X9yomO2g&usqp=CAU"
              alt=""
              className="h-80 bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-gray-300 text-gray-900">
              <span className="text-xs uppercase text-gray-900">
                Join, it's free
              </span>
              <h3 className="text-3xl font-bold">
                We're not reinventing the wheel
              </h3>
              <p className="my-6 text-gray-900">
                We're ready to server you. You'll fine the bestest quality here
              </p>
              <button type="button" className="self-start">
                Action
              </button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwCJhNSRo8Ys90WZ5MnOdd46FsKPz6v-GAg&usqp=CAU"
              alt=""
              className="h-80 bg-gray-500 aspect-video"
            />
            <div className="flex flex-col justify-center flex-1 p-6 bg-gray-300 text-gray-900">
              <span className="text-xs uppercase text-gray-900">
                Join, it's free
              </span>
              <h3 className="text-3xl font-bold text-gray-900">
                We're not reinventing the wheel
              </h3>
              <p className="my-6 text-gray-900">
                We're ready to server you. You'll fine the bestest quality here
              </p>
              <button type="button" className="self-start">
                Action
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trusted;
