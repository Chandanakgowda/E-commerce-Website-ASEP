import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewslatterBox from "../components/Newslaterbox";
const About = () => {
  return (
    <div className="">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-justify">
          <p>
            Welcome to Department Store, where quality meets convenience!
            Established with a vision to provide exceptional shopping
            experiences, we are your one-stop destination for everything you
            need. From fashion and accessories to electronics, home essentials,
            and beyond, we take pride in offering a wide range of products that
            cater to your lifestyle. Our commitment to excellence and customer
            satisfaction has been the cornerstone of our journey.
          </p>
          <p>
            At Department Store, we constantly strive to bring you the best,
            staying ahead of trends and ensuring value for your money. Whether
            you shop online or in-store, we promise a seamless and delightful
            experience. Thank you for choosing us as your trusted shopping
            partner. Let’s make everyday extraordinary together!
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to enrich lives by providing high-quality products
            and exceptional service. We aim to create a seamless shopping
            experience that combines convenience, affordability, and innovation.
            We are committed to fostering trust, exceeding expectations, and
            making every visit to our store a step toward enhancing your
            lifestyle. Together, let’s build a community centered around
            quality, value, and satisfaction.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quantity Assurance :</b>
          <p className="text-gray-600 text-center">
            we prioritize your satisfaction by ensuring the availability of
            top-quality products in sufficient quantities. Our commitment is to
            maintain a well-stocked inventory that meets your needs, whether
            you&apos;re shopping for everyday essentials or special items. We
            take pride in delivering consistency, reliability, and excellence,
            ensuring you never have to compromise on your choices.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-600 text-center">
            we are dedicated to providing you with a seamless shopping
            experience, whether in-store or online. From easy navigation to
            quick checkouts and reliable delivery, every aspect of our service
            is designed with your convenience in mind. Because your time and
            comfort matter to us!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service :</b>
          <p className="text-gray-600 text-center">
            Our customers are at the heart of everything we do. We are committed
            to providing exceptional service that exceeds your expectations at
            every step. From personalized assistance and prompt responses to
            creating a welcoming shopping environment, we strive to make your
            experience unforgettable. Your satisfaction is our priority, and
            we&apos;re here to ensure you always feel valued and appreciated.
          </p>
        </div>
      </div>
      <NewslatterBox />
    </div>
  );
};

export default About;
