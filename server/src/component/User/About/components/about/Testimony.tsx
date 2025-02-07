import man1 from '../../../../../assets/man.jpg';
import man2 from '../../../../../assets/lady.jpg';
import man3 from '../../../../../assets/handsome-young-businessman-suit.jpg';

const Testimony = () => {
  return (
    <section className="py-12 mb-0 text-blue-900 bg-gray-50 sm:py-16">
      <div className="relative mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <p className="text-lg font-medium text-blue-600">What clients say about their experience with us</p>
            <h2 className="mt-4 text-3xl font-bold text-blue-900 sm:text-3xl xl:text-4xl">Client Testimonials</h2>
          </div>

          {/* Testimonials Grid */}
          <div className="relative mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 md:max-w-none md:grid-cols-3 lg:gap-10">
            {[{ img: man1, name: "James Khawalski", title: "CEO, Mavoline",heading:"Integrity Top-Notch", feedback: "Absolutely recommended! The speed and reliability of this courier service are unmatched." },
              { img: man2, name: "Jacob Jones", title: "Youtube Personality",heading:"Absolutely Fast with Delivery", feedback: "Absolutely recommended! The speed and reliability of this courier service are unmatched." },
              { img: man3, name: "Jenny Wilson", title: "Esports Commentator",heading:"Amazing Services", feedback: "Service was amazing! My packages always arrive on time, and tracking is super accurate." }
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col rounded-xl  text-center shadow-xl border-t-4 border-blue-300  shadow-blue-100 p-6 lg:py-7 lg:px-5">
                <p className="px-10 text-xl font-black">{testimonial.heading}</p>
                
                <blockquote className="mt-2 flex-1">
                  <p className="leading-relaxed text-neutral-700">{testimonial.feedback}</p>
                </blockquote>

                {/* Centered Image & Name */}
                <div className="mt-4 flex justify-between gap-1 flex-row items-center">
                  <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full border-4 border-blue-300" />
                  <span className="">
                  <p className="mt-4 text-base font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>

                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
