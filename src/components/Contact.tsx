import { motion } from 'framer-motion';

export function Contact() {
    return (
        <section id="contact" className="min-h-[80vh] w-full py-20 px-8 relative z-10 flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-2xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Let's Connect</h2>
                <p className="text-center text-white/60 mb-8">
                    Have a project in mind? I'd love to hear from you.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-500 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <textarea
                        placeholder="Message"
                        rows={4}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-blue-400 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </motion.div>
        </section>
    );
}
