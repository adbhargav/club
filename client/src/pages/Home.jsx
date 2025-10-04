import Card from "../components/Card";

const trendingSkills = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "AI in Robotics",
  "Data Science",
];

const highlights = [
  { title: "Workshops", description: "Hands-on AI workshops every semester.", image: "/images/workshop.jpg" },
  { title: "Hackathons", description: "Participate in coding competitions & hackathons.", image: "/images/hackathon.jpg" },
  { title: "Projects", description: "Build real-world AI projects and submit.", image: "/images/projects.jpg" },
];

export default function Home() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">RGMCET AI CLUB</h1>
        <p className="text-lg md:text-2xl mb-6">
          Empowering Students to Explore Artificial Intelligence
        </p>
        <a
          href="/signup"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Join Now
        </a>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          RGMCET AI Club is dedicated to promoting Artificial Intelligence
          knowledge among students. We organize workshops, hackathons, and
          collaborative projects to develop hands-on skills and build a strong AI
          community on campus.
        </p>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto">
          To empower students with AI knowledge and skills, fostering innovation
          and practical problem-solving for the future of technology.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          <div>
            <h3 className="text-4xl font-bold">150+</h3>
            <p className="mt-2">Active Members</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">20+</h3>
            <p className="mt-2">Projects</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="mt-2">Workshops</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">5+</h3>
            <p className="mt-2">Hackathons</p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="bg-black py-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Latest Announcements
          </h2>
          <marquee className="text-gray-300 text-lg">
            🚀 AI Hackathon coming soon • 🧠 ML Workshop next week • 🎯 Submit
            your projects before deadline
          </marquee>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Trending AI Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-purple-50 p-4 rounded-lg text-center font-medium hover:scale-105 transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Professional Highlights */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => (
            <Card
              key={idx}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">AI Workshop</h3>
            <p className="mt-2 text-gray-600">
              Introduction to Machine Learning • 15th Oct 2025
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">Hackathon</h3>
            <p className="mt-2 text-gray-600">
              24hr Coding Challenge • 22nd Oct 2025
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">AI in Robotics</h3>
            <p className="mt-2 text-gray-600">
              Guest Lecture • 30th Oct 2025
            </p>
          </div>
        </div>
      </section>

      {/* Join Banner */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Be Part of the AI Revolution</h2>
        <p className="mb-6 text-lg">
          Join RGMCET AI Club today and shape the future with us.
        </p>
        <a
          href="/signup"
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Join Now
        </a>
      </section>
    </div>
  );
}
