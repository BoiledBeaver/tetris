function showMenuScreen(id) {
  const el = document.getElementById(id);
  el.style.display = 'flex'; // or 'block' depending on your CSS
  el.classList.remove('hide');
  el.classList.add('show');
}

function hideMenuScreen(id) {
  const el = document.getElementById(id);
  el.classList.remove('show');
  el.classList.add('hide');
  setTimeout(() => {
    el.classList.remove('hide');
    el.style.display = 'none';
  }, 300);
}


//Pause
export function showPauseMenu() {
    document.getElementById('pauseMenu').style.display = 'block';
  }
  
  export function hidePauseMenu() {
    document.getElementById('pauseMenu').style.display = 'none';
  }
  

  //start
  export function showStartScreen() {
    document.getElementById('startScreen').style.display = 'flex';
  }
  
  export function hideStartScreen() {
    document.getElementById('startScreen').style.display = 'none';
  }
  

  //end
  export function showEndScreen() {
    document.getElementById('endScreen').style.display = 'flex';
  }
  
  export function hideEndScreen() {
    document.getElementById('endScreen').style.display = 'none';
  }