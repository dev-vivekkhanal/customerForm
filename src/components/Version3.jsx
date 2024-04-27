import { useEffect, useState } from "react";
import img1 from "../assets/1.svg";
import img2 from "../assets/2.svg";
import img3 from "../assets/3.svg";
import img4 from "../assets/4.svg";
import img5 from "../assets/5.svg";
import circle from "../assets/circleLogo.png";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Version3() {
  // local variables
  const experienceFaces = [
    {
      image: img1,
      text: "Very Bad",
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
      text: "Very Good",
    },
  ];
  const importantFields = ["name", "mobile"];
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // states
  const [activeForm, setActiveForm] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    rating: null,
    feedback: "",
    bid: null,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      bid: searchParams.get("bid"),
    });

    return () => {
      setFormData({
        name: "",
        mobile: "",
        rating: null,
        feedback: "",
        bid: null,
      });
    };
  }, []);

  // functions
  const onFormSubmit = (e) => {
    e.preventDefault();
    setErrorStatus(false);

    // check if all important fields are filled
    const allFieldsFilled = importantFields.every((field) => !!formData[field]);

    // input precheck / validator
    if (!allFieldsFilled) {
      setErrorStatus(true);
      console.warn("Please fill in all important fields");
      return;
    }

    // send api call or anyother task with the submitted details
    console.log("Submitted Data:", formData);
    const formDatas = new FormData();

    for (const key in formData) {
      formDatas.append(key, formData[key]);
    }

    // Submit POST request
    axios
      .post("https://andaal.in/gbm/api/submit_feedback", formDatas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setActiveForm(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong! Please try again.");
      });
  };

  return (
    <main className="min-h-screen bg-[#fefefe] min-w-[430px]">
      <div className="w-full max-w-[30rem] mx-auto p-5 pt-0">
        <header className="flex justify-center items-center gap-5 mb-2">
          <img src={circle} alt="logo" className="w-14" />
        </header>

        <section>
          <h1 className="mb-2 text-center text-3xl md:text-4xl font-semibold roboto-medium">
            How was your experience?
          </h1>
          <form className="text-[#111111] text-2xl" onSubmit={onFormSubmit}>
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
              <div className="flex justify-evenly mt-2">
                {experienceFaces?.map((faces, index) => {
                  return (
                    <div key={index} className="">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData({
                            ...formData,
                            rating: index + 1,
                          });
                        }}
                        className="group space-y-1"
                      >
                        <img
                          src={faces.image}
                          alt={index}
                          className={`max-w-[50px] transition-all group-hover:scale-105 hover:grayscale-0  mx-auto ${
                            formData.rating === index + 1
                              ? `scale-105   rounded-full`
                              : formData.rating !== null
                              ? "opacity-20"
                              : ""
                          }`}
                        />
                        {index === 0 || index === experienceFaces.length - 1 ? (
                          <span className="text-sm">{faces.text}</span>
                        ) : (
                          ""
                        )}
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
              rows="7"
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
            {activeForm ? (
              <button className="w-full p-3 bg-amber-500 rounded-md font-semibold text-white">
                Submit
              </button>
            ) : (
              <div>
                <h1 className="my-10 text-center text-2xl md:text-3xl font-semibold roboto-medium bg-green-500 text-white">
                  Thank you for your valuable feedback
                </h1>
              </div>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}

export default Version3;
