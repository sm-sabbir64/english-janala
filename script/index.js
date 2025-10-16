const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
    .then((res) => res.json()) //promise of the json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  // console.log(lessonButtons);
  lessonButtons.forEach(btn => btn.classList.remove('active'))
  
}

const loadlevelword = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`; //promise of response
  fetch(url)
    .then((res) => res.json()) //promise of the json data
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data)
    });
};
const displayLevelWord = (words) => {
  // console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    // alert('No word this lesson');
    wordContainer.innerHTML = `
      <div class="text-center col-span-full font-bangla space-y-5 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" />
            <p class="font-normal text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-medium text-5xl">নেক্সট Lesson এ যান</h2>
      </div>
     `;
    return;
  }

  // {
  //     "id": 11,
  //     "level": 3,
  //     "word": "Kindle",
  //     "meaning": "জ্বালানো / উত্তেজিত করা",
  //     "pronunciation": "কিন্ডল"
  // }
  for (let word of words) {
    console.log(word);
    const loadCard = document.createElement("div");
    loadCard.innerHTML = `
    <div class="bg-white rounded-lg shadow-sm text-center py-10 px-5 space-y-4 ">
            <h2 class="font-bold text-2xl">${
              word.word ? word.word : "শব্দ পাওয়া যাইনি"
            }</h2>
            <p class="font-semibold text-lg font-bangla">Meaning/Pronounciation</p>
            <h2 class="font-bangla font-medium text-2xl text-[#18181B]">"${
              word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"
            }/ ${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া যাইনি"
    }"</h2>
            <div class="flex justify-between items-center">
                <button onClick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
    wordContainer.append(loadCard);
  }
};

const displayLesson = (lessons) => {
  // console.log(lessons);
  //1. Get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //2. get into every lessons
  for (let lesson of lessons) {
    //      3. create element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" 
        onclick="loadlevelword(${lesson.level_no})" 
        class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> 
        Lesson - ${lesson.level_no}
        </button>
        `;

    //      4. append into container
    levelContainer.append(btnDiv);
  }
};
loadLessons();
