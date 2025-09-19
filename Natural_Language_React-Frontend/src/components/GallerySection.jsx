import { useState } from "react";
import { motion } from "framer-motion"; // ✅ correct import

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1475906067486-6c5bd3aa9c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Advanced Research Technology",
  },
  {
    src: "https://images.unsplash.com/photo-1652806724292-381ff63977b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Night Sky Observations",
  },
  {
    src: "https://images.unsplash.com/photo-1745697213293-21d6c972ac1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Research Facility Operations",
  },
  {
    src: "https://images.unsplash.com/photo-1653189677831-f0299b16ddb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Satellite Dish Array",
  },
  {
    src: "https://images.unsplash.com/photo-1657344956545-8f49e1b1f661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Space Exploration Equipment",
  },
  {
    src: "https://images.unsplash.com/photo-1694230155228-cdde50083573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    caption: "Futuristic Laboratory",
  },
];

export default function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState(null); // ✅ plain React

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-6">Gallery</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the cutting-edge technology and facilities that make Arecibo
            2.0 possible
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Dark Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              {/* Caption */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-center">
                  <h3 className="text-xl text-white mb-2">{image.caption}</h3>
                  <div
                    className="w-12 h-0.5 mx-auto"
                    style={{ backgroundColor: "var(--neon-blue)" }}
                  ></div>
                </div>
              </div>

              {/* Neon Border */}
              <div
                className={`absolute inset-0 border-2 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "border-[var(--neon-blue)] shadow-lg shadow-[var(--neon-blue)]/20"
                    : "border-transparent"
                }`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
