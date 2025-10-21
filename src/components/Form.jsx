"use client";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";

const Form = () => {
  const [value, setValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scope, animate] = useAnimate();
  const [error, setError] = useState("");
  const refe = useRef();

  const initrial = (value) => {
    setValue(value);

    // Reset form if it was previously submitted
    if (isSubmitted) {
      setIsSubmitted(false);
      setError("");

      // Reset button styling
      animate("button", {
        width: "200px",
        borderRadius: "1rem",
        backgroundColor: "rgb(253 230 138)",
      });

      // Show button text
      animate(".butt-text", {
        opacity: 1,
        display: "inline",
      });

      // Hide checkmark icon
      animate(".iconify", {
        opacity: 0,
      });
    }
  };

  const startAnimating = async () => {
    animate(".loader", {
      display: "inline-block",
    });
    animate(
      ".loader",
      {
        opacity: [0, 1],
      },
      {
        duration: 0.3,
        ease: "linear",
      }
    );
    await animate(
      "button",
      {
        rotateX: 20,
        rotateY: 20,
      },
      {
        duration: 5,
        ease: "easeInOut",
      }
    );
    await animate(
      ".loader",
      {
        rotate: 360 * 2,
      },
      {
        duration: 2,
        ease: "easeOut",
      }
    );
    await animate(
      ".loader",
      {
        display: "none",
      },
      {
        duration: 0.1,
        ease: "linear",
      }
    );
    await animate(
      animate(
        ".butt-text",
        {
          opacity: 0,
          display: "none",
        },
        {
          duration: 0.2,
          ease: "linear",
        }
      )
    );
    await animate(
      "button",
      {
        width: "3rem",
        borderRadius: "50%",
        backgroundColor: "var(--color-green-200)",
      },
      {
        duration: 0.3,
        ease: "linear",
      }
    );
    animate(
      "button",
      {
        scale: [1, 1.2, 0.8, 1],
      },
      {
        duration: 0.5,
        ease: "linear",
      }
    );
    animate(
      ".iconify",
      {
        opacity: [0, 0.5, 1],
      },
      {
        duration: 1,
        ease: "linear",
      }
    );
  };
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  const params = useParams();
  const createData = async (e) => {
    e.preventDefault();
    if (isSubmitted) return;
    try {
      const dataId = params?.id;
      if (!value.match(regexEmail)) {
        setError("Please enter a valid email address!");
        return;
      }
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dataId, value }),
      });
      if (!response.ok) {
        const errData = response.json();
        setError(errData.message);
        return;
      }
      const data = await response.json();

      setError("");
      await startAnimating();
      setIsSubmitted(true);
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <form onSubmit={createData}>
      <div className="relative group flex gap-5">
        <input
          type="email"
          className="w-[300px] border border-black px-2 py-1 rounded-md bg-indigo-200 text-black outline-none pt-2.5"
          onChange={(e) => initrial(e.target.value)}
          value={value}
          name="emailId"
          required
        />
        <div
          className={`${
            value === ""
              ? "top-2.5 left-3 text-lg tracking-wider group-focus-within:scale-75 group-focus-within:-top-1 group-focus-within:left-1 group-focus-within:tracking-tight transition-all duration-200 linear absolute text-neutral-500"
              : "absolute text-neutral-500 scale-75 text-lg -top-1 left-1 tracking-tight"
          }`}
        >
          Email
        </div>

        <div ref={scope} className="flex justify-center items-center">
          <motion.button
            ref={refe}
            whileHover={
              !isSubmitted
                ? {
                    rotateX: 20,
                    rotateY: 20,
                    boxShadow: "0px 5px 8px rgba(175, 22, 42, 0.1)",
                  }
                : {}
            }
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            type="submit"
            disabled={isSubmitted}
            className={`flex justify-center items-center gap-2 text-lg text-black p-2 border rounded-2xl border-gray-600 bg-amber-200 w-[200px] ${
              isSubmitted ? "cursor-default" : "cursor-pointer hover:shadow-2xl"
            } transition-shadow duration-300 ease-in-out h-12`}
          >
            <motion.svg
              initial={{
                opacity: 0,
              }}
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="loader hidden"
            >
              <path
                d="M7.706 0.290 C 7.484 0.362,7.356 0.490,7.294 0.699 C 7.259 0.816,7.253 1.088,7.253 2.508 C 7.253 4.389,7.251 4.365,7.443 4.557 C 7.700 4.813,8.300 4.813,8.557 4.557 C 8.749 4.365,8.747 4.389,8.747 2.508 C 8.747 0.688,8.744 0.656,8.596 0.480 C 8.472 0.333,8.339 0.284,8.040 0.276 C 7.893 0.272,7.743 0.278,7.706 0.290 M2.753 2.266 C 2.595 2.338,2.362 2.566,2.281 2.728 C 2.197 2.897,2.193 3.085,2.269 3.253 C 2.343 3.418,4.667 5.750,4.850 5.843 C 5.109 5.976,5.375 5.911,5.643 5.649 C 5.907 5.391,5.977 5.111,5.843 4.850 C 5.750 4.667,3.418 2.343,3.253 2.269 C 3.101 2.200,2.901 2.199,2.753 2.266 M12.853 2.282 C 12.730 2.339,12.520 2.536,11.518 3.541 C 10.597 4.464,10.316 4.762,10.271 4.860 C 10.195 5.025,10.196 5.216,10.272 5.378 C 10.342 5.528,10.572 5.764,10.727 5.845 C 10.884 5.927,11.117 5.926,11.280 5.843 C 11.447 5.757,13.757 3.447,13.843 3.280 C 13.926 3.118,13.927 2.884,13.846 2.729 C 13.764 2.572,13.552 2.364,13.392 2.283 C 13.213 2.192,13.048 2.192,12.853 2.282 M0.699 7.292 C 0.404 7.385,0.258 7.620,0.258 7.999 C 0.259 8.386,0.403 8.618,0.698 8.706 C 0.816 8.741,1.079 8.747,2.508 8.747 C 3.997 8.747,4.196 8.742,4.318 8.702 C 4.498 8.644,4.644 8.498,4.702 8.318 C 4.788 8.053,4.745 7.677,4.608 7.491 C 4.578 7.451,4.492 7.384,4.417 7.343 L 4.280 7.267 2.547 7.261 C 1.152 7.257,0.791 7.263,0.699 7.292 M11.745 7.278 C 11.622 7.308,11.452 7.411,11.392 7.492 C 11.255 7.677,11.212 8.053,11.298 8.318 C 11.356 8.498,11.502 8.644,11.682 8.702 C 11.804 8.742,12.003 8.747,13.492 8.747 C 14.921 8.747,15.184 8.741,15.302 8.706 C 15.597 8.618,15.741 8.386,15.742 7.999 C 15.742 7.614,15.595 7.383,15.290 7.291 C 15.187 7.260,14.864 7.254,13.496 7.256 C 12.578 7.258,11.790 7.268,11.745 7.278 M4.853 10.282 C 4.730 10.339,4.520 10.536,3.518 11.541 C 2.597 12.464,2.316 12.762,2.271 12.860 C 2.195 13.025,2.196 13.216,2.272 13.378 C 2.342 13.528,2.572 13.764,2.727 13.845 C 2.884 13.927,3.117 13.926,3.280 13.843 C 3.447 13.757,5.757 11.447,5.843 11.280 C 5.926 11.118,5.927 10.884,5.846 10.729 C 5.764 10.572,5.552 10.364,5.392 10.283 C 5.213 10.192,5.048 10.192,4.853 10.282 M10.753 10.266 C 10.595 10.338,10.362 10.566,10.281 10.728 C 10.197 10.897,10.193 11.085,10.269 11.253 C 10.343 11.418,12.667 13.750,12.850 13.843 C 13.109 13.976,13.375 13.911,13.643 13.649 C 13.907 13.391,13.977 13.111,13.843 12.850 C 13.750 12.667,11.418 10.343,11.253 10.269 C 11.101 10.200,10.901 10.199,10.753 10.266 M7.745 11.277 C 7.620 11.309,7.451 11.412,7.392 11.492 C 7.254 11.678,7.253 11.691,7.253 13.489 C 7.253 14.921,7.259 15.184,7.294 15.302 C 7.382 15.597,7.615 15.741,8.000 15.741 C 8.385 15.741,8.618 15.597,8.706 15.302 C 8.768 15.090,8.767 11.875,8.704 11.690 C 8.644 11.514,8.575 11.430,8.420 11.346 C 8.310 11.286,8.246 11.271,8.057 11.264 C 7.930 11.259,7.790 11.265,7.745 11.277 "
                stroke="none"
                fill-rule="evenodd"
                fill="#000000"
              ></path>
            </motion.svg>
            <span className="butt-text">Register</span>
            <motion.svg
              initial={{
                opacity: 0,
              }}
              width="15"
              height="15"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--twemoji"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                fill="#31373D"
                d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
              />
            </motion.svg>
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            layoutId="error"
            initial={{
              opacity: 0,
              filter: "blur(5px)",
            }}
            exit={{
              opacity: 0,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
            className="text-red-500 mt-2 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
export default Form;
