﻿document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeButton = document.getElementById("toggleTheme");
  const phoneIcon = document.getElementById("phoneIcon");
  const popupForm = document.getElementById("popupForm");
  const closePopup = document.getElementById("closePopup");
  const accordionItems = document.querySelectorAll(".accordion-item");
  const adoptionForm = document.getElementById("adoptionForm");
  const donationForm = document.getElementById("donationForm"); 
  const navbarLinks = document.querySelectorAll(".navbar a");
  let currentIndex = 0;
  function setTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      toggleThemeButton.textContent = "☀️";
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      toggleThemeButton.textContent = "🌙";
    }
    localStorage.setItem("theme", theme);

    const navbar = document.querySelector(".navbar");
    const footer = document.querySelector("footer");
    navbar.classList.toggle("dark-theme", theme === "dark");
    navbar.classList.toggle("light-theme", theme === "light");
    footer.classList.toggle("dark-theme", theme === "dark");
    footer.classList.toggle("light-theme", theme === "light");
  }
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
  toggleThemeButton.addEventListener("click", function () {
    const currentTheme = document.body.classList.contains("dark-theme")
      ? "light"
      : "dark";
    setTheme(currentTheme);
  });

  
  phoneIcon.addEventListener("click", function () {
    popupForm.style.display = "block";
  });

  
  closePopup.addEventListener("click", function () {
    popupForm.style.display = "none";
  });
  function setFocus(index) {
    if (index >= 0 && index < navbarLinks.length) {
      navbarLinks[index].focus();
      currentIndex = index;
    }
  }

  
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
      setFocus(currentIndex + 1);
      event.preventDefault(); 
    } else if (event.key === "ArrowLeft") {
      setFocus(currentIndex - 1);
      event.preventDefault(); 
    }
  });

  
  setFocus(0);

  
  const meowSound = new Audio("meow.mp3");

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");

    header.addEventListener("click", () => {
      const isActive = content.classList.contains("show");

      
      accordionItems.forEach((i) => {
        const content = i.querySelector(".accordion-content");
        content.style.maxHeight = 0;
        content.classList.remove("show");
        content.style.opacity = 0;
      });

     
      if (!isActive) {
        content.classList.add("show");
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.opacity = 1;

        // Воспроизводим звук при раскрытии
        meowSound.play().catch((error) => {
          console.error("Ошибка воспроизведения звука для Mittens:", error);
        });
      }
    });
  });

  
  adoptionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const reason = document.getElementById("reason").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    document.querySelectorAll(".error").forEach((el) => el.remove());
    
     
    let isValid = true;
    if (name === "") {
      showError("name", "Name is required.");
      isValid = false;
    }
    if (email === "" || !emailPattern.test(email)) {
      showError("email", "Valid email is required.");
      isValid = false;
    }
    if (phone === "" || !/^\+?\d{10,15}$/.test(phone)) {
      showError("phone", "Valid phone number is required.");
      isValid = false;
    }
    if (address === "") {
      showError("address", "Address is required.");
      isValid = false;
    }
    if (reason === "") {
      showError("reason", "Please provide a reason for adopting a pet.");
      isValid = false;
    }
    if (isValid) {
      alert("Form submitted successfully!");
      adoptionForm.submit();
    }
  });

  
  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const amount = document.getElementById("amount").value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    document.querySelectorAll(".error").forEach((el) => el.remove());
    let isValid = true;
    if (name === "") {
      showError("name", "Name is required.");
      isValid = false;
    }
    if (email === "" || !emailPattern.test(email)) {
      showError("email", "Valid email is required.");
      isValid = false;
    }
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      showError("amount", "Please enter a valid donation amount.");
      isValid = false;
    }
    if (isValid) {
      this.submit();
    }
  });

  function showError(id, message) {
    const element = document.getElementById(id);
    const error = document.createElement("small");
    error.classList.add("text-danger", "error");
    error.textContent = message;
    element.parentNode.appendChild(error);
  }
  

  
  function displayPets(petList) {
    const cardDeck = document.querySelector(".card-deck");
    cardDeck.innerHTML = ""; 
    petList.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add("card", "pet-card");
      petCard.innerHTML = `
        <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
        <div class="card-body text-center">
            <h5 class="card-title">${pet.name}</h5>
            <p class="card-text">Age: ${pet.age} | Gender: ${pet.gender}</p>
            <p class="card-text">${pet.description}</p>
           <a href="../adopt/adopt.html" class="btn btn-outline-primary">Adopt Now</a>
            <button id="${pet.buttonId}" class="btn btn-outline-secondary">I have something to say...</button>
        </div>
        `;
      cardDeck.appendChild(petCard);
    });
  }

  
  function filterPets() {
    const selectedType = document.getElementById("petType").value; 
    const selectedGender = document.getElementById("petGender").value;

    
    const filteredPets = pets.filter((pet) => {
      const genderMatch = selectedGender ? pet.gender === selectedGender : true;
      return genderMatch; 
    });

    displayPets(filteredPets);
  }

  
  document.getElementById("filterButton").addEventListener("click", filterPets);

  
  window.onload = () => {
    displayPets(pets);
  };

  document.addEventListener("click", function (event) {
    if (event.target.matches(".btn-outline-secondary")) {
      alert(
        "Thank you for your interest! Please let us know what you would like to say."
      );
    }
  });

  
  function updateDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedDate = now.toLocaleDateString("en-US", options);
    document.getElementById("currentDateTime").textContent = formattedDate;
  }

 
  setInterval(updateDateTime, 1000);
  updateDateTime();
});
document.addEventListener("DOMContentLoaded", function () {
  const donationForm = document.getElementById("donationForm");
  window.resetDonationForm = function () {
    donationForm.reset();

    document.querySelectorAll(".error").forEach((el) => el.remove());
    };


  donationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted!");

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    document.querySelectorAll(".error").forEach((el) => el.remove());

    let isValid = true;
    if (name === "") {
      showError("name", "Name is required.");
      isValid = false;
    }
    if (email === "" || !emailPattern.test(email)) {
      showError("email", "Valid email is required.");
      isValid = false;
    }
    if (amount === "" || isNaN(amount) || Number(amount) <= 0) {
      showError("amount", "Please enter a valid donation amount.");
      isValid = false;
    }
    if (isValid) {
      alert("Donation submitted successfully!");
  
    }
  });

  function showError(id, message) {
    const element = document.getElementById(id);
    const error = document.createElement("small");
    error.classList.add("text-danger", "error");
    error.textContent = message;
    element.parentNode.appendChild(error);
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const loginPopup = document.getElementById("loginPopup");
    const submitLogin = document.getElementById("submitLogin");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameDisplay = document.getElementById("usernameDisplay");
    const logoutBtn = document.getElementById("logoutBtn");
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        showLoggedIn(savedUsername);
    }

    loginBtn.addEventListener("click", function () {
        const btnRect = loginBtn.getBoundingClientRect();
        loginPopup.style.left = `${btnRect.left}px`;
        loginPopup.style.top = `${btnRect.bottom + window.scrollY}px`;
        loginPopup.classList.toggle("show");
    });

    submitLogin.addEventListener("click", function () {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username === "Danial" && password === "123456") {
            localStorage.setItem("username", username);
            showLoggedIn(username);
            loginPopup.classList.remove("show");
        } else {
            alert("Incorrect login or password");
        }
    });

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("username");
        resetLoginState();
    });

    function showLoggedIn(username) {
        loginBtn.classList.add("d-none");
        usernameDisplay.classList.remove("d-none");
        usernameDisplay.textContent = `Welcome, ${username}`;
        logoutBtn.classList.remove("d-none");
    }

    function resetLoginState() {
        loginBtn.classList.remove("d-none");
        usernameDisplay.classList.add("d-none");
        usernameDisplay.textContent = "";
        logoutBtn.classList.add("d-none");
    }
});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeModal = document.getElementsByClassName("close")[0];

  
  closeModal.onclick = function () {
    modal.style.display = "none";
  };

 
  modal.onclick = function (event) {
    if (event.target !== modalImg) {
      modal.style.display = "none";
    }
  };

  
  function initializeImageModal() {
    document.querySelectorAll(".card-img-top").forEach((img) => {
      img.addEventListener("click", function () {
        modal.style.display = "block";
        modalImg.src = this.src;
      });
    });
  }

  const pets = [
    {
      name: "Whiskers",
      age: "3 months",
      gender: "Female",
      type: "cat",
      description:
        "Whiskers is a playful kitten who loves to chase after strings and toys!",
      image:
        "https://www.zooplus.co.uk/magazine/wp-content/uploads/2021/01/striped-grey-kitten.jpg",
      buttonId: "whiskers-button",
    },
    {
      name: "Rex",
      age: "1 month",
      gender: "Male",
      type: "dog",
      description:
        "Rex is an adventurous pup with a zest for life and exploration!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrun0uC9Y8r0UqhM0mtqZzMqjqC8xbtR53Q&s",
      buttonId: "rex-button",
    },
    {
      name: "Fluffy",
      age: "2 months",
      gender: "Male",
      type: "cat",
      description:
        "Fluffy is a cuddly little guy who enjoys lounging and snuggling!",
      image:
        "https://cdn.onemars.net/sites/perfect-fit_uk_Z61CM_JAs8/image/kitten-sitting-on-sofa_1685973713762.png",
      buttonId: "fluffy-button",
    },
    {
      name: "Bella",
      age: "1 year",
      gender: "Female",
      type: "dog",
      description: "Bella is a loyal companion who loves outdoor adventures!",
      image: "https://dogsbyandy.com/wp-content/uploads/BELLA-SHEP.jpg",
      buttonId: "bella-button",
    },
    {
      name: "Charlie",
      age: "4 months",
      gender: "Male",
      type: "dog",
      description:
        "Charlie is a curious puppy who loves to explore new places!",
      image:
        "https://www.dogstrust.org.uk/images/800x600/assets/2022-08/labrador_puppy_harefield_dogstrust.jpg",
      buttonId: "charlie-button",
    },
    {
      name: "Lucy",
      age: "5 months",
      gender: "Female",
      type: "cat",
      description: "Lucy is a sweet girl who loves to cuddle and play!",
      image:
        "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg",
      buttonId: "lucy-button",
    },
    {
      name: "Max",
      age: "2 years",
      gender: "Male",
      type: "dog",
      description:
        "Max is a brave dog who enjoys hiking and outdoor activities!",
      image:
        "https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/4e17ec01-850d-4fda-a446-e68ff71854ba/German+Shepherds+dans+pet+care.jpeg",
      buttonId: "max-button",
    },
    {
      name: "Rock",
      age: "6 months",
      gender: "Male",
      type: "cat",
      description: "Rock is a playful kitten who enjoys chasing his toys!",
      image: "https://d2zp5xs5cp8zlg.cloudfront.net/image-79322-800.jpg",
      buttonId: "rock-button",
    },
  ];

  let currentPage = 1;
  const petsPerPage = 4;

  function displayPets(filteredPets) {
    const cardDeck = document.querySelector(".card-deck");
    if (!cardDeck) {
      console.error('Element with class "card-deck" not found');
      return;
    }

    cardDeck.innerHTML = ""; 

    const startIndex = (currentPage - 1) * petsPerPage;
    const endIndex = startIndex + petsPerPage;
    const petsToDisplay = filteredPets.slice(startIndex, endIndex);

    petsToDisplay.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add("card", "pet-card");
      petCard.innerHTML = `
                <img src="${pet.image}" class="card-img-top" alt="${pet.name}">
                <div class="card-body text-center">
                    <h5 class="card-title">${pet.name}</h5>
                    <p class="card-text">Age: ${pet.age} | Gender: ${pet.gender}</p>
                    <p class="card-text">${pet.description}</p>
                    <a href="../adopt/adopt.html" class="btn btn-outline-primary">Adopt Now</a>
                    <button id="${pet.buttonId}" class="btn btn-outline-secondary">I have something to say...</button>
                </div>
            `;
      cardDeck.appendChild(petCard);
    });

    initializeImageModal();
    updatePagination(filteredPets);
    initializeSoundButtons();
  }

  function updatePagination(filteredPets) {
    const pagination = document.querySelector(".pagination");
    if (!pagination) return;

    pagination.innerHTML = ""; 

   
    const backButton = document.createElement("button");
    backButton.textContent = "Previous";
    backButton.disabled = currentPage === 1; 
    backButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayPets(filteredPets);
      }
    });
    pagination.appendChild(backButton);


    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled =
      currentPage === Math.ceil(filteredPets.length / petsPerPage);
    nextButton.addEventListener("click", () => {
      if (currentPage < Math.ceil(filteredPets.length / petsPerPage)) {
        currentPage++;
        displayPets(filteredPets);
      }
    });
    pagination.appendChild(nextButton);
  }

    function applyFilters() {
        const petType = document.getElementById("petType").value;
        const petGender = document.getElementById("petGender").value;

 
        localStorage.setItem("petType", petType);
        localStorage.setItem("petGender", petGender);

        const filteredPets = pets.filter((pet) => {
            const typeMatch = petType === "" || pet.type === petType;
            const genderMatch = petGender === "" || pet.gender.toLowerCase() === petGender.toLowerCase();
            return typeMatch && genderMatch;
        });

    currentPage = 1;
    displayPets(filteredPets);
  }
    function loadSavedFilters() {
        const savedPetType = localStorage.getItem("petType");
        const savedPetGender = localStorage.getItem("petGender");

        if (savedPetType) {
            document.getElementById("petType").value = savedPetType;
        }
        if (savedPetGender) {
            document.getElementById("petGender").value = savedPetGender;
        }

        applyFilters(); 
    }
 
  document
    .getElementById("filterButton")
    .addEventListener("click", applyFilters);

  
    displayPets(pets);
    loadSavedFilters();
  function playSound(buttonId) {
    const soundFiles = {
      "whiskers-button": "../petgallery/meow.mp3",
      "rex-button": "../about_us/dog.wav",
      "fluffy-button": "../about_us/meow.mp3",
      "bella-button": "../about_us/dog.wav",
      "charlie-button": "../about_us/dog.wav",
      "lucy-button": "../about_us/meow.mp3",
      "max-button": "../about_us/dog.wav",
      "rock-button": "../petgallery/meow.mp3",
    };

    const soundFile = soundFiles[buttonId];
    if (soundFile) {
      const sound = new Audio(soundFile);
      sound.play().catch((error) => {
        console.error(`Ошибка воспроизведения звука для ${buttonId}:`, error);
      });
    }
  }

 
  function initializeSoundButtons() {
    pets.forEach((pet) => {
      const button = document.getElementById(pet.buttonId);
      if (button) {
        button.addEventListener("click", () => playSound(pet.buttonId));
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const meowSound = new Audio("meow.mp3");
  const meowKittenSound = new Audio("meow_kitten.mp3");
  const dogSound = new Audio("dog.wav");

  const fluffyButton = document.getElementById("fluffy-button");
  fluffyButton.addEventListener("click", () => {
    meowSound.play().catch((error) => {
      console.error("Ошибка воспроизведения звука для Fluffy:", error);
    });
  });

  const buddyButton = document.getElementById("buddy-button");
  buddyButton.addEventListener("click", () => {
    dogSound.play().catch((error) => {
      console.error("Ошибка воспроизведения звука для Buddy:", error);
    });
  });

  const mittensButton = document.getElementById("mittens-button");
  mittensButton.addEventListener("click", () => {
    meowKittenSound.play().catch((error) => {
      console.error("Ошибка воспроизведения звука для Mittens:", error);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const adoptionForm = document.getElementById("adoptionForm");

    window.resetAdoptionForm = function () {
        adoptionForm.reset();

       
        document.querySelectorAll(".error").forEach((el) => el.remove());

        
        document.querySelectorAll(".form-control").forEach(input => {
            input.classList.remove('is-invalid'); 
        });
    };
});

document.addEventListener("DOMContentLoaded", function () {
  function updateDateTime() {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const formattedDate = now.toLocaleDateString("en-US", options);
    document.getElementById("currentDateTime").textContent = formattedDate;
  }


  setInterval(updateDateTime, 1000);


  updateDateTime();
});
