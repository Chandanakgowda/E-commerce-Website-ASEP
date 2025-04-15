const NewslatterBox = () => {
  const onsubmithandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className=" text-2xl font-medium text-gray-800">
        Subsribe Now & Get 20% Off
      </p>
      <p className="text-gray-400 mt-3">
        Stay updated with the latest trends, exclusive offers, and new arrivals!
        Subscribe to our newsletter and never miss out on exciting updates.
      </p>

      <form
        onSubmit={onsubmithandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter Your Email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewslatterBox;
