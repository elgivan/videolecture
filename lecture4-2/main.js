window.onload = function()
{
  let video = document.getElementById("video");
  let questionBox = document.getElementById("question");
  let wrongSound = new Audio("wrong.wav");
  let correctSound = new Audio("correct.wav");
  let wasFullscreen = false;  

  video.addEventListener("timeupdate", function()
  {
    let ct = this.currentTime;
    for(let i = 0; i < questions.length; ++i)
    {
      let q = questions[i];
      if(q.done){ continue; }
      if(q.stoptimer - 0.5 < ct && ct < q.stoptimer + 0.5)
      {
        this.pause();
        if(document.fullscreenElement)
        {
          document.exitFullscreen();
          wasFullscreen = true;
        }
        questionBox.scrollIntoView();
        showQuestion(q);
      }
    }
  });

  function showQuestion(q)
  {
    questionBox.classList.remove("hidden");
    let oldButtons = questionBox.querySelectorAll("button");
    for(let i = 0; i < oldButtons.length; ++i)
    {
      questionBox.removeChild(oldButtons[i]);
    }

    let questionLabel = questionBox.querySelector("span");
    questionLabel.innerText = q.question;
    for(let i = 0; i < q.answers.length; ++i)
    {
      let b = document.createElement("button");
      b.innerText = q.answers[i];
      b.answer = i + 1;
      b.addEventListener("click", function()
      {
        let buttons = questionBox.querySelectorAll("button");
        for(let i = 0; i < buttons.length; ++i)
        {
          buttons[i].classList.remove("wrong");
        }
       
        if(this.answer == q.correct)
        {
          correctSound.play();
          questionBox.classList.add("hidden");
          q.done = true;
          if(wasFullscreen)
          {
            video.requestFullscreen();
            wasFullscreen = false;
          }
          video.play();
        }
        else
        {
          this.classList.add("wrong");
          wrongSound.play();
        }
      });
      questionBox.appendChild(b);
    }
  }
    
};
