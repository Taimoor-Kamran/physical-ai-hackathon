import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Book Introduction',
      link: {type: 'doc', id: 'intro'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 1: Introduction to Physical AI',
      link: {type: 'doc', id: 'week1'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 2: Robot Operating System (ROS)',
      link: {type: 'doc', id: 'week2'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 3: Kinematics and Dynamics',
      link: {type: 'doc', id: 'week3'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 4: Sensing and Perception',
      link: {type: 'doc', id: 'week4'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 5: Motion Planning and Control',
      link: {type: 'doc', id: 'week5'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 6: Human-Robot Interaction (HRI)',
      link: {type: 'doc', id: 'week6'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 7: Reinforcement Learning for Robotics',
      link: {type: 'doc', id: 'week7'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 8: Computer Vision for Robotics',
      link: {type: 'doc', id: 'week8'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 9: Natural Language Processing (NLP) for Robotics',
      link: {type: 'doc', id: 'week9'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 10: Advanced Robotics Applications',
      link: {type: 'doc', id: 'week10'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 11: Ethical Considerations in Robotics',
      link: {type: 'doc', id: 'week11'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 12: Future of Physical AI',
      link: {type: 'doc', id: 'week12'},
      items: [],
    },
    {
      type: 'category',
      label: 'Week 13: Project Showcase and Conclusion',
      link: {type: 'doc', id: 'week13'},
      items: [],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
