export default function Support() {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Support Center</h1>
        <p className="mt-4 text-lg text-gray-500">
          Welcome to Swift Cart's Support Center. We are here to assist you with any questions or issues you may have.
        </p>

        {/* Frequently Asked Questions */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-4">
            {/* FAQ items */}
            <div className="mb-4">
              <button className="text-left text-gray-900 hover:text-indigo-600 focus:outline-none focus:text-indigo-600">
                How do I create an account on Swift Cart?
              </button>
              <div className="mt-2 text-gray-500">
                To create an account on Swift Cart, click the "Sign Up" button in the top right corner of the page and
                follow the instructions.
              </div>
            </div>
            {/* Add more FAQ items */}
          </div>
        </section>

        {/* Contact Support */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
          <div className="mt-4">
            <p className="text-gray-500">
              If you need further assistance or have a specific inquiry, please don't hesitate to contact our support
              team.
            </p>
            <button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded">
              Contact Support
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
