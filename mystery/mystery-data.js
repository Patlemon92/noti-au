/*
 * SAMPLE MYSTERY  —  "Death at Blackwood Manor"
 * -------------------------------------------------------------
 * This is the exact JSON shape the AI will generate at runtime.
 * The game engine reads only this structure, so any theme the AI
 * invents (space station, cruise ship, festival…) plugs straight in.
 *
 *   mystery = {
 *     meta      : title / theme / players / the victim + hook
 *     characters: [ per-suspect private dossier + per-round drip ]
 *     evidence  : shared clues unlocked round-by-round (the case board)
 *     solution  : the truth + how scoring resolves
 *   }
 */
window.MYSTERY = {
  meta: {
    title: "Death at Blackwood Manor",
    theme: "A 1920s English country estate",
    playerCount: 6,
    victim: "Lord Edmund Blackwood",
    hook:
      "A storm has cut Blackwood Manor off from the world. The family gathered " +
      "tonight for Edmund's sixtieth birthday — and by dawn he lies dead in his " +
      "study, an empty brandy glass at his side. Dr. Hart calls it his heart. " +
      "It was not his heart. No one has left the house. One of you is a murderer.",
  },

  // Rounds are 1..N. Each character carries a private reveal + a private
  // "do this now" nudge for every round — the thing a paper kit can't do.
  characters: [
    {
      id: "vivian",
      name: "Lady Vivian Blackwood",
      title: "The Widow",
      color: "#8e5b9e",
      publicRole:
        "Edmund's elegant wife of twenty years. Poised, gracious, and — as of " +
        "this morning — a very wealthy widow.",
      secret:
        "The estate is drowning in debt Edmund never knew about. Last week you " +
        "forged an updated will naming yourself sole heir. If the old will stands, " +
        "you get nothing.",
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
        },
        2: {
          reveal:
            "A servant saw you near the study at midnight. You were there — slipping " +
            "the forged will out of Edmund's desk before anyone could find the old one.",
          action: "If anyone asks why you were near the study, say only that you 'couldn't sleep'.",
        },
        3: {
          reveal: "Dr. Hart knows about your debts — and about your affair. He can destroy you with a sentence.",
          action: "Quietly warn Hart to stay silent. Offer him something to keep it that way.",
        },
      },
    },

    {
      id: "hart",
      name: "Dr. Julian Hart",
      title: "The Physician",
      color: "#3f7d8c",
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
        },
        2: {
          reveal:
            "Your medical bag sat unattended in the drawing room all evening. Anyone at " +
            "dinner could have opened it and taken the vial.",
          action: "Concede the death was suspicious — but stress that your bag was open to everyone.",
        },
        3: {
          reveal:
            "You saw Sebastian lingering near your bag before dinner. You said nothing — " +
            "because you were with Vivian and could not explain where you'd been.",
          action: "Reveal you saw Sebastian near the bag — but have a story ready for your own whereabouts.",
        },
      },
    },

    {
      id: "cordelia",
      name: "Miss Cordelia Fane",
      title: "The Ward",
      color: "#b5713f",
      publicRole:
        "Edmund's ward, raised at Blackwood since she was orphaned at seven. The " +
        "grieving daughter he never formally adopted.",
      secret:
        "Yesterday Edmund told you to your face he was cutting you out of the will. " +
        "By morning you would have been penniless and homeless. By morning, he was dead.",
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
        },
        2: {
          reveal:
            "You were seen crying in the garden at 11pm. You were not grieving — you were " +
            "burning the letter in which Edmund disinherited you.",
          action: "If any letter is mentioned, insist no such letter ever existed.",
        },
        3: {
          reveal: "You overheard Vivian and Dr. Hart together. Their affair, exposed, would pull every eye away from you.",
          action: "Decide whether to expose Vivian and Hart to save your own skin.",
        },
      },
    },

    {
      id: "sebastian",
      name: "Mr. Sebastian Crowe",
      title: "The Partner",
      color: "#a23b3b",
      publicRole:
        "Edmund's business partner and oldest friend, at his side in commerce for " +
        "thirty years. Devastated, of course, by the loss.",
      secret:
        "You have been embezzling from the company for years. Last night Edmund found " +
        "the proof and told you he would have you arrested at dawn. So there would be " +
        "no dawn for him.",
      objectives: [
        "Never let a soul learn of the embezzlement.",
        "Deflect every trace of suspicion.",
        "Walk out at morning a free man.",
      ],
      knows:
        "You did it. Before dinner you took the vial from Hart's bag and stirred it into " +
        "Edmund's nightcap brandy.",
      mustHide: "Everything — the theft and the murder both.",
      isKiller: true,
      rounds: {
        1: {
          reveal: "You are the murderer. Be as shattered as anyone in the room. Offer, loudly, to help find the truth.",
          action: "Attach yourself to one guest and gently steer them toward suspecting someone else.",
        },
        2: {
          reveal:
            "Dr. Hart saw you at his bag. If he talks, you are finished — and the embezzlement " +
            "gives you the clearest motive of anyone here.",
          action: "Get ahead of it. Suggest Cordelia had motive and opportunity too — before anyone looks at you.",
        },
        3: {
          reveal:
            "The net is closing. Vivian, Cordelia and Hart are all hiding something. Their secrets " +
            "are your best weapon now.",
          action: "Loudly accuse whoever the room already distrusts. Deflect, deflect, deflect.",
        },
      },
    },

    {
      id: "agnes",
      name: "Mrs. Agnes Pruitt",
      title: "The Housekeeper",
      color: "#5c6b4a",
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
        },
        2: {
          reveal:
            "You saw Sebastian leave the drawing room alone before dinner, heading for Hart's bag. " +
            "But if he hangs, your income dies with him.",
          action: "Sit on what you saw. Muddy the water. Point gently elsewhere.",
        },
        3: {
          reveal: "If you're cornered, you can trade what you saw for your own safety — but it exposes the blackmail.",
          action: "Decide: keep protecting Sebastian, or save yourself by naming him?",
        },
      },
    },

    {
      id: "reginald",
      name: "Mr. Reginald Vale",
      title: "The Stranger",
      color: "#6a6f7b",
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
        },
        2: {
          reveal: "Passing the study at 10pm, you heard Edmund and Sebastian shouting about 'stolen money'.",
          action: "Share what you heard. It points squarely at Sebastian — and away from you.",
        },
        3: {
          reveal:
            "It's time. Revealing you're Edmund's son explains your presence and recasts you as a " +
            "grieving heir rather than a lurking stranger.",
          action: "Reveal your identity. Claim your place. Demand justice for your father.",
        },
      },
    },
  ],

  // Shared case board — everyone sees these, unlocked as the host advances.
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
      "But only Sebastian had the proof of his crime about to land him in prison at first light. " +
      "Hart's missing vial, Agnes and Reginald both placing Sebastian near the bag and arguing " +
      "with Edmund over 'stolen money', and the open drawing-room bag all point one way. Vivian's " +
      "forged will and Cordelia's burnt letter are real secrets — but not this murder. Sebastian " +
      "Crowe poisoned his oldest friend to save his own neck.",
    // Fun end-of-game superlatives the app awards on top of the whodunit vote.
    awards: [
      { title: "The Mastermind", who: "sebastian", note: "Pulled it off — or nearly did." },
      { title: "Most Tangled Secret", who: "reginald", note: "The son no one saw coming." },
      { title: "Best Red Herring", who: "cordelia", note: "That burnt letter fooled half the room." },
    ],
  },
};
