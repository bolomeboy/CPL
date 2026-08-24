/*   STEP 1   */
// Sleeper League IDs
// 2026 Inaugural Season

// Default league used by the existing single-league pages.
// For now, CPL Red is the default.
export const leagueID = "1397459939433164800";

// Keep the existing variable names so the rest of the
// website continues working without import errors.
export const cplLeagueID = "1397459939433164800";      // CPL Red
export const segundaLeagueID = "1396264220969930752";  // CPL Green


// League names
export const leagueName = "California Primeira Liga";

export const cplLeagueName = "CPL Red";

export const segundaLeagueName = "CPL Green";


export const dues = 50; // (optional) used in template constitution page
export const dynasty = false; // true for dynasty leagues, false for redraft and keeper
export const enableBlog = false; // requires VITE_CONTENTFUL_ACCESS_TOKEN and VITE_CONTENTFUL_SPACE environment variables

/*   STEP 2   */
export const homepageText = `
  <p>
    Welcome to the <strong>California Primeira Liga (CPL)</strong> — a competitive
    fantasy football league built around competition, strategy, rivalries, and
    long-term league history.
  </p>

  <p>
    The league features two 12-team divisions: the
    <strong>California Primeira Liga</strong>, our top division, and the
    <strong>Segunda Liga</strong>, where teams compete for the chance to move up
    to the CPL.
  </p>

  <p>
    Beginning with the league's promotion and relegation system, every season
    matters. Teams are competing not only for championships, but also for
    promotion, survival, and a place in league history.
  </p>

  <p>
    The CPL is about more than just fantasy football. It's about building
    rivalries, making trades, talking trash, and creating a league that gets
    better every season.
  </p>

  <hr />

  <h4>🏆 The League</h4>

  <p>
    <strong>California Primeira Liga</strong><br />
    The top division. The best teams compete for the CPL championship while
    fighting to avoid relegation.
  </p>

  <p>
    <strong>Segunda Liga</strong><br />
    The second division. Teams compete for the Segunda championship and the
    opportunity to earn promotion into the CPL.
  </p>

   <p>
    <strong>🔄 Promotion & Relegation</strong><br />
    Each season, the competition between the two divisions stays active.
    <strong>Four teams are promoted</strong> from the Segunda Liga to the CPL,
    while <strong>four CPL teams are relegated</strong> to the Segunda Liga.
    Every season brings a new fight for the championship, promotion, and survival.
  </p>

  <hr />

  <p>
    <strong>Established 2026</strong>
  </p>
`;

/*   STEP 3   */
/*
3 managers as an example. Uncomment (remove the //) before each line to make it live code
If you're having trouble, reference the Training Wheels' Manager Section
https://github.com/nmelhado/league-page/blob/master/TRAINING_WHEELS.md#ii-adding-managers-and-changing-the-homepage-text
*/

// To omit an optional field, set it's value to null

export const managers = [
{
  "roster": 1,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Gavin",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Manteca, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/gavin.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "lv", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 2,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Bolo",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Elk Grove, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/bolo.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "dal", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 3,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Izzy",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Oakdale, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
  },
{
  "roster": 4,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Grant",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Manteca, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/grant.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "lv", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 5,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Luke",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Manteca, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "no", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 6,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Frankie",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Manteca, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "lv", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 7,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "JJ",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Wilton, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "lv", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 8,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Tiago",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Manteca, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/tiago.png", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "null", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 9,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Tony",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "San Jose, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/tony.png", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 10,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Paul",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "Turlock, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 11,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Rui",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "San Jose, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/rui.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "sf", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
{
  "roster": 12,  // ID of the roster that the manager manages (look at the order of the power rankings graph)
  "name": "Mitch",
  "tookOver": null, // (optional) used if a manager took over a team, delete this line or change to null otherwise
  "location": "San Diego, CA", // (optional)
  "bio": "Lorem ipsum...",
  "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
  "fantasyStart": 2025, // (optional) when did the manager start playing fantasy football
  "favoriteTeam": "cin", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
  "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
  "rival": {
    name: "Rival", // Can be anything (usually your rival's name)
    link: null, // manager array number within this array, or null to link back to all managers page
    image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
  },
  "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
  "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
  "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
  "philosophy": "Your fantasy team's philosophy",
  "tradingScale": 10, // 1 - 10
  "preferredContact": "Sleeper", // 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
},
]
  
  
  /*   !!  !!  IMPORTANT  !!  !! */
  /*
  Below is the most up to-date version of a manager. Please leave this commented out
  and don't delete it. This will be updated if any fields are added, removed or changed
  and will allow updates without causing merge conflicts
  */
  
    // {
    //   "roster": 3,  // (DEPRECATED! Don't use this anymore) ID of the roster that the manager manages (look at the order of the power rankings graph)
    //   "managerID": "12345678",  // the user's manager ID, go to https://api.sleeper.app/v1/league/<your_league_id>/users to find user IDs (you can use older leagueIDs to find user IDs for managers that are no longer in the league)
    //   "name": "Your Name",
    //   "tookOver": 2020, // (DEPRECATED! You don't need to use this anymore) (optional) used if a manager took over a team, delete this line or change to null otherwise
    //   "location": "Brooklyn", // (optional)
    //   "bio": "Lorem ipsum...",
    //   "photo": "/managers/name.jpg", // square ratio recommended (no larger than 500x500)
    //   "fantasyStart": 2014, // (optional) when did the manager start playing fantasy football
    //   "favoriteTeam": "nyj", // (optional) favorite NFL team, (follows convention: nyj, sea, mia, etc.) MUST BE LOWERCASE
    //   "mode": "Win Now", // (optional) 'Win Now', 'Dynasty', or 'Rebuild' (anything else and you will need to add a new png to /static/ similar to the 'Rebuild.png' and 'Win Now.png' currently in there)
    //   "rival": {
    //     name: "Rival", // Can be anything (usually your rival's name)
    //     link: 6, // manager array number within this array, or null to link back to all managers page
    //     image: "/managers/rival.jpg", // either a specific manager photo or '/managers/everyone.png' or '/managers/question.png'
    //   },
    //   "favoritePlayer": 1426, // (optional) this corresponds to the Sleeper player ID (https://api.sleeper.app/v1/players/nfl)
    //   "valuePosition": "WR", // (optional) Favorite position (QB, WR, RB, TE, etc.)
    //   "rookieOrVets": "Rookies", // (optional) 'Rookies' or 'Vets' (anything else and you will need to add a new png to /static/ similar to the 'Rookies.png' and 'Vets.png' currently in there)
    //   "philosophy": "Your fantasy team's philosophy", // (optional)
    //   "tradingScale": 10, // 1 - 10 (optional)
    //   "preferredContact": "Text",  // (optional) 'Text', 'WhatsApp', 'Sleeper', 'Email', 'Phone', 'Discord', and 'Carrier Pigeon' are currently supplied in the template
    // },
    
