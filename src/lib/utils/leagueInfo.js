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
    creating a league history that lasts.
  </p>

  <p>
    The <strong>2026 season marks the inaugural year of the CPL</strong>. This
    season, our 24 teams are split between two leagues:
    <strong>CPL Red</strong> 🔴 and <strong>CPL Green</strong> 🟢.
    While both leagues will compete for their own championships, this season
    is about more than just winning — it will help shape the future of the league.
  </p>

  <p>
    Starting in 2027, the CPL will officially become a two-division system
    featuring the <strong>California Primeira Liga</strong> and
    <strong>Segunda Liga</strong>, with promotion and relegation determining
    where teams compete each season.
  </p>

  <p>
    The CPL is about more than just fantasy football. It's about building
    rivalries, making trades, talking trash, competing for championships,
    and creating a league with a history worth remembering.
  </p>

  <hr />

  <h4>🏆 The 2026 Inaugural Season</h4>

  <p>
    <strong>🔴 CPL Red</strong><br />
    One of two leagues competing in the inaugural 2026 season. Teams will
    battle throughout the season for the CPL Red championship and their place
    in league history.
  </p>

  <p>
    <strong>🟢 CPL Green</strong><br />
    The second league competing in the inaugural 2026 season. Teams will
    battle for the CPL Green championship while establishing where they will
    begin the next era of the league.
  </p>

  <p>
    <strong>🏁 The Road to 2027</strong><br />
    The 2026 season will determine the foundation of the CPL's future
    two-division system. Beginning in 2027, teams will be placed into the
    <strong>California Primeira Liga</strong> or <strong>Segunda Liga</strong>,
    with promotion and relegation shaping the divisions from season to season.
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

    // ============================================================
    // RED — CPL
    // ============================================================

    {
        managerID: "1037569461064794112",
        username: "dillydilly71",
        name: "Dylan",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "992145928494637056",
        username: "TonyMedeiros",
        name: "Tony",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "733091325091635200",
        username: "BlicaLicker",
        name: "Izzy",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1132795206014742528",
        username: "pombinhamaster42069",
        name: "Brandon",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1123348972917100544",
        username: "Jmendes27",
        name: "Jonathon",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "608428302964686848",
        username: "justindocanto",
        name: "Justin",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: lar,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "722593452524650496",
        username: "loganlourenco",
        name: "Logan",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "733122379001241600",
        username: "cuckhold97",
        name: "Kevin",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "988192038514466816",
        username: "DMACE11",
        name: "Darin",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "732848788863037440",
        username: "GavinSilva",
        name: "Gavin",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: lv,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "865009922180509696",
        username: "dalexandre",
        name: "Daniel",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "471758701842132992",
        username: "JDizzle09",
        name: "JD",
        division: "red",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: lar,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },


    // ============================================================
    // GREEN — CPL
    // ============================================================

    {
        managerID: "871263782905794560",
        username: "Lucasfon18",
        name: "Lucas",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "992160347320647680",
        username: "lacobjopes",
        name: "Jacob",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: sf,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "733139077938925568",
        username: "emilioanaya",
        name: "Bolo",
        division: "green",
        location: "Elk Grove, California",
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: dal,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1134307994403344384",
        username: "Nicholassilv",
        name: "Nicholas",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "858567127072870400",
        username: "mpires1",
        name: "Michael",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "733897435939725312",
        username: "LinguicaLicker",
        name: "Tiago",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1122218839107850240",
        username: "LJorge",
        name: "Luke",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "853030385163038720",
        username: "Xavierg35",
        name: "Xavier",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1233993787223572480",
        username: "Duarte3",
        name: "Paul",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "594665552094486528",
        username: "grantsilva",
        name: "Grant",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: lv,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "741113728006803456",
        username: "freitasrui",
        name: "Rui",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    },

    {
        managerID: "1314475281792118784",
        username: "flipcup1",
        name: "Christian",
        division: "green",
        location: null,
        bio: "",
        photo: null,
        fantasyStart: null,
        favoriteTeam: null,
        mode: null,
        rival: {
            name: null,
            link: null,
            image: null
        },
        favoritePlayer: null,
        valuePosition: null,
        rookieOrVets: null,
        philosophy: "",
        tradingScale: null,
        preferredContact: "Sleeper"
    }

];
  
  
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
    
