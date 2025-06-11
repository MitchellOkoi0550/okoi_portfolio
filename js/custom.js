const themeToggleSwitch = document.getElementById('theme-toggle-switch');

console.log(themeToggleSwitch.checked)

function toggleTheme(theme){
  const opposite = theme === 'dark' ? 'light' : 'dark';
  const bgElements = document.getElementsByClassName(`bg-${opposite}`);
  Array.from(bgElements).forEach(el => {
    el.classList.replace(`bg-${opposite}`, `bg-${theme}`);
  });
  // console.log(bgElements, theme)
}

themeToggleSwitch.addEventListener('change', (e) => {
  console.log({ e, value: e.target.checked });
  const theme = e.target.checked ? 'dark' : 'light';
  if(e.target.checked) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  } else {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  // else {
  //   document.documentElement.setAttribute('data-theme', 'light');
  // }
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
  const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
  toggleTheme(theme)
  console.log({systemSettingDark, systemSettingLight});
})

document.addEventListener('DOMContentLoaded', () => {
  let savedTheme = localStorage.getItem('theme');
  console.log({ savedTheme });
  if(!savedTheme){
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemSettingLight = window.matchMedia("(prefers-color-scheme: light)");
    console.log({systemSettingDark, systemSettingLight});
    if(systemSettingDark.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleSwitch.checked = true;
    }
    else if(systemSettingLight.matches) {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleSwitch.checked = false;
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleSwitch.checked = false;
    }
    savedTheme = themeToggleSwitch.checked ? 'dark' : 'light';
  } else {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleSwitch.checked = savedTheme === 'dark';
  }
  toggleTheme(savedTheme);

})