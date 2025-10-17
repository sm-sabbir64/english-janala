const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  console.log(htmlElements.json(" "));
};

const synonyms = ["hello", "hi", "visit the company"];
createElements(synonyms);