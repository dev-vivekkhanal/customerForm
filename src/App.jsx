import { useState } from "react";
import logo from "./assets/logo.png";
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import img5 from "./assets/5.png";

function App() {
  // local variables
  const experienceFaces = [
    {
      image: img1,
      text: "Disappointed",
    },
    {
      image: img2,
      text: "Bad",
    },
    {
      image: img3,
      text: "Neutral",
    },
    {
      image: img4,
      text: "Good",
    },
    {
      image: img5,
      text: "Excellent",
    },
  ];
  const importantFields = ["name", "mobile"];

  // states
  const [activeForm, setActiveForm] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    rating: null,
    feedback: "",
  });

  // functions
  const onFormSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);

    // check if all important fields are filled
    const allFieldsFilled = importantFields.every((field) => !!formData[field]);

    // error handling
    if (!allFieldsFilled) {
      setErrorStatus(true);
      console.log("Please fill in all important fields");
      return;
    }

    // send api call or anyother task with the submitted details
    console.log("Submitted Data:", formData);
    setFormData({
      name: "",
      mobile: "",
      rating: null,
      feedback: "",
    });
    setActiveForm(false);
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-[#fefefe]">
      <div className="w-full max-w-[30rem] mx-auto p-5">
        <header>
          <img src={logo} alt="logo" className="w-28 mx-auto" />
        </header>
        {activeForm ? (
          <section>
            <h1 className="my-10 text-center text-2xl md:text-3xl font-semibold roboto-medium">
              How was your experience?
            </h1>
            <form className="text-[#1e1e1e]" onSubmit={onFormSubmit}>
              <label htmlFor="name" className="font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                className="block w-full outline-none border-1 border rounded-md p-2 mb-5"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e?.target?.value,
                  })
                }
              />
              <label htmlFor="mobile" className="font-medium">
                Mobile No. <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                className="block w-full outline-none border-1 border rounded-md p-2 mb-5"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e?.target?.value,
                  })
                }
              />
              <div className="mb-5">
                <h2 className="font-medium">Rate your experience</h2>
                <div className="flex justify-evenly mt-5">
                  {experienceFaces?.map((faces, index) => {
                    return (
                      <div key={index} className="p-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              rating: index + 1,
                            });
                          }}
                          className="group"
                        >
                          <img
                            src={faces.image}
                            alt={index}
                            className={`max-w-[50px] transition-all group-hover:scale-105 hover:grayscale-0 group-hover:opacity-100 mx-auto ${
                              formData.rating === index + 1
                                ? `scale-105   rounded-full`
                                : formData.rating !== null
                                ? "opacity-50"
                                : ""
                            }`}
                          />
                          <p
                            className={`text-xs text-gray-500 text-center   transition-all mt-1 ${
                              formData.rating === index + 1
                                ? "visible"
                                : "group-hover:visible invisible"
                            }`}
                          >
                            {faces.text}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <label htmlFor="feedback" className="font-medium">
                Please provide your feedback
              </label>
              <textarea
                name="feedback"
                id=""
                cols="30"
                rows="5"
                placeholder="Write here..."
                className="block w-full outline-none border-1 border rounded-md p-2 mb-5"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feedback: e?.target?.value,
                  })
                }
                value={formData.feedback}
              ></textarea>
              {errorStatus && (
                <div className="flex items-center text-xs text-red-500 font-semibold gap-2 mb-5">
                  <p className="text-sm aspect-square w-5 flex justify-center items-center font-semibold rounded-full border-red-500 border animate-bounce">
                    !
                  </p>{" "}
                  <p>Please fill in all important fields</p>
                </div>
              )}
              <button className="w-full p-3 bg-amber-500 rounded-md font-semibold text-white">
                Submit
              </button>
            </form>
          </section>
        ) : (
          <div>
            <h1 className="my-10 text-center text-2xl md:text-3xl font-semibold roboto-medium">
              Thank you for your valuable feedback
            </h1>
            <div className="text-sm text-gray-500 flex gap-2 justify-center items-center">
              <h1>Want to submit more feedback?</h1>{" "}
              <button
                className="underline hover:text-blue-500"
                onClick={() => setActiveForm(true)}
              >
                Click here
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
