import React from 'react';

const Fake = () => {
  const job = setTimeout(() => {
    return <h1>Engineering</h1>;
  }, 2000);
  return (
    <div>
      <h1>{job}</h1>
    </div>
  );
};

export default Fake;
