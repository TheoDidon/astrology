import React from "react";

function Description({ isFrench }) {
  return (
    <>
      <div className="h-[100vh] w-[100vw] text-3xl flex justify-center items-center">
        <p className="text-center mx-4">
          {isFrench ? (
            <span>
              Cette page est faite avec React et utilise gsap pour les
              animations
            </span>
          ) : (
            <span>
              This page is made with React and uses gsap for animation
            </span>
          )}
        </p>
      </div>
    </>
  );
}

export default Description;
