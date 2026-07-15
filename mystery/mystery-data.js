/*
 * MYSTERY LIBRARY
 * -------------------------------------------------------------
 * A curated, hand-authored catalogue. It grows over time — just
 * add another object to window.MYSTERIES.
 *
 * Every mystery is PLAYER-COUNT ADAPTABLE. Each character carries a
 * `minPlayers` threshold:
 *   • the CORE cast (minPlayers = the mystery's minimum) is always in
 *     play and contains the killer + the suspects the solution needs;
 *   • OPTIONAL roles switch on as the group grows, each adding its own
 *     subplot without changing whodunit.
 *
 *   mystery = {
 *     meta       : id / title / theme / player range / round pacing guide
 *     characters : dossier + minPlayers + per-round drip
 *                    round = { reveal, action, ask[], defend }
 *                      reveal — what you privately learn this round
 *                      action — your private objective this round
 *                      ask    — pointed questions to put to named others
 *                      defend — how to answer when the finger points at you
 *     evidence   : shared clues unlocked round-by-round (public)
 *     solution   : the truth + end-of-game honours
 *   }
 *
 * NOTE: nothing in `characters` or `solution` is ever shown on the host /
 * game-board screen — the host is a suspect too. Only `evidence` and the
 * public role summaries are safe to display to the room.
 */
