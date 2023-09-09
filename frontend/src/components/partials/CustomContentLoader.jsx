import React from 'react';
import ContentLoader from 'react-content-loader';

const CustomContentLoader = ({ height, width }) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Customize your loader here */}
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CustomContentLoader;