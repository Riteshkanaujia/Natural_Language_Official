import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl text-black mb-6">
              About{" "}
              <span style={{ color: "var(--neon-blue)" }}>Arecibo 2.0</span>
            </h2>

            <p className="text-lg text-black leading-relaxed">
              Arecibo 2.0 represents the future of radio astronomy and space
              exploration. Building upon the legacy of the original Arecibo
              Observatory, this next-generation project combines cutting-edge
              technology with innovative design to push the boundaries of our
              understanding of the universe.
            </p>

            <p className="text-lg text-black leading-relaxed">
              Our advanced radio telescope array will enable unprecedented
              observations of distant galaxies, pulsars, and potentially
              habitable exoplanets. With enhanced sensitivity and resolution,
              Arecibo 2.0 will serve as humanity's premier window into the
              cosmos.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center">
                <div
                  className="text-3xl mb-2"
                  style={{ color: "var(--neon-blue)" }}
                >
                  305m
                </div>
                <div className="text-gray-600">Primary Dish</div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl mb-2"
                  style={{ color: "var(--neon-purple)" }}
                >
                  24/7
                </div>
                <div className="text-gray-600">Operations</div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1708795835241-9bd31ea9dea7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Arecibo 2.0 Radio Telescope"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--neon-blue)]/10 to-[var(--neon-purple)]/10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
