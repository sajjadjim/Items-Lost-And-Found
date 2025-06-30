import React from 'react';

const ContactPage = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className=" shadow-2xl rounded-2xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Section */}
        <div className="bg-blue-500  text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4">Let's Talk</h2>
            <p className="text-lg">We’d love to hear from you! Whether you have a question or just want to say hi.</p>
          </div>
          <div className="mt-10 space-y-3">
            <p><strong>📍 Address:</strong> Ashulia City , Dhaka , Bangladesh</p>
            <p><strong>📞 Phone:</strong> +880 1234-567890</p>
            <p><strong>✉️ Email:</strong> sajjadjim.cse@gmail.com</p>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="p-10">
          <form className="space-y-6">
            <div>
              <label className="block  text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-2 border rounded-lg border-blue-500 focus:outline-none "
              />
            </div>

            <div>
              <label className="block  text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border rounded-lg border-blue-500 focus:outline-none focus:ring-2 "
              />
            </div>

            <div>
              <label className="block  text-sm font-bold mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 "
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
