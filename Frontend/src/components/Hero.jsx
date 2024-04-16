import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
   <>
   <div className='hero container' >
      <div className='banner' > 
      <h1>{title}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sed reprehenderit dignissimos nesciunt assumenda incidunt iusto hic sint officia, nobis non? Ducimus, voluptatem modi blanditiis sapiente facilis minus a inventore minima delectus repudiandae quis nemo nisi similique ad quisquam sequi molestias repellat cumque vitae impedit porro? Obcaecati atque delectus porro!
      </p>
      </div>
   <div className='banner' >
     <img src={imageUrl} alt="Hero image" className='animated-image' />
     </div>
   </div>
   </>
  )
}

export default Hero