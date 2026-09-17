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
    {name:'JavaScript', icon:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8v7.3c0 1.5-1.8 1.9-2.7.7M14 8v6a1.8 1.8 0 0 0 3.5.6l.1-.3" stroke-linejoin="round"/>'},
    // The rest of these match the chips on the Skills page (Languages &
    // Tools / Design Tools / Productivity Tools), so the ticker on the
    // Home page lists the same toolset instead of just a handful of them.
    {name:'C', icon:'<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>'},
    {name:'C++', icon:'<rect x="5" y="7" width="10" height="10" rx="1"/><path d="M7 3v3M13 3v3M7 18v3M13 18v3M1 9h3M1 15h3M15 11h3M16.5 9.5v3" stroke-linecap="round"/>'},
    {name:'TypeScript', icon:'<path d="M8 4 4 12l4 8M16 4l4 8-4 8" stroke-linejoin="round"/>'},
    {name:'Git', icon:'<circle cx="6" cy="6" r="2.1"/><circle cx="6" cy="18" r="2.1"/><circle cx="17" cy="12" r="2.1"/><path d="M6 8.1V15.9M6 9c0 4 4 3 9 3h1.1" stroke-linecap="round"/>'},
    {name:'Docker', icon:'<rect x="3" y="10" width="5" height="5"/><rect x="9" y="10" width="5" height="5"/><rect x="9" y="4" width="5" height="5"/><rect x="15" y="10" width="5" height="5"/><path d="M2 15c0 3 2 6 6 6h8c3 0 5.5-2 6.5-5" stroke-linecap="round"/>'},
    {name:'Figma', icon:'<rect x="4" y="4" width="10" height="10" rx="2"/><circle cx="16" cy="16" r="5"/>'},
    {name:'DaVinci Resolve', icon:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 7l2-4h4l-2 4M9 7l2-4h4l-2 4M15 7l2-4h4l-2 4"/>'},
    {name:'Illustrator', icon:'<path d="M4 20 14 4l3 3L7 20H4v-3Z" stroke-linejoin="round"/><circle cx="14.3" cy="3.7" r="1.1" fill="currentColor" stroke="none"/>'},
    {name:'Canva', icon:'<path d="M12 3a9 9 0 1 0 0 18c1.4 0 1.9-.9 1.9-1.8 0-.9-.5-1.4-.9-1.9-.5-.5-.3-1.5.5-1.5H15c2.5 0 5-2 5-5.6C20 6 16.5 3 12 3Z" stroke-linejoin="round"/><circle cx="8" cy="11" r="1.1" fill="currentColor" stroke="none"/><circle cx="10.5" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="7.3" r="1.1" fill="currentColor" stroke="none"/>'},
    {name:'Photoshop', icon:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="10" r="1.7"/><path d="m4 17 5-5 4 4 3-3 4 4" stroke-linejoin="round" stroke-linecap="round"/>'},
    {name:'Microsoft Excel', icon:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>'},
    {name:'Microsoft PowerPoint', icon:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8h6M7 11.5h4" stroke-linecap="round"/>'},
    {name:'Microsoft Word', icon:'<path d="M6 3h9l3 3v15H6Z" stroke-linejoin="round"/><path d="M15 3v3h3"/><path d="M8.5 12l1.5 6 2-4.5 2 4.5 1.5-6" stroke-linecap="round" stroke-linejoin="round"/>'},
    {name:'ChatGPT', icon:'<path d="M4 5h16v10H9l-4.5 3.5V5Z" stroke-linejoin="round"/><circle cx="9" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="12.5" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r=".9" fill="currentColor" stroke="none"/>'},
    {name:'Google Forms', icon:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12l1.5 1.5L12 11M8 16h5" stroke-linecap="round" stroke-linejoin="round"/>'}
  ];
  var frag = '';
  // repeat the tool list twice so the scrolling animation loops seamlessly
  for (var reps=0; reps<2; reps++){
    tools.forEach(function(t){
      frag += '<span class="tool-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+t.icon+'</svg>'+t.name+'</span>';
    });
  }
  var track = document.getElementById('tickerTrack');
  if (track) {
    track.innerHTML = frag;
    // The scroll speed (see .ticker-track in styles.css) was originally
    // tuned as a flat 22s for a 13-tool list. As more tools were added
    // the ticker kept that same fixed duration but had to cover a much
    // longer track in the same time, so it visibly sped up. Scaling the
    // duration to the tool count keeps a steady, readable pace (how
    // long each name stays on screen) no matter how long the list gets.
    var secondsPerTool = 1.7;
    track.style.animationDuration = Math.round(tools.length * secondsPerTool) + 's';
  }
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
   PART 2.5: Keep the floating "Get in touch" button from ever sitting
   on top of other clickable content
   -----------------------------------------------------------------------
   The button is deliberately fixed to the same bottom-right corner on
   every page, so it stays put while a page scrolls. That's fine when
   there's empty space under it, but real content can end up landing in
   that exact spot -- the Contact page's email/social list on narrow
   screens, or a bento card's "View all" link at certain widths on the
   Home page -- and a fixed element sitting on top of a link both looks
   wrong and makes that link unclickable.

   Rather than hand-tune spacing for every page and screen size (fragile,
   and it'll break again the next time content changes), this checks
   what's actually near the button on every scroll/resize: if another
   visible link or button in the current page overlaps its rectangle,
   the floating button fades out and stops accepting clicks until that's
   no longer true. Nothing below it is ever actually covered.
   ----------------------------------------------------------------------- */
(function(){
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.get-touch'));
  if (!buttons.length) return;

  function rectsOverlap(a, b){
    return !(a.bottom <= b.top || b.bottom <= a.top || a.right <= b.left || b.right <= a.left);
  }

  function checkButton(btn){
    var style = getComputedStyle(btn);
    if (style.display === 'none') return; // its page isn't the active one
    var btnRect = btn.getBoundingClientRect();
    if (btnRect.width === 0 || btnRect.height === 0) return;

    var view = btn.closest('.view');
    if (!view) return;
    var candidates = view.querySelectorAll('a, button');
    var blocked = false;
    for (var i = 0; i < candidates.length; i++){
      var el = candidates[i];
      if (el === btn || btn.contains(el)) continue;
      var elStyle = getComputedStyle(el);
      if (elStyle.display === 'none' || elStyle.visibility === 'hidden' || parseFloat(elStyle.opacity) < 0.05) continue;
      var r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (rectsOverlap(btnRect, r)){ blocked = true; break; }
    }
    btn.classList.toggle('gt-hide', blocked);
  }

  var ticking = false;
  function checkAll(){
    ticking = false;
    buttons.forEach(checkButton);
  }
  function onScrollOrResize(){
    if (!ticking){ ticking = true; requestAnimationFrame(checkAll); }
  }
  window.addEventListener('scroll', onScrollOrResize, {passive:true});
  window.addEventListener('resize', onScrollOrResize);
  // re-run right after any page switch, since the newly-shown view's
  // layout (and which button is visible) can change without a scroll
  // or resize event firing on its own
  document.addEventListener('click', onScrollOrResize, true);
  checkAll();
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
