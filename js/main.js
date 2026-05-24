$(function () {
  var captchaAnswer = 7;
  var searchIndex = [
    {
      title: "Home",
      type: "Page",
      href: "index.html",
      summary: "Sports programs, academy highlights, booking, and registration links.",
      terms: "home football rugby ballet table tennis handball gymnastics wrestling taekwondo judo volleyball sports training"
    },
    {
      title: "About",
      type: "Page",
      href: "pages/about.html",
      summary: "Mission, vision, values, funding, and academy support.",
      terms: "about mission vision values src funding university community partners"
    },
    {
      title: "New Activities",
      type: "Page",
      href: "pages/new-activities.html",
      summary: "Wrestling, Taekwondo, Judo, and Volleyball programs.",
      terms: "new activities wrestling taekwondo judo volleyball martial arts team sport"
    },
    {
      title: "Events",
      type: "Page",
      href: "pages/events.html",
      summary: "Fixtures, clinics, showcases, tournaments, and event timetable.",
      terms: "events fixtures clinics showcases timetable football cup martial arts volleyball gymnastics ballet table tennis rugby"
    },
    {
      title: "Blog",
      type: "Page",
      href: "pages/blog.html",
      summary: "Academy announcements, training notes, safety updates, and news.",
      terms: "blog news announcement training safety launch posts comments"
    },
    {
      title: "Coaches",
      type: "Page",
      href: "pages/coaches.html",
      summary: "Meet the football, martial arts, volleyball, ballet, gymnastics, rugby, handball, and table tennis coaches.",
      terms: "coaches james mensah ama osei kwesi owusu grace boateng david appiah safiya"
    },
    {
      title: "Register",
      type: "Page",
      href: "pages/register.html",
      summary: "Join the academy and choose a preferred sport.",
      terms: "register membership join academy sign up"
    },
    {
      title: "Book Online",
      type: "Page",
      href: "pages/book-online.html",
      summary: "Book a training session by sport, date, and group size.",
      terms: "book online booking session schedule date group individual team"
    },
    {
      title: "Testing Report",
      type: "Page",
      href: "pages/testing-report.html",
      summary: "Website validation notes for navigation, responsive behavior, search, forms, and accessibility.",
      terms: "testing report validation accessibility responsive forms checks"
    },
    {
      title: "Football",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Academy football training, fixtures, teamwork, and match play.",
      terms: "football academy training fixtures cup coach james mensah"
    },
    {
      title: "Rugby",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Strength, contact safety, speed, and team structure.",
      terms: "rugby strength contact teamwork challenge match coach david appiah"
    },
    {
      title: "Ballet",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Balance, movement quality, confidence, and performance discipline.",
      terms: "ballet balance movement flexibility showcase coach grace boateng"
    },
    {
      title: "Table Tennis",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Footwork, reflexes, serve patterns, and competitive strategy.",
      terms: "table tennis speed reflex tournament coach safiya mensah"
    },
    {
      title: "Handball",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Team structure, fixtures, communication, and competition readiness.",
      terms: "handball fixtures competitions rugby coach david appiah"
    },
    {
      title: "Gymnastics",
      type: "Sport",
      href: "index.html#sports-title",
      summary: "Flexibility, strength, movement, and showcase preparation.",
      terms: "gymnastics flexibility strength ballet showcase coach grace boateng"
    },
    {
      title: "Wrestling",
      type: "Sport",
      href: "pages/new-activities.html",
      summary: "Strength, technique, grappling control, and conditioning.",
      terms: "wrestling new activity martial arts strength grappling"
    },
    {
      title: "Taekwondo",
      type: "Sport",
      href: "pages/new-activities.html",
      summary: "Speed, flexibility, discipline, self-defense, and skill development.",
      terms: "taekwondo martial arts kicks discipline clinic coach ama osei"
    },
    {
      title: "Judo",
      type: "Sport",
      href: "pages/new-activities.html",
      summary: "Throws, balance, leverage, ground technique, and calm decision making.",
      terms: "judo martial arts throws leverage clinic coach ama osei"
    },
    {
      title: "Volleyball",
      type: "Sport",
      href: "pages/new-activities.html",
      summary: "Serving, passing, communication, court positioning, and match strategy.",
      terms: "volleyball teamwork communication friendly coach kwesi owusu"
    },
    {
      title: "Opening Football Cup",
      type: "Event",
      href: "pages/events.html",
      summary: "Friendly football tournament for registered members and community teams.",
      terms: "opening football cup may 10 2026 main field tournament"
    },
    {
      title: "Martial Arts Clinic",
      type: "Event",
      href: "pages/events.html",
      summary: "Technique clinic covering Taekwondo, Judo, and Wrestling fundamentals.",
      terms: "martial arts clinic taekwondo judo wrestling may 17 2026"
    },
    {
      title: "Community Volleyball Friendly",
      type: "Event",
      href: "pages/events.html",
      summary: "Casual competition for student and community volleyball teams.",
      terms: "community volleyball friendly may 24 2026"
    }
  ];

  $(".menu-toggle").on("click", function () {
    var expanded = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!expanded));
    $("#" + $(this).attr("aria-controls")).toggleClass("open");
  });

  function isHomePage() {
    return $("body").data("page") === "home";
  }

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function resultHref(href) {
    if (isHomePage()) {
      return href;
    }

    if (href.indexOf("pages/") === 0) {
      return href.replace("pages/", "");
    }

    return "../" + href;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function buildSearchBand() {
    return $(
      '<section class="search-band" aria-labelledby="search-title">' +
        '<div>' +
          '<h2 id="search-title">Search the academy site</h2>' +
          '<p>Find sports, events, coaches, posts, pages, and booking links.</p>' +
        '</div>' +
        '<div class="search-tools" role="search">' +
          '<label class="search-label" for="site-search">Search website content</label>' +
          '<input id="site-search" class="site-search" type="search" placeholder="Search football, judo, events..." aria-describedby="search-help site-search-status" autocomplete="off">' +
          '<span id="search-help" class="sr-only">Results update automatically as you type.</span>' +
          '<p id="site-search-status" class="search-status" aria-live="polite"></p>' +
          '<div id="site-search-results" class="search-results" hidden></div>' +
        '</div>' +
      '</section>'
    );
  }

  function prepareSearch() {
    var $search = $("#site-search");

    if (!$search.length) {
      $(".page-hero").first().after(buildSearchBand());
      $search = $("#site-search");
    }

    if (!$search.closest(".search-tools").length) {
      var $label = $('label[for="site-search"]');
      var $help = $("#search-help");
      var $tools = $('<div class="search-tools" role="search"></div>');

      $search.before($tools);
      $tools.append($label, $search, $help);
    }

    var $searchTools = $search.closest(".search-tools");

    $search.attr({
      "aria-describedby": "search-help site-search-status",
      autocomplete: "off"
    });

    if (!$("#site-search-status").length) {
      $searchTools.append('<p id="site-search-status" class="search-status" aria-live="polite"></p>');
    }

    if (!$("#site-search-results").length) {
      $searchTools.append('<div id="site-search-results" class="search-results" hidden></div>');
    }
  }

  function renderSearchResults(results) {
    var $results = $("#site-search-results");

    if (!results.length) {
      $results.html('<p class="no-results">No results found. Try football, booking, coaches, or events.</p>');
      return;
    }

    $results.html(
      '<ul>' +
        results.slice(0, 8).map(function (item) {
          return '<li>' +
            '<a href="' + escapeHtml(resultHref(item.href)) + '">' +
              '<span class="search-result-type">' + escapeHtml(item.type) + '</span>' +
              '<strong>' + escapeHtml(item.title) + '</strong>' +
              '<span>' + escapeHtml(item.summary) + '</span>' +
            '</a>' +
          '</li>';
        }).join("") +
      '</ul>'
    );
  }

  function updateSearch() {
    var query = normalize($("#site-search").val());
    var $searchables = $(".searchable");
    var visibleCards = 0;
    var siteResults = [];

    $searchables.each(function () {
      var searchableText = normalize($(this).text() + " " + ($(this).data("search") || ""));
      var matches = !query || searchableText.indexOf(query) !== -1;

      $(this).toggleClass("is-hidden", !matches);

      if (matches) {
        visibleCards += 1;
      }
    });

    if (query) {
      siteResults = searchIndex.filter(function (item) {
        return normalize(item.title + " " + item.type + " " + item.summary + " " + item.terms).indexOf(query) !== -1;
      });

      renderSearchResults(siteResults);
      $("#site-search-results").prop("hidden", false);
      $("#site-search-status").text(siteResults.length + " site result" + (siteResults.length === 1 ? "" : "s") + " found" + ($searchables.length ? ", " + visibleCards + " on this page." : "."));
      return;
    }

    $("#site-search-results").prop("hidden", true).empty();
    $("#site-search-status").text("");
  }

  prepareSearch();
  $("#site-search").on("input search", updateSearch);

  $(".captcha-form, .academy-form").on("submit", function (event) {
    event.preventDefault();

    var $form = $(this);
    var $message = $form.find(".form-message");
    var formName = $form.data("form-name") || "form";
    var $captcha = $form.find("input[name='captcha']");

    $message.removeClass("success error");

    if ($captcha.length && Number($captcha.val()) !== captchaAnswer) {
      $message.addClass("error").text("CAPTCHA failed. Please answer 4 + 3 correctly.");
      return;
    }

    if (!this.checkValidity()) {
      $message.addClass("error").text("Please complete all required fields correctly.");
      return;
    }

    this.reset();
    $message.addClass("success").text("Your " + formName + " has been received. A confirmation email would be sent in the full system.");
  });

  var $counter = $("#visitor-count");
  if ($counter.length) {
    var count = Number(localStorage.getItem("srcAcademyVisits") || "0") + 1;
    localStorage.setItem("srcAcademyVisits", String(count));
    $counter.text(count);
  }
});
