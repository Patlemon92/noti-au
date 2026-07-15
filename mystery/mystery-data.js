/*
 * MYSTERY LIBRARY
 * -------------------------------------------------------------
 * A curated, hand-authored catalogue. It grows over time — just
 * add another object to window.MYSTERIES.
 *
 * PLAYER-COUNT ADAPTABLE. Each character carries a `minPlayers`
 * threshold; the engine filters the cast by the chosen count. The core
 * cast (minPlayers = the mystery's minimum) always includes the killer
 * and the suspects the solution needs.
 *
 * SCRIPTED ROUNDS — the game runs on rails so nobody is left guessing:
 *
 *   meta.roundGuide[n] = {          // what the HOST runs, per round
 *     title, minutes,
 *     narration : the story beat the host reads ALOUD to the room,
 *     steps     : the numbered run-sheet for the round,
 *     advanceWhen : the cue for when the round is done,
 *     goal      : one short line of context shown on player screens
 *   }
 *
 *   character.rounds[n] = {          // what each PLAYER does, per round
 *     learned   : what you privately now know (context for your acting),
 *     sayAloud  : the line you READ ALOUD to the room this round,
 *     question  : { to, text } — one pointed question to one named guest,
 *     secretGoal: your private objective this round,
 *     ifAccused : how to answer when the finger points at you
 *   }
 *
 * Nothing under `characters` or `solution` is ever shown on the host /
 * game-board screen — the host is a suspect too. Only `evidence`, the
 * public role summaries, and `roundGuide` are safe to display to the room.
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
        "tonight for Edmund's sixtieth birthday — and by dawn he lies dead in his study.",
      scaling: {
        4: "The core four — a complete, solvable mystery.",
        5: "Adds the Housekeeper, and with her a thread of quiet blackmail.",
        6: "Adds a mysterious late guest hiding who he really is.",
      },

      roundGuide: {
        1: {
          title: "The Body is Found",
          minutes: 15,
          goal: "Everyone introduces themselves and reacts to the death. Follow your script.",
          narration:
            "Welcome, all, to Blackwood Manor. Last night we gathered for Lord Edmund's sixtieth " +
            "birthday, and the storm sealed us in. This morning he was found dead in his study, an " +
            "empty brandy glass at his side. Dr. Hart says his heart gave out — but not everyone is " +
            "so sure. Let us hear from one another, and learn what the night truly held.",
          steps: [
            "Go round the table. Each guest opens 'This round' and reads their statement aloud, in turn.",
            "Then, one by one, each guest asks the person named on their card their question — and that guest answers.",
            "When everyone has spoken and asked, tap 'Wrap up' below.",
          ],
          advanceWhen: "everyone has read their statement and asked their question.",
        },
        2: {
          title: "It Was No Accident",
          minutes: 20,
          goal: "The death is now murder. Read your statement, ask your question, chase the lies.",
          narration:
            "Overnight, the truth curdles. Dr. Hart's medical bag has been searched — and a vial of " +
            "digitalis, a poison, is missing. Edmund did not die of his heart. He was murdered, by " +
            "someone in this very room. And the servants now recall raised voices from the study at " +
            "ten o'clock, long after the house had gone to bed.",
          steps: [
            "Read the two new clues on the case board aloud to the room.",
            "Each guest reads their Round 2 statement aloud, in turn.",
            "Each guest asks their new question. Press hard for answers — someone is lying.",
            "Tap 'Wrap up' once the new clues have been argued over.",
          ],
          advanceWhen: "the new clues have been argued over and alibis challenged.",
        },
        3: {
          title: "Before the Dawn",
          minutes: 15,
          goal: "Last secrets out. Read your final statement, then make your accusation.",
          narration:
            "A telegram has reached the manor: Edmund had summoned the police for dawn — but told no " +
            "one why. And a will, dated only last week, has surfaced. Time is short and the storm is " +
            "lifting. Every secret must come out now. Make your accusations before the constable arrives.",
          steps: [
            "Read the final two clues on the case board aloud.",
            "Each guest reads their final statement — the last secrets surface here.",
            "Going round the table, each guest names who they suspect and answers for themselves.",
            "When all have spoken, tap 'Call the vote'.",
          ],
          advanceWhen: "everyone has made an accusation and defended themselves.",
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
          "Never let anyone discover the debts or the forged will.",
          "Reach morning without being accused.",
        ],
        knows: "Edmund had a furious, shouting argument with Sebastian in the study late last night.",
        mustHide: "The forged will.",
        items: [
          { id: "debts", kind: "letter", title: "A drawer of final demands", teaser: "Creditors' letters, kept hidden",
            body: "Stack upon stack of overdue notices. The estate is mortgaged to the rafters — Edmund never knew. Ruin is a week away, unless the inheritance comes through.",
            hideNote: "Keep this buried. It is your motive." },
        ],
        isKiller: false,
        rounds: {
          1: {
            learned: "You inherit everything — but only if the new will stands. Play the devoted, devastated wife.",
            sayAloud: "I found him myself this morning. My Edmund, cold in his chair. Dr. Hart assures me it was his heart — and Lord knows he worked it too hard. I don't know how I shall go on.",
            question: { to: "hart", text: "Doctor, you were with him at the end — you're quite certain it was his heart?" },
            secretGoal: "Sell your grief. Never let anyone wonder whether the marriage, or the money, was in trouble.",
            ifAccused: "You are his grieving widow — how dare anyone suggest you'd harm your own husband.",
          },
          2: {
            learned: "A servant saw you near the study at midnight — you were retrieving the forged will before the old one could be found.",
            sayAloud: "Poison, in this house? I'll not believe it. Though… I'll admit I couldn't sleep, and I did walk the halls near midnight. The storm, you understand. Nothing more than that.",
            question: { to: "cordelia", text: "Cordelia, dear — you were seen weeping in the garden at eleven. Whatever were you doing out in the cold?" },
            secretGoal: "Get ahead of the midnight sighting — admit the innocent version before anyone else raises it.",
            ifAccused: "If pressed on the study: you couldn't sleep, you went for air. There is nothing more to it.",
          },
          3: {
            learned: "Dr. Hart knows about your debts and your affair. Keep him quiet — and steer the room to a clearer culprit.",
            sayAloud: "Yes — there is a new will. Edmund wished to provide for me, as any husband would, and I'll not be shamed for his love. But if it's a motive you want, look to the man he was about to have arrested.",
            question: { to: "sebastian", text: "Sebastian, you and my husband were shut in that study for an hour last night, shouting. What had you done?" },
            secretGoal: "Deflect from the will by turning the room toward Sebastian's ruin.",
            ifAccused: "The will only proves he loved you — you'd have had every comfort with him alive. Why kill that?",
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
        ],
        knows: "The poison that killed Edmund was digitalis. Your digitalis.",
        mustHide: "The affair, and that the poison was yours.",
        items: [
          { id: "love-letter", kind: "letter", title: "A letter in Vivian's hand", teaser: "Kept folded against your heart",
            body: "'My dearest Julian — soon we shall not have to hide at all. Yours, always. — V.'\n\nProof of the affair. Proof of a motive.",
            hideNote: "If this is ever seen, you are finished." },
        ],
        isKiller: false,
        rounds: {
          1: {
            learned: "You already know it was poison — digitalis, your digitalis. You told the room it was his heart, to buy time.",
            sayAloud: "As his physician, I can tell you Edmund's heart had been weak for years. This morning it simply stopped. A peaceful end, all things considered. There's no cause for alarm here.",
            question: { to: "cordelia", text: "Miss Fane, when did you last see Edmund take his heart medicine? He was so careless with it." },
            secretGoal: "Hold the 'natural causes' line. Do not let the word 'poison' enter the room yet.",
            ifAccused: "You signed it as his heart because that is what a lifetime of treating him told you to expect.",
          },
          2: {
            learned: "You can't keep the poison hidden. Reveal it yourself — but note your bag sat open all evening, so anyone could have taken the vial.",
            sayAloud: "Very well — I cannot in conscience deny it. A vial of digitalis is gone from my bag. It seems Edmund was poisoned. But my bag sat open in the drawing room the whole evening. Any one of you could have reached it.",
            question: { to: "sebastian", text: "Crowe — you were in the drawing room before dinner. Did you go near my bag?" },
            secretGoal: "Break the poison news yourself, framed so the open bag makes everyone a suspect, not just you.",
            ifAccused: "Why would a doctor use his own, traceable poison? You'd be the first man suspected — and you know it.",
          },
          3: {
            learned: "You saw Sebastian at your bag before dinner. Name him — but you were with Vivian, and must never say where you truly were.",
            sayAloud: "I'll say it plainly now. Before dinner, I saw Sebastian Crowe standing over my open bag. I held my tongue then. I should not have. There, I think, is your poisoner.",
            question: { to: "sebastian", text: "So tell them, Crowe — what were you doing at my bag, if not taking the vial?" },
            secretGoal: "Put the murder on Sebastian without ever explaining your own whereabouts.",
            ifAccused: "If asked where you were before dinner: you were taking air on the landing. Never mention Vivian.",
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
          "morning you would have been penniless. By morning, he was dead.",
        objectives: [
          "Hide that you had the strongest motive of anyone.",
          "Work out who actually did it before they pin it on you.",
        ],
        knows: "Sebastian and Edmund's business was quietly failing.",
        mustHide: "That you were hours away from being disinherited.",
        items: [
          { id: "burnt-letter", kind: "letter", charred: true, title: "The half-burnt letter", teaser: "Rescued from the garden grate",
            body: "Edmund's hand, the edges black and crumbling to ash:\n\n'… I cannot in conscience leave you a penny, Cordelia. You are no true blood of mine …'\n\nThe rest is cinders.",
            hideNote: "This is your motive. Pray no one finds it." },
        ],
        isKiller: false,
        rounds: {
          1: {
            learned: "You loved Edmund — and last night, learning he'd cut you off, you hated him. Hide that you had the strongest motive.",
            sayAloud: "He raised me as his own from the age of seven. To lose him like this — I can't take it in. He was in good spirits at dinner, I'm sure of it. Whoever says otherwise is mistaken.",
            question: { to: "vivian", text: "Vivian, you're so composed. Did Edmund seem himself to you last night — or was something troubling him?" },
            secretGoal: "Be the grieving daughter. Bury any hint that Edmund had turned against you.",
            ifAccused: "You adored the man who raised you. The very idea is monstrous.",
          },
          2: {
            learned: "You were seen in the garden at eleven — burning the letter that disinherited you. If a letter is mentioned, it never existed.",
            sayAloud: "Yes, I was in the garden. I was grieving — I needed air, away from all these faces. I burned nothing. Whatever anyone thinks they saw out there, they are simply wrong.",
            question: { to: "sebastian", text: "Mr. Crowe — is it true the business was failing? Edmund seemed so worried these past weeks." },
            secretGoal: "Kill the letter. If it comes up, there was no letter — only a heartbroken girl in the cold.",
            ifAccused: "If the letter is raised: there was no letter. You were upset and needed air, nothing more.",
          },
          3: {
            learned: "You can clear yourself by exposing another guest's lie. Use it — throw the room's suspicion off you.",
            sayAloud: "I'll not sit here and be the easy answer. If we're baring secrets — ask the doctor why he was so very quick to call it a heart attack this morning, before a single soul could look at the body.",
            question: { to: "hart", text: "Doctor — why so eager to close the matter this morning? What were you hiding from us?" },
            secretGoal: "Throw the room's suspicion onto someone else's lie before it can land on you.",
            ifAccused: "You knew nothing of any will — why would you? You had everything to lose by his death, not to gain.",
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
          "the proof and said he'd have you arrested at dawn. So there would be no dawn for him.",
        objectives: [
          "Never let a soul learn of the embezzlement.",
          "Walk out at morning a free man.",
        ],
        knows: "You did it. Before dinner you took the vial from Hart's bag and stirred it into Edmund's nightcap brandy.",
        mustHide: "Everything — the theft and the murder both.",
        items: [
          { id: "account-book", kind: "ledger", title: "Your private account book", teaser: "The one Edmund found",
            body: "Years of figures quietly bled from the company into your own name. This is the proof Edmund held over you last night. This is why there could be no dawn.",
            hideNote: "If any eye but yours sees this, you hang." },
        ],
        isKiller: true,
        rounds: {
          1: {
            learned: "You are the murderer. Be as shaken as anyone. Offer, loudly, to help find the truth — and steer it away from you.",
            sayAloud: "Thirty years I stood beside that man — my oldest friend in the world. Whatever has happened here, I want the truth of it as much as any of you. More. We must all be honest tonight.",
            question: { to: "cordelia", text: "Cordelia, forgive me, but — you and Edmund had words yesterday, didn't you? I heard raised voices." },
            secretGoal: "Look like the grieving friend leading the search. Nudge the room toward another suspect.",
            ifAccused: "Him? His dearest friend of thirty years? The business was thriving and he loved you all.",
          },
          2: {
            learned: "Hart saw you at his bag. If he speaks, you're finished — the embezzlement is the clearest motive here. Get ahead of it.",
            sayAloud: "A missing vial, an open bag — so any of us could be the poisoner. How convenient. But let us not pretend I alone had reason. Cordelia was in tears last night, and no one has said why.",
            question: { to: "cordelia", text: "Where were you before dinner, Cordelia? It's odd that no one can quite say." },
            secretGoal: "Muddy the poison trail and pin motive on Cordelia before anyone examines yours.",
            ifAccused: "If the study argument is raised: you argued about a bad investment, nothing more than that.",
          },
          3: {
            learned: "The net is closing. Every guest is hiding something — use their secrets as your shield. One loud accusation may save you.",
            sayAloud: "You want a murderer? Look to the widow with her week-old will. Or the ward he cut out of it. Or the stranger not one of us had met before last night. I loved Edmund. I'll not hang for having loved him.",
            question: { to: "vivian", text: "Vivian — who profits most now Edmund's dead? A freshly signed will, was it?" },
            secretGoal: "Bury yourself in everyone else's guilt. Accuse loudly. Deny everything to the very last.",
            ifAccused: "If the theft is named: deny it utterly, and demand to know who invented such a filthy lie.",
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
          "You found ledgers proving Sebastian's theft months ago. His money has bought " +
          "your silence ever since. A living Sebastian pays you. A hanged one pays nothing.",
        objectives: [
          "Keep your blackmail buried.",
          "Protect your income — which means protecting Sebastian, carefully.",
        ],
        knows: "Sebastian was embezzling. You can prove it.",
        mustHide: "That you've been blackmailing the killer.",
        items: [
          { id: "ledger-page", kind: "ledger", title: "A page torn from the company ledger", teaser: "Your insurance — and your sin",
            body: "Sebastian Crowe's own hand, his theft laid bare in neat columns. It has bought your silence for months. Reveal it and you name a murderer — but you expose your blackmail with it.",
            revealable: true, revealLabel: "Reveal the ledger to the table" },
        ],
        isKiller: false,
        rounds: {
          1: {
            learned: "You see everything in this house — and you have a private reason to keep one suspect safe. Help the investigation selectively.",
            sayAloud: "Thirty years I've kept this house. I'll tell you this much: not everyone under this roof was abed when they claim to have been. There were feet on the stairs well after midnight.",
            question: { to: "vivian", text: "M'lady, I saw a candle near the study long after midnight. Was that yourself?" },
            secretGoal: "Show you know things — but steer eyes toward the innocent, never toward Sebastian.",
            ifAccused: "A good housekeeper keeps confidences. That is not the same as keeping secrets.",
          },
          2: {
            learned: "You saw Sebastian leave for Hart's bag before dinner. But a hanged Sebastian pays you nothing. Sit on it; point elsewhere.",
            sayAloud: "Poison, is it. Well. I'll say only this: Miss Cordelia burned something in the garden grate last night — I raked the cold ash myself this morning. Ask her what it was.",
            question: { to: "cordelia", text: "Miss Cordelia — what was it you burned in the garden last night? I'd not have cleaned cold ash for nothing." },
            secretGoal: "Divert the room to Cordelia's fire, and away from what you saw Sebastian do.",
            ifAccused: "If pressed about Sebastian: the hall was dim, you saw nothing you would swear to.",
          },
          3: {
            learned: "Cornered, you can trade what you saw for your own safety — but it exposes the blackmail. Choose.",
            sayAloud: "I'll not lose my place shielding any man. The truth, then: before dinner, I saw Mr. Crowe slip from the drawing room toward the doctor's bag. Make of that what you will.",
            question: { to: "sebastian", text: "Go on, Mr. Crowe — tell them what you were doing by the doctor's bag. Or shall I?" },
            secretGoal: "Decide: keep shielding Sebastian, or save yourself by naming him at last.",
            ifAccused: "You've served this house faithfully for thirty years. Your conscience is clean enough.",
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
          "Prove you did not kill the father who rejected you.",
        ],
        knows: "Edmund was alive and shouting at Sebastian at 10pm, long after most guests had gone up.",
        mustHide: "Who you really are — until you decide to reveal it.",
        items: [
          { id: "birth-record", kind: "document", title: "A baptismal record", teaser: "Folded soft with years of handling",
            body: "A parish register entry naming Edmund Blackwood as father to a son, born out of wedlock. You. Your claim to this house — and your motive — in a single line of ink.",
            revealable: true, revealLabel: "Reveal who you truly are" },
        ],
        isKiller: false,
        rounds: {
          1: {
            learned: "No one knows who you are — and motive is written all over you the moment they do. Stay quiet. Watch.",
            sayAloud: "You'll not know me — a distant relation, arrived only just before the storm. I met Lord Edmund but briefly last night. A cold welcome, I'll say, for a man so soon to die.",
            question: { to: "hart", text: "Doctor — a man in good spirits at dinner, dead of his heart by dawn? Does that not strike you as sudden?" },
            secretGoal: "Stay the mild outsider. Reveal nothing of why you truly came to Blackwood.",
            ifAccused: "A stranger with no history here — why would you harm a man you had only just met?",
          },
          2: {
            learned: "Passing the study at 10pm you heard Edmund and Sebastian shouting about 'stolen money'. Share it — it points at Sebastian, away from you.",
            sayAloud: "I'll offer what I heard. Passing the study near ten last night, two men were shouting within — about money, and theft. Edmund's voice, and one other. I'd know that other voice again.",
            question: { to: "sebastian", text: "It was your voice in that study, Mr. Crowe, was it not? What money were you two quarrelling over?" },
            secretGoal: "Put the study argument on the record. Let the room chase Sebastian.",
            ifAccused: "You'd only just arrived — you barely knew the man, let alone had reason to kill him.",
          },
          3: {
            learned: "It's time. Revealing you're Edmund's son recasts you as a grieving heir, not a lurking stranger.",
            sayAloud: "No more hiding. I am Edmund Blackwood's son — his own blood, born out of wedlock, come to claim my name. Last night, to my face, he refused me. And still I did not raise a hand against him. I wanted a father, not a fortune.",
            question: { to: "sebastian", text: "Before you point at the stranger — ask Mr. Crowe why the police were coming for him at dawn." },
            secretGoal: "Reveal your identity on your own terms. Turn suspicion into sympathy, and stake your claim.",
            ifAccused: "You came for recognition, not revenge. A son does not murder the father he has only just found.",
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

    // Interactive documents players GATHER by investigating each round, then
    // tap to open and read. `kind` drives how the prop is styled.
    clues: [
      { id: "cert", round: 1, kind: "note", where: "the study", title: "The death certificate",
        teaser: "Signed by Dr. Hart this morning",
        body: "CERTIFICATE OF DEATH\n\nEdmund Blackwood, aged 60.\nCause: heart failure.\nManner: natural causes.\nNo post-mortem requested.\n\nSigned, J. Hart, M.D." },
      { id: "glass", round: 1, kind: "object", where: "the study", title: "The brandy glass",
        teaser: "Found at the dead man's side",
        body: "A single crystal glass, drained to the dregs. At the bottom clings a faint, sticky residue — and a bitter, almondy sweetness that good brandy alone never leaves behind." },
      { id: "bag", round: 2, kind: "object", where: "the drawing room", title: "Dr. Hart's medical bag",
        teaser: "Left open all evening",
        body: "A doctor's bag, open on the sideboard. Inside, a rolled leather case of little glass vials — and one empty loop where a bottle of digitalis plainly used to sit." },
      { id: "note", round: 2, kind: "letter", where: "the desk blotter", title: "A torn note in Edmund's hand",
        teaser: "Pressed into the study blotter",
        body: "Half a sheet, torn away and forgotten, in Lord Edmund's furious hand:\n\n'— know what you have taken from me. It ends at dawn. The constable shall hear the whole of it, unless —'\n\nThe rest is torn off." },
      { id: "telegram", round: 3, kind: "telegram", where: "the hall table", title: "An urgent telegram",
        teaser: "Delivered before the storm closed the roads",
        body: "Post Office Telegram\n\nTo: Lord E. Blackwood, Blackwood Manor\n\nConstable informed stop shall attend at dawn regarding the accounts stop\n\n— Rees & Son, Solicitors" },
      { id: "will", round: 3, kind: "will", where: "the study desk", title: "A newly-dated will",
        teaser: "The ink barely a week old",
        body: "Last Will & Testament\nof Edmund Blackwood\n\n'… I leave the whole of my estate, and this house, to my beloved wife, Vivian.'\n\nDated the ninth — barely a week gone. The signature is Edmund's. Or very nearly." },
    ],

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