window.MYSTERIES = [
  {
    meta: {
      id: "blackwood",
      title: "Death at Blackwood Manor",
      theme: "A 1920s English country estate",
      minPlayers: 4,
      maxPlayers: 6,
      duration: "60–90 min",
      difficulty: "Gateway",
      status: "ready",
      blurb: "A storm-locked estate, a poisoned brandy, and a family with everything to hide.",
      victim: "Lord Edmund Blackwood",
      hook:
        "A storm has cut Blackwood Manor off from the world. The family gathered " +
        "tonight for Edmund's sixtieth birthday — and by dawn he lies dead in his " +
        "study, an empty brandy glass at his side. Dr. Hart calls it his heart. " +
        "It was not his heart. No one has left the house. One of you is a murderer.",
      scaling: {
        4: "The core four — a complete, solvable mystery.",
        5: "Adds the Housekeeper, and with her a thread of quiet blackmail.",
        6: "Adds a mysterious late guest hiding who he really is.",
      },
      // Pacing guide the host/board screen shows — what each round is FOR,
      // a suggested length, and when it's done. No secrets here.
      roundGuide: {
        1: {
          title: "Introductions",
          minutes: 15,
          goal:
            "Go round the room. Each guest says who they are and one thing they noticed " +
            "last night. Before you move on, everyone should have asked at least one question.",
          advanceWhen: "Everyone has introduced themselves and asked a question.",
        },
        2: {
          title: "The Investigation",
          minutes: 20,
          goal:
            "Fresh evidence is on the table. Press each other on where you were, what you " +
            "saw, and what you're hiding. Chase the contradictions — someone is lying.",
          advanceWhen: "The new clues have been argued over and alibis challenged.",
        },
        3: {
          title: "Accusations",
          minutes: 15,
          goal:
            "The last secrets surface. Everyone makes their case — who do you think killed " +
            "Edmund, and why? Lay out your evidence, then call the vote.",
          advanceWhen: "Everyone has made an accusation and defended themselves.",
        },
      },
    },

    characters: [
      {
        id: "vivian",
        name: "Lady Vivian Blackwood",
        title: "The Widow",
        color: "#8e5b9e",
        minPlayers: 4,
        publicRole:
          "Edmund's elegant wife of twenty years. Poised, gracious, and — as of this " +
          "morning — a very wealthy widow.",
        secret:
          "The estate is drowning in debt Edmund never knew about. Last week you forged " +
          "an updated will naming yourself sole heir. If the old will stands, you get nothing.",
        objectives: [
          "Never let anyone discover the debts.",
          "Make sure the new will is never questioned.",
          "Reach morning without being accused.",
        ],
        knows: "Edmund had a furious, shouting argument with Sebastian in the study late last night.",
        mustHide: "The forged will.",
        isKiller: false,
        rounds: {
          1: {
            reveal: "You inherit everything — but only if the new will stands.",
            action: "Grieve, publicly and beautifully. Remind everyone how devoted a wife you were.",
            ask: [
              "Dr. Hart — you looked shaken this morning. Are you truly certain it was his heart?",
              "Did anyone hear Edmund arguing with someone late last night? I'm sure I did.",
            ],
            defend: "If your composure is doubted: you're holding yourself together for the family's sake.",
          },
          2: {
            reveal: "A servant saw you near the study at midnight — where you slipped the forged will out of Edmund's desk before the old one could be found.",
            action: "Steer talk away from the study and toward anyone else's movements.",
            ask: [
              "Cordelia, you were out in the garden so late and so cold. Whatever were you doing?",
              "Doctor, if it was poison — whose was it, and how did it reach his glass?",
            ],
            defend: "If asked why you were near the study at midnight: you couldn't sleep, you went for some air.",
          },
          3: {
            reveal: "Dr. Hart knows about your debts — and your affair. One sentence from him could ruin you.",
            action: "Quietly warn Hart to stay silent. Publicly, point the room at someone with a clearer motive.",
            ask: [
              "Sebastian, you and Edmund were shut in that study for an age. What was so urgent?",
              "Who here actually gained something the moment Edmund died? Let's be honest.",
            ],
            defend: "If the new will is raised: Edmund always meant to provide for you — you're wounded they'd suggest otherwise.",
          },
        },
      },

      {
        id: "hart",
        name: "Dr. Julian Hart",
        title: "The Physician",
        color: "#3f7d8c",
        minPlayers: 4,
        publicRole:
          "The family doctor, here to tend Edmund's 'delicate heart'. It was you who " +
          "pronounced the death this morning.",
        secret:
          "You've been having an affair with Vivian for a year. You brought a vial of " +
          "digitalis 'for her nerves' — and it is now missing from your bag.",
        objectives: [
          "Hide the affair with Vivian.",
          "Explain the missing vial without incriminating yourself.",
          "Protect Vivian at all costs.",
        ],
        knows: "The poison that killed Edmund was digitalis. Your digitalis.",
        mustHide: "The affair, and that the poison was yours.",
        isKiller: false,
        rounds: {
          1: {
            reveal: "You know it was poison. You told the others it 'looked like his heart' — to buy yourself time.",
            action: "Hold the line: natural causes, a sad but ordinary death.",
            ask: [
              "Has anyone actually seen Edmund take his heart medicine lately? He was so careless with it.",
              "Who was the last of you to see him alive?",
            ],
            defend: "If the diagnosis is challenged: Edmund had a weak heart for years — it was the obvious call.",
          },
          2: {
            reveal: "You must admit the death looks suspicious — but your bag sat open in the drawing room all evening. Anyone could have taken the vial.",
            action: "Concede it may be poison, then stress the bag was open to the whole party.",
            ask: [
              "My medical bag sat open all evening — did anyone notice someone lingering near it?",
              "Sebastian, weren't you in the drawing room before dinner? Did you go near my things?",
            ],
            defend: "If asked about the missing vial: your bag was open to everyone — you can hardly be blamed.",
          },
          3: {
            reveal: "You saw Sebastian lingering near your bag before dinner. You've said nothing — because you were with Vivian and can't explain where you were.",
            action: "Reveal you saw Sebastian at your bag — but have a story ready for your own whereabouts.",
            ask: [
              "Sebastian — I'll say it plainly — I saw you by my bag before dinner. What were you doing?",
              "Doesn't the poison being digitalis point at whoever handled a doctor's bag?",
            ],
            defend: "If asked where you were before dinner: you were 'taking some air'. Never, ever mention Vivian.",
          },
        },
      },

      {
        id: "cordelia",
        name: "Miss Cordelia Fane",
        title: "The Ward",
        color: "#b5713f",
        minPlayers: 4,
        publicRole:
          "Edmund's ward, raised at Blackwood since she was orphaned at seven. The " +
          "grieving daughter he never formally adopted.",
        secret:
          "Yesterday Edmund told you to your face he was cutting you out of the will. By " +
          "morning you would have been penniless and homeless. By morning, he was dead.",
        objectives: [
          "Hide that you had the strongest motive of anyone.",
          "Steer suspicion onto someone else.",
          "Work out who actually did it.",
        ],
        knows: "Sebastian and Edmund's business was quietly failing.",
        mustHide: "That you were hours away from being disinherited.",
        isKiller: false,
        rounds: {
          1: {
            reveal: "You loved Edmund like a father — and last night, for the first time, you hated him.",
            action: "Play the heartbroken daughter. Let them see the grief, never the anger.",
            ask: [
              "Lady Vivian, you're remarkably composed for a grieving widow. How are you so calm?",
              "Doctor, did Edmund say anything to you yesterday — about his affairs, his plans?",
            ],
            defend: "If your grief is doubted: you loved Edmund as a father — how dare they suggest otherwise.",
          },
          2: {
            reveal: "You were seen crying in the garden at 11pm. You weren't grieving — you were burning the letter in which Edmund disinherited you.",
            action: "If any letter or the garden comes up, insist there was nothing to burn.",
            ask: [
              "Mr. Crowe, is it true the business was failing? Edmund seemed so worried lately.",
              "If someone poisoned him, they needed the poison first — who had access to the doctor's bag?",
            ],
            defend: "If the garden or a letter is raised: you were upset and needed air — there was no letter.",
          },
          3: {
            reveal: "You know a secret that would pull every eye off you — proof another guest has been lying all night.",
            action: "Decide whether to expose what you know to save your own skin.",
            ask: [
              "Doctor, why did you call it a heart attack so quickly, before anyone could even look?",
              "Sebastian, why would Edmund summon the police for dawn? What had you done?",
            ],
            defend: "If accused: you knew nothing of any change to the will — why on earth would you?",
          },
        },
      },

      {
        id: "sebastian",
        name: "Mr. Sebastian Crowe",
        title: "The Partner",
        color: "#a23b3b",
        minPlayers: 4,
        publicRole:
          "Edmund's business partner and oldest friend, at his side in commerce for " +
          "thirty years. Devastated, of course, by the loss.",
        secret:
          "You have been embezzling from the company for years. Last night Edmund found " +
          "the proof and told you he would have you arrested at dawn. So there would be no " +
          "dawn for him.",
        objectives: [
          "Never let a soul learn of the embezzlement.",
          "Deflect every trace of suspicion.",
          "Walk out at morning a free man.",
        ],
        knows: "You did it. Before dinner you took the vial from Hart's bag and stirred it into Edmund's nightcap brandy.",
        mustHide: "Everything — the theft and the murder both.",
        isKiller: true,
        rounds: {
          1: {
            reveal: "You are the murderer. Be as shattered as anyone in the room. Offer, loudly, to help find the truth.",
            action: "Attach yourself to one guest and gently steer them toward suspecting someone else.",
            ask: [
              "Cordelia, you and Edmund quarrelled yesterday, didn't you? I heard raised voices.",
              "Lady Vivian — forgive me — but had things been well between you and Edmund of late?",
            ],
            defend: "If anyone probes the business: it was thriving, and you and Edmund were the best of friends.",
          },
          2: {
            reveal: "Dr. Hart saw you at his bag. If he talks, you're finished — the embezzlement gives you the clearest motive here.",
            action: "Get ahead of it: point out Cordelia had motive and opportunity too, before anyone looks at you.",
            ask: [
              "Doctor — isn't digitalis exactly what killed him? And whose bag was it in?",
              "Cordelia, where were you before dinner? No one seems able to say.",
            ],
            defend: "If the argument in the study is raised: yes, you argued — about a bad investment, nothing more.",
          },
          3: {
            reveal: "The net is closing. Every guest is hiding something — their secrets are your best weapon now.",
            action: "Loudly accuse whoever the room already distrusts. Deflect, deflect, deflect.",
            ask: [
              "Lady Vivian, who benefits most now Edmund is gone? A newly-signed will, was it?",
              "Cordelia burned something in the garden last night. Doesn't that trouble anyone but me?",
            ],
            defend: "If the embezzlement is named: deny everything, and demand to know who is spreading such lies.",
          },
        },
      },

      {
        id: "agnes",
        name: "Mrs. Agnes Pruitt",
        title: "The Housekeeper",
        color: "#5c6b4a",
        minPlayers: 5,
        publicRole:
          "Has kept Blackwood Manor running for thirty years and sees everything that " +
          "happens under its roof — and much that people would rather she didn't.",
        secret:
          "You found ledgers proving Sebastian's theft months ago. Ever since, his money " +
          "has bought your silence. A living Sebastian pays you. A hanged one pays nothing.",
        objectives: [
          "Keep your blackmail buried.",
          "Protect your income — which means protecting Sebastian.",
          "Steer suspicion away from him, carefully, without seeming to.",
        ],
        knows: "Sebastian was embezzling. You can prove it.",
        mustHide: "That you've been blackmailing the killer.",
        isKiller: false,
        rounds: {
          1: {
            reveal: "You know more than anyone in this house. You also have a private reason to keep one suspect safe.",
            action: "Offer to help the investigation — and help it selectively.",
            ask: [
              "Shall I tell you who was still awake and moving about the house after midnight?",
              "Lady Vivian, I saw a light near the study late last night. Was that you, m'lady?",
            ],
            defend: "If asked what you know: you see much, but a good housekeeper keeps her confidences.",
          },
          2: {
            reveal: "You saw Sebastian leave the drawing room alone before dinner, toward Hart's bag. But if he hangs, your income dies with him.",
            action: "Sit on what you saw. Muddy the water. Point gently elsewhere.",
            ask: [
              "Miss Cordelia burned something in the garden grate last night — do ask her what it was.",
              "That letter Edmund was writing yesterday — has anyone seen where it went?",
            ],
            defend: "If pressed on Sebastian: you saw nothing certain — the hall was dim, you can't be sure.",
          },
          3: {
            reveal: "If you're cornered, you can trade what you saw for your own safety — but it exposes the blackmail.",
            action: "Decide: keep protecting Sebastian, or save yourself by naming him?",
            ask: [
              "Everyone here has a secret. Ask yourselves who had the most to lose by dawn.",
              "Doctor, that bag of yours — who did you leave it with all evening?",
            ],
            defend: "If your own conduct is questioned: you've served this house faithfully for thirty years.",
          },
        },
      },

      {
        id: "reginald",
        name: "Mr. Reginald Vale",
        title: "The Stranger",
        color: "#6a6f7b",
        minPlayers: 6,
        publicRole:
          "A late arrival who reached the manor just before the storm broke, introduced " +
          "as a distant cousin. Few here had ever heard your name before tonight.",
        secret:
          "You are Edmund's illegitimate son. You came to claim your birthright — and last " +
          "night, to your face, Edmund refused you.",
        objectives: [
          "Reveal your true identity — at the moment of your choosing.",
          "Stake your claim to the Blackwood estate.",
          "Prove you did not kill the father who rejected you.",
        ],
        knows: "Edmund was alive and shouting at Sebastian at 10pm, long after most guests had gone up.",
        mustHide: "Who you really are — until you decide to reveal it.",
        isKiller: false,
        rounds: {
          1: {
            reveal: "No one knows who you really are. And motive is written all over you the moment they find out.",
            action: "Stay the quiet outsider. Watch everyone. Say little.",
            ask: [
              "Curious that the doctor pronounced it heart failure and closed the matter so quickly.",
              "Who among you actually stood to lose if Edmund lived to change his mind about something?",
            ],
            defend: "If asked who you really are: a distant relation, here to pay respects. Stay vague.",
          },
          2: {
            reveal: "Passing the study at 10pm, you heard Edmund and Sebastian shouting about 'stolen money'.",
            action: "Share what you heard. It points squarely at Sebastian — and away from you.",
            ask: [
              "I heard two men shouting in the study at ten — about money. Who was in there with Edmund?",
              "Sebastian, that was your voice I heard, wasn't it? What money were you quarrelling over?",
            ],
            defend: "If your presence is questioned: you arrived only just before the storm — you barely knew the man.",
          },
          3: {
            reveal: "It's time. Revealing you're Edmund's son recasts you as a grieving heir, not a lurking stranger.",
            action: "Reveal your identity. Claim your place. Demand justice for your father.",
            ask: [
              "Before you accuse the stranger — ask the partner why he was to be arrested at dawn.",
              "Now you know who I am: who here had more to gain from Edmund's death than I did?",
            ],
            defend: "When you reveal you're his son: you came for recognition, not revenge — you wanted a father.",
          },
        },
      },
    ],

    evidence: {
      1: [
        "Lord Edmund was found in his study at dawn, an empty brandy glass beside him.",
        "Dr. Hart signed the death as heart failure — though he seems oddly unwilling to discuss it.",
      ],
      2: [
        "A vial of digitalis is missing from Dr. Hart's medical bag, which sat unattended in the drawing room all evening.",
        "Servants report raised voices from the study at around 10pm — well after most guests had retired.",
      ],
      3: [
        "Edmund's solicitor confirms his master had summoned the police for dawn — but would not say why.",
        "A newly-dated will has surfaced, naming Lady Vivian sole heir. The ink is barely a week old.",
      ],
    },

    solution: {
      killer: "sebastian",
      method: "Digitalis, stolen from Dr. Hart's medical bag and stirred into Edmund's nightcap brandy.",
      motive:
        "Edmund had uncovered years of embezzlement and meant to have Sebastian arrested at dawn. " +
        "Murder was the only exit.",
      explanation:
        "Everyone in the house had a secret and a motive — that was the fog Sebastian hid inside. " +
        "But only Sebastian had proof of his crime about to land him in prison at first light. " +
        "The missing vial, the raised voices over 'stolen money', and the open drawing-room bag all " +
        "point one way. Vivian's forged will and Cordelia's burnt letter are real secrets — but not " +
        "this murder. Sebastian Crowe poisoned his oldest friend to save his own neck.",
      awards: [
        { title: "The Mastermind", who: "sebastian", note: "Pulled it off — or nearly did." },
        { title: "Most Tangled Secret", who: "reginald", note: "The son no one saw coming." },
        { title: "Best Red Herring", who: "cordelia", note: "That burnt letter fooled half the room." },
        { title: "Deepest Poker Face", who: "agnes", note: "Knew everything, said nothing." },
      ],
    },
  },

  // ---- The library grows here. Placeholders shown as "in the works". ----
  {
    meta: {
      id: "orbit",
      title: "Silence on Station Orbit-9",
      theme: "A deep-orbit research station",
      minPlayers: 5, maxPlayers: 8, duration: "75–100 min",
      difficulty: "Twisty", status: "soon",
      blurb: "The commander is dead, the airlock logs are wiped, and the station is losing air.",
    },
    characters: [], evidence: {}, solution: {},
  },
  {
    meta: {
      id: "riviera",
      title: "Last Call on the Riviera",
      theme: "A midnight cocktail cruise",
      minPlayers: 4, maxPlayers: 10, duration: "60–90 min",
      difficulty: "Gateway", status: "soon",
      blurb: "A starlet vanishes overboard between the toast and the encore.",
    },
    characters: [], evidence: {}, solution: {},
  },
];
