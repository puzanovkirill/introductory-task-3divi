import React from 'react';

export default function SlidePersonCountInfo({ count, length }) {
  return (
    <span>
      Person {count}/{length}
    </span>
  );
}
