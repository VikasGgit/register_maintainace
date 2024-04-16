import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who we are</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est cumque
            accusamus quo excepturi, ratione harum dolor fugiat possimus, iste
            corporis odio facere similique tenetur minus eligendi officia
            molestias debitis magnam impedit non rem! Est molestias fuga itaque!
            Nesciunt laudantium, neque debitis corporis,
          </p>
          <p>
     Aspernatur nesciunt veritatis velit, nulla itaque aut blanditiis deserunt fugiat eaque eos animi totam voluptatum fuga quas officiis nemo corporis consequuntur veniam.
          </p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut, est!</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
