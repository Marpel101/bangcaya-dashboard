/* =====================================================================
   script.js
   ---------------------------------------------------------------------
   This file controls what happens when you INTERACT with the page:
   switching between Home / Projects / Credentials / About views,
   the light/dark mode button, and the small "tools I use" ticker.
   It runs after the page has finished loading.
   ===================================================================== */
/* -----------------------------------------------------------------------
   PART 1: "Tools I work with" ticker
   -----------------------------------------------------------------------
   Builds the scrolling row of tool names/icons you see under the
   headline on the Home page. We list each tool once below, then this
   code repeats the list twice (so the CSS animation can loop smoothly
   without a visible jump) and drops it into the page.
   ----------------------------------------------------------------------- */
(function(){
  // Each tool = a name + a small icon (drawn with SVG <path> shapes)
  var tools = [
    {name:'Python', icon:'<path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/>'},
    {name:'Flowgorithm', icon:'<path d="M4 6h16M4 12h10M4 18h13"/>'},
    {name:'GitHub', icon:'<path d="M12 2C6.9 2 2.8 6.1 2.8 11.2c0 4.1 2.6 7.6 6.3 8.8.5.1.6-.2.6-.4v-1.6c-2.6.6-3.1-1.1-3.1-1.1-.4-1-1-1.3-1-1.3-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.3-1-4.3-4.6 0-1 .4-1.9 1-2.5-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1a9 9 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.6 1 1.5 1 2.5 0 3.6-2.2 4.4-4.3 4.6.3.3.6.9.6 1.8v2.6c0 .2.1.5.6.4 3.7-1.2 6.3-4.7 6.3-8.8C21.2 6.1 17.1 2 12 2Z"/>'},
    {name:'Coursera', icon:'<path d="M12 4a8 8 0 1 0 5.7 13.6"/><path d="M12 8v4l3 2"/>'},
    {name:'Claude Code', icon:'<path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M6 6l2.2 2.2M15.8 15.8 18 18M18 6l-2.2 2.2M8.2 15.8 6 18" stroke-linecap="round"/>'},
    {name:'VS Code', icon:'<path d="M16 3.5 6 11l10 7.5M20 6.5l-14 5 14 5" stroke-linejoin="round"/>'},
    {name:'Cursor', icon:'<path d="M6 4.5 18 12l-5.2 1.3L11 19Z" stroke-linejoin="round"/>'},
    {name:'Claude', icon:'<path d="M4 5h16v10H8l-4 3V5Z" stroke-linejoin="round"/>'},
    {name:'Runway', icon:'<rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2Z" stroke-linejoin="round"/>'},
    {name:'Higgsfield', icon:'<path d="M12 3l1.6 5 5 1.6-5 1.6L12 16l-1.6-4.8-5-1.6 5-1.6Z" stroke-linejoin="round"/>'},
    {name:'HTML', icon:'<path d="M4 3h16l-1.5 17L12 21l-6.5-1L4 3Z" stroke-linejoin="round"/><path d="M7.5 7h9l-.3 3.5H9.2M8 10.5l.3 3.6 3.7 1 3.7-1 .3-3.5" stroke-linejoin="round"/>'},
    {name:'CSS', icon:'<path d="M4 3h16l-1.5 17L12 21l-6.5-1L4 3Z" stroke-linejoin="round"/><path d="M16.5 7h-9l.3 3.5H16l-.4 4.5-3.6 1-3.6-1-.2-2.3" stroke-linejoin="round"/>'},
    {name:'JavaScript', icon:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8v7.3c0 1.5-1.8 1.9-2.7.7M14 8v6a1.8 1.8 0 0 0 3.5.6l.1-.3" stroke-linejoin="round"/>'}
  ];
  var frag = '';
  // repeat the tool list twice so the scrolling animation loops seamlessly
  for (var reps=0; reps<2; reps++){
    tools.forEach(function(t){
      frag += '<span class="tool-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+t.icon+'</svg>'+t.name+'</span>';
    });
  }
  var track = document.getElementById('tickerTrack');
  if (track) track.innerHTML = frag;
})();

/* -----------------------------------------------------------------------
   PART 2: Switching between pages (Home / Projects / Skills /
   Credentials / About / Contact)
   -----------------------------------------------------------------------
   This is a "single page app": all 6 pages already exist in index.html,
   just hidden. Clicking a sidebar link doesn't reload the browser — it
   simply hides every page except the one you asked for.
   ----------------------------------------------------------------------- */
(function(){
  // every <div class="view" id="view-...."> block (one per page)
  var views = Array.prototype.slice.call(document.querySelectorAll('.view'));
  // every clickable link that has a data-view="..." attribute
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-view]'));
  var mainEl = document.querySelector('.main');

  // animates the little progress bars on the Skills page so they
  // "fill up" from 0% each time you open that page
  function animateSkillMeters(){
    var meters = document.querySelectorAll('#view-skills .skill-page-meter span');
    meters.forEach(function(el){
      if (!el.dataset.targetWidth) {
        var w = (el.getAttribute('style') || '').match(/width:\s*(\d+)%/);
        el.dataset.targetWidth = w ? w[1] + '%' : '0%';
      }
      var target = el.dataset.targetWidth;
      el.style.transition = 'none';
      el.style.width = '0%';
      void el.offsetWidth;
      el.style.transition = '';
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){ el.style.width = target; });
      });
    });
  }

  // show the page called "name" (e.g. "projects") and hide all the rest
  function showView(name){
    views.forEach(function(v){ v.hidden = (v.id !== 'view-' + name); });
    navLinks.forEach(function(a){
      if (a.closest('.side-nav')) {
        a.classList.toggle('active', a.getAttribute('data-view') === name);
      }
    });
    if (mainEl) mainEl.scrollTop = 0;
    window.scrollTo({top:0, left:0, behavior:'auto'});
    if (history.replaceState) history.replaceState(null, '', '#' + name);
    if (name === 'skills') animateSkillMeters();
  }

  var sidebarEl = document.querySelector('.sidebar');

  navLinks.forEach(function(a){
    a.addEventListener('click', function(e){
      var name = a.getAttribute('data-view');
      if (!name) return;
      e.preventDefault();
      showView(name);
      // on the phone/tablet hamburger layout, picking a page should
      // also close the menu drawer so you land straight on the page
      if (sidebarEl && a.closest('.side-nav')) {
        sidebarEl.classList.remove('nav-open');
        var menuBtn = document.getElementById('menuToggle');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // if the page URL ends in e.g. "#credentials", open straight to that
  // page (useful for links like index.html#credentials); otherwise
  // start on Home
  var initial = (location.hash || '').replace('#','');
  var valid = ['home','projects','skills','credentials','about','contact'];
  showView(valid.indexOf(initial) !== -1 ? initial : 'home');
})();

/* -----------------------------------------------------------------------
   PART 3: Light / dark mode button
   -----------------------------------------------------------------------
   The page already opens in dark mode by default (see the small script
   at the very top of index.html). This part just handles what happens
   when you click the toggle button: it flips the theme and remembers
   your choice in the browser (localStorage) so it stays that way next
   time you visit.
   ----------------------------------------------------------------------- */
(function(){
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  if (!btn) return;

  function currentMode(){
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(mode){
    root.setAttribute('data-theme', mode);
    try { localStorage.setItem('theme', mode); } catch(e){}
  }

  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch(e){}

  btn.addEventListener('click', function(){
    apply(currentMode() === 'dark' ? 'light' : 'dark');
  });
})();

/* -----------------------------------------------------------------------
   PART 4: Hamburger menu (tablet/phone only)
   -----------------------------------------------------------------------
   On the full desktop sidebar the page links are always visible, so
   this button is hidden and does nothing (see styles.css). On the
   narrower top-bar layout, tapping it shows/hides the drawer of page
   links and social icons by adding or removing one class, "nav-open",
   on the sidebar -- every drawer style in styles.css just checks for
   that class.
   ----------------------------------------------------------------------- */
(function(){
  var menuBtn = document.getElementById('menuToggle');
  var sidebar = document.querySelector('.sidebar');
  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener('click', function(){
    var isOpen = sidebar.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();
