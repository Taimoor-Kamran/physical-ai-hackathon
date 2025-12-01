import React from 'react';

function ContentBlock({ title, theory, code, screenshot, realRobotMapping, labExercise }) {
  return (
    <div className="content-block">
      {title && <h2>{title}</h2>}
      {theory && (
        <div className="content-section">
          <h3>Theory</h3>
          {theory}
        </div>
      )}
      {code && (
        <div className="content-section">
          <h3>Code</h3>
          <pre><code>{code}</code></pre>
        </div>
      )}
      {screenshot && (
        <div className="content-section">
          <h3>Screenshot</h3>
          <img src={screenshot} alt="Screenshot" />
        </div>
      )}
      {realRobotMapping && (
        <div className="content-section">
          <h3>Real Robot Mapping</h3>
          {realRobotMapping}
        </div>
      )}
      {labExercise && (
        <div className="content-section">
          <h3>Lab Exercise</h3>
          {labExercise}
        </div>
      )}
    </div>
  );
}

export default ContentBlock;
