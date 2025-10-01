document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("#portfolioForm input, #portfolioForm textarea, #portfolioForm button");
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = 1;
      el.classList.add("animate__animated", "animate__fadeInUp");
    }, i * 150);
  });
});

const portfolioForm = document.getElementById('portfolioForm');

portfolioForm.addEventListener('submit', function(e){
  e.preventDefault();

  const file = document.getElementById('profilePic').files[0];

  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      sessionStorage.setItem('profilePic', reader.result);
      saveFormFieldsAndRedirect();
    }
    reader.readAsDataURL(file);
  } else {
    saveFormFieldsAndRedirect();
  }

  function saveFormFieldsAndRedirect(){
    const fields = ["fullName","email","phone","about","skills","projects","education","experience","achievements","hobbies","linkedin","github"];
    fields.forEach(f => {
      sessionStorage.setItem(f, document.getElementById(f).value);
    });

    window.location.href = 'select.html';
  }
});
