import React, { useState } from 'react';

function RecipeAccordion({ steps }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    if (openIndexes.includes(index)) {
      // tutup kalau sudah terbuka
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      // buka tanpa nutup yang lain
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <div className="accordion">
      {safeSteps.map((step, index) => (
        <div className="accordion-item" key={index}>
          <button
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            Langkah {index + 1}
          </button>

          <div className={`accordion-body ${openIndexes.includes(index) ? 'open' : ''}`}>
            <p>{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeAccordion;