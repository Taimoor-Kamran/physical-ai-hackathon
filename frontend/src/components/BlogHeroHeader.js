import React from "react";
import Heading from "@theme/Heading";

function BlogHeroHeader() {
    return (
        <header className="blog-header">
            <div className="text-center py-16 bg-transparent dark:bg-transparent text-white dark:text-white">
                <h1 className="blog-title">
                    Physical AI & Humanoid Robotics Blog
                </h1>
                <p className="blog-subtitle text-lg">
                    Latest updates from the frontier of embodied AI
                </p>
                <p className="text-center text-lg mt-4 font-medium text-gray-700">
                    Building the Future of Embodied Intelligence
                </p>
                <p className="text-center text-base mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Join us as we explore cutting-edge humanoid robotics, ROS 2,
                    Gazebo simulations, and real-world deployment. From theory
                    to hardware — everything you need to master Physical AI.
                </p>
                <a
                    href="/docs/introduction"
                    className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                >
                    Start Your Physical AI Journey →
                </a>
                <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
                    Explore comprehensive modules, hands-on labs, and expert
                    insights to master the future of AI. This text ensures the
                    footer aligns correctly.
                </p>
            </div>
        </header>
    );
}

export default BlogHeroHeader;
