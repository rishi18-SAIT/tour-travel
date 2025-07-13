

import React from 'react';
import Slider from 'react-slick';
import Rishi from '../../assets/images/Rishi.jpg'
import Rishav from '../../assets/images/Rishav.jpg'
import Aditi from '../../assets/images/Aditi.jpg'
import Raunak from '../../assets/images/Raunak.jpg'
import Rishi1 from '../../assets/images/Rishi1.jpg'


const Testimonials = () => {


    const settings = {
        dots: true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive: [
            {
         breakpoint:992,
         settings: {
            slidesToShow: 2,
            slidetoScroll: 1,
            infinite: true,
            dots: true,
         },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidetoScroll: 1,
            },
        },



            

        ]

    }
  return(
 <Slider { ...settings}>
    <div className="testimonial py-4 px-3">

        <p> I’ve booked with many platforms, but this one stands out for its smooth interface and amazing customer support. Highly recommend! .</p>
    <div className ="d-flex-align-items-center gap-4 mt-3">
        <img src ={Rishi} className ='w-25 h-25 rounded-2'alt ="" />

        <div>
            <h6 className="mb-0 mt-3">Rishikesh Ranjan</h6>
            <p>Customer</p>
        </div>
    </div>
    
    </div>
    <div className="testimonial py-4 px-3">

<p>Absolutely seamless experience! Booking was quick, easy, and the tour itself was unforgettable. Already planning my next trip! </p>
<div className ="d-flex-align-items-center gap-4 mt-3">
<img src ={Aditi} className ='w-25 h-25 rounded-2'alt ="" />

<div>
    <h6 className="mb-0 mt-3">Aditi</h6>
    <p>Customer</p>
</div>
</div>

</div>
<div className="testimonial py-4 px-3">

<p> Booked a spontaneous weekend getaway and it was one of the best travel decisions I’ve ever made. Thanks to this platform! </p>
<div className ="d-flex-align-items-center gap-4 mt-3">
<img src ={Rishav} className ='w-25 h-25 rounded-2'alt ="" />

<div>
    <h6 className="mb-0 mt-3">Rishav </h6>
    <p>Customer</p>
</div>
</div>

</div>
<div className="testimonial py-4 px-3">

        <p>You made our family trip so special! The personal touches and thoughtful planning made it a memorable adventure for all of us.</p>
    <div className ="d-flex-align-items-center gap-4 mt-3">
        <img src ={Raunak} className ='w-25 h-25 rounded-2'alt ="" />

        <div>
            <h6 className="mb-0 mt-3">Raunak</h6>
            <p>Customer</p>
        </div>
    </div>
    
    </div>
    <div className="testimonial py-4 px-3">

<p>Simply outstanding! I’ve traveled with many tour companies, but none compared to this. Truly a top-notch experience!"</p>
<div className ="d-flex-align-items-center gap-4 mt-3">
<img src ={Rishi1} className ='w-25 h-25 rounded-2'alt ="" />

<div>
    <h6 className="mb-0 mt-3">Ricky</h6>
    <p>Customer</p>
</div>
</div>

</div>

 </Slider>


  )
}

export default Testimonials
