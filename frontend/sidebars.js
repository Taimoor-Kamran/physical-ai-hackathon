module.exports = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Theory',
      items: [
        'kinematics',
        'dynamics',
        'control-systems',
        'sensors-actuators',
        'perception',
        'localization-mapping',
        'path-planning',
        'manipulation',
        'human-robot-interaction',
        'vla-models',
      ],
    },
    {
      type: 'category',
      label: 'Simulation',
      items: [
        'ros2-gazebo',
        'nvidia-isaac',
      ],
    },
    {
      type: 'category',
      label: 'Hardware',
      items: [
        { type: 'html', value: '<em>Coming Soon</em>', defaultStyle: true },
        // Dedicated hardware chapters can be added here in the future if needed.
        // Real Robot Mapping content is integrated within each chapter's sections.
      ],
    },
    'capstone',
  ],
};
