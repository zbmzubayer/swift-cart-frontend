export default function About() {
  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">About Swift Cart</h1>
        <p className="mt-4 text-lg text-gray-500">
          Welcome to Swift Cart, your trusted multi-vendor e-commerce platform.
        </p>
        <h2 className="mt-8 text-xl font-semibold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-500">
          Our mission is to revolutionize the way people shop online by providing a seamless and enjoyable shopping
          experience. We aim to bring together a diverse range of products and sellers on a single platform while
          prioritizing customer satisfaction and seller success.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">Our Team</h2>
        <p className="mt-4 text-lg text-gray-500">
          Swift Cart is powered by a passionate and dedicated team of individuals who are committed to delivering
          excellence. Meet the minds behind our success:
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team member cards */}
          <div className="border border-gray-200 rounded-lg p-6">
            <img
              src="https://i.ibb.co/2ZnqLXc/zubayerzbm.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900">ZBM</h3>
            <p className="text-gray-500">Co-Founder & CEO</p>
          </div>
          {/* Add more team member cards */}
        </div>

        <h2 className="mt-8 text-xl font-semibold text-gray-900">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-500">Have questions or feedback? We'd love to hear from you!</p>
        <div className="mt-4">{/* Contact form or contact information */}</div>
      </div>
    </div>
  );
}
